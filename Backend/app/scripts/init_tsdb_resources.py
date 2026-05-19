"""
Pull data from thesportsdb (tsdb), normalize, and push to our SQL db
Find league -> Get teams in league -> Get team info -> Add to DB -> Get schdule for each team -> Get event
Get league info -> get teams in league
    for each team
        get team info
        normalize
        add to DB
        get scedule
            for each event
                get event info
                normalize
                add to db
"""

[
    4328,
    4482,
    4397,
    4570,
    4335,
    4387,
    4391,
    4380,
    4424,
    4346,
    4331,
    4332,
    4334,
    4460,
    4351,
    4591,
    4355,
    4456,
    4399,
    4546,
    4337,
    4442,
    463,
    4344,
    4350,
    4339,
    4338,
    4406,
    4400,
    4394,
    4416,
    4920,
    4401,
    4430,
    4330,
    4824,
    4340,
    4689,
    4621,
    4396,
    4675,
    4639,
    4977,
    4414,
    4398,
    4347,
    4422,
    4521,
    4461,
    4397,
    4590,
    5070,
    4370,
    4486,
    4393,
    4407,
    4373,
    4445,
    4443,
    4425,
    4464,
    4517,
]


from ..services import thesportsdb_service as tsdb
from ..data import models
from ..data.repo import (
    LeagueRepo,
    ExternalIdRepo,
    TeamRepo,
    FixtureRepo,
    FixtureTeamsRepo,
)
from ..infra.supabase.client import SupabaseDB
from supabase import create_client
import json
import os
from datetime import datetime, timezone


def clear_console():
    # 'nt' is Windows; 'posix' is Linux/macOS
    os.system("cls" if os.name == "nt" else "clear")


# List of league ids to add
leagues_to_add = ["4328"]

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SECRET_KEY")
client = create_client(url, key)

db = SupabaseDB(client)
leagues = LeagueRepo(db)
external_ids = ExternalIdRepo(db)
teams = TeamRepo(db)
fixtures = FixtureRepo(db)
fixture_teams = FixtureTeamsRepo(db)
added_leagues = external_ids.get_provider_ids(
    "tsdb", models.Entity_Type("league").value
)
added_teams = external_ids.get_provider_ids("tsdb", models.Entity_Type("team").value)
added_fixtures = external_ids.get_provider_ids(
    "tsdb", models.Entity_Type("fixture").value
)


"""
League Schema
id: UUID
name: TEXT
location: TEXT (e.g England, North America, Europe, .etc)
"""


def add_league(tsdb_id, get=False):
    if tsdb_id in added_leagues:
        print("League already added")
        if get:
            return leagues.get_by_external_id(tsdb_id, "tsdb")
        else:
            return

    league = tsdb.get_league(tsdb_id)

    league.id = leagues.insert(league).id
    external_id = models.External_Id(
        entity_type="league",
        entity_id=league.id,
        external_provider="tsdb",
        external_id=tsdb_id,
    )

    external_ids.insert(external_id)
    print(f"{league.name} added.")
    added_leagues.add(tsdb_id)

    if get:
        return league


"""
Team Schema
id: UUID
name: TEXT
main_league_name: TEXT
location; TEXT
"""


def add_team(tsdb_id, league=None, get=False):
    if tsdb_id in added_teams:
        print("Team already added")
        if get:
            return teams.get_by_external_id(tsdb_id)
        else:
            return
    res = tsdb.get_team(tsdb_id)
    team_name = res.get("strTeam", None)
    if not team_name:
        raise tsdb.TheSportsDBError("Incomplete Team")

    if not league:
        tsdb_league_id = res.get("idLeague", None)
        if tsdb_league_id in added_leagues:
            league = leagues.get_by_external_id(tsdb_league_id, "tsdb")
        else:
            try:
                league = add_league(tsdb_league_id)
            except (ValueError, tsdb.TheSportsDBError):
                league = None

    sport_id = None
    main_league_id = None

    if league:
        main_league_id = league.id
        sport_id = league.sport_id

    team = models.Team(
        id=None,
        name=team_name,
        main_league_id=main_league_id,
        location=res.get("strLocation", None),
        logo_location=upload_badge(res, team_name),
        sport_id=sport_id,
    )

    team_id = teams.insert(team).id
    external_id = models.External_Id(
        entity_type="team",
        entity_id=team_id,
        external_provider="tsdb",
        external_id=tsdb_id,
    )

    external_ids.insert(external_id)

    print(f"{team_name} added.")
    added_teams.add(tsdb_id)

    if get:
        return team


# Broken
# Adds 2 teams
def add_fixture(tsdb_id, add_new_league=True):
    res = tsdb.get_fixture(tsdb_id)
    tsdb_league = res.get("idLeague", None)
    if tsdb_league:
        if tsdb_league in added_leagues:
            league_id = leagues.get_by_external_id(res["idLeague"], "tsdb").id
        elif add_new_league:
            league_id = add_league(tsdb_league, get=True).id
    tsdb_status = res.get("strStatus", None)
    if tsdb_status:
        try:
            status = models.Fixture_Status(tsdb_status).value
        except ValueError:
            status = None
    start_date = res.get("dateEvent", None)
    start_time = res.get("strTime", None)
    if start_date and start_time:
        start = datetime.strptime(
            f"{start_date} {start_time}", "%Y-%m-%d %H:%M:%S"
        ).replace(tzinfo=timezone.utc)
        start_date = start.date()
    elif start_date:
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
    else:
        start = None
        start_date = None

    fixture = models.Fixture(
        id=None,
        league_id=league_id,
        start=start,
        start_date=start_date,
        status=status,
        label=None,
    )

    fixture_id = fixtures.insert(fixture).id

    external_id = models.External_Id(
        entity_type="fixture",
        entity_id=fixture_id,
        external_provider="tsdb",
        external_id=tsdb_id,
    )

    external_ids.insert(external_id)

    added_fixtures.add(tsdb_id)

    tsdb_home = res.get("idHomeTeam", None)
    tsdb_away = res.get("idAwayTeam", None)

    if tsdb_home:
        if tsdb_home in added_teams:
            team_id = teams.get_by_external_id(tsdb_home, "tsdb").id
        else:
            team_id = teams.insert(add_team(tsdb_home, get=True)).id
        if fixture.status == "finished":
            score = res.get("intHomeScore", None)
        else:
            score = None
        home_team = models.Fixture_Team(
            fixture_id=fixture_id, team_id=team_id, score=score, is_winner=None
        )

    if tsdb_away:
        if tsdb_away in added_teams:
            team_id = teams.get_by_external_id(tsdb_away, "tsdb").id
        else:
            team_id = teams.insert(add_team(tsdb_away, get=True)).id
        if fixture.status == "finished":
            score = res.get("intAwayScore", None)
        else:
            score = None
        away_team = models.Fixture_Team(
            fixture_id=fixture_id, team_id=team_id, score=score, is_winner=None
        )

    if fixture.status == "finished":
        if home_team.score > away_team.score:
            home_team.is_winner = True
        if away_team.score > home_team.score:
            away_team.is_winner = True

    fixture_teams.insert(home_team)
    fixture_teams.insert(away_team)


if __name__ == "__main__":
    clear_console()
    add_fixture("2267391")
    # for league_id in leagues_to_add:
    #     league = add_league(league_id)
    #     for team in tsdb.get_league_teams(league_id):
    #         team_id = team.get("idTeam")
    #         add_team(team_id, league=league)
    # for event in tsdb.get_team_schedule(team_id):
    #     event_id = event.get("idEvent")
    #     add_event(event_id)

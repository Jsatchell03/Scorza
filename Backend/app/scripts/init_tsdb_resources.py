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
from ..infra.gcp.storage import upload_from_url
from ..data import models as models
from ..data.repo import LeagueRepo, ExternalIdRepo
from ..infra.supabase.client import SupabaseDB
from supabase import create_client
import json
import os


def clear_console():
    # 'nt' is Windows; 'posix' is Linux/macOS
    os.system("cls" if os.name == "nt" else "clear")


# List of league ids to add
leagues_to_add = [4328]

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SECRET_KEY")
client = create_client(url, key)

db = SupabaseDB(client)
leagues = LeagueRepo(db)
external_ids = ExternalIdRepo(db)


def upload_badge(res, name):
    logo_url = res.get("strBadge", None)
    if not logo_url:
        logo_location = None
    else:
        logo_name = name.lower().replace(" ", "_") + "_badge"
        logo_location = upload_from_url(logo_url, "scorza-provider-assets", logo_name)
    return logo_location


"""
League Schema
id: UUID
name: TEXT
location: TEXT (e.g England, North America, Europe, .etc)
"""


def add_league(tsdb_id):
    if leagues.get_by_external_id(tsdb_id, "tsdb"):
        print("League already added")
        return

    res = tsdb.get_league(tsdb_id)
    league_name = res.get("strLeague", None)
    if not league_name:
        raise tsdb.TheSportsDBError("Incomplete League")

    league = models.League(
        id=None,
        name=league_name,
        location=res.get("strCountry", None),
        logo_location=upload_badge(res, league_name),
        rules=None,
        is_community_sourced=False,
        sport_id=None,
    )

    league_id = leagues.insert(league)
    external_id = models.External_Id(
        entity_type="league",
        entity_id=league_id,
        external_provider="tsdb",
        external_id=tsdb_id,
    )

    external_ids.insert(external_id)
    print(f"{league_name} added.")


"""
Team Schema
id: UUID
name: TEXT
main_league_name: TEXT
location; TEXT
"""


def add_team(tsdb_id, league_id=None):

    res = tsdb.get_team(tsdb_id)

    team_name = res.get("strTeam", None)
    if not team_name:
        raise tsdb.TheSportsDBError("Incomplete Team")
    if not league_id:
        tsdb_league_id = res.get("idLeague", None)
        if tsdb_league_id:
            get_row_from_external_id(tsdb_league_id)
        else:
            league_id = None

    team_doc = {
        "id": None,
        "name": team_name,
        "main_league_id": league_id,
        "location": res.get("strLocation", None),
        "logo_location": upload_badge(res, team_name),
        "sport_id": None,
    }

    print(f"{team_doc["name"]} added.")
    print(team_doc)


def add_event(tsdb_id):
    try:
        res = tsdb.get_event(tsdb_id)
    except tsdb.TheSportsDBError as error:
        print(error)

    # league_id =  res["idLeague"]
    # status = res["strStatus"]
    # fixture = {
    #     "league_id": res.get("idLeague", None),
    #     "label": label,
    #     "status": status,
    # }
    # if status != "Not Started":
    #     fixture["home_score"] = tsdb_res["intHomeScore"]
    #     fixture["away_score"] = tsdb_res["intAwayScore"]

    # db["fixtures"].append(fixture)
    # db["external_ids"].append(
    #     {
    #         "entity_type": "fixture",
    #         "entity_id": fixture_id,
    #         "external_id": tsdb_id,
    #         "source": "tsdb",
    #     }
    # )
    # print("Added " + label)

    explored_events.add(tsdb_id)


if __name__ == "__main__":
    clear_console()
    add_league("4328")

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

from ..services import thesportsdb_service as tsdb

# List of league ids to add
leagues_to_add = []


def add_teams():
    pass


def add_league():
    pass


def add_event():
    pass


def get_league_id(query):
    # replace dashes and spaces with underscores
    # call tsdb.search_league_name
    #

    pass


if __name__ == "__main__":
    print(tsdb.search_league_name("Premiership_rugby"))

import requests
import os
from dotenv import load_dotenv
import functools
from ..data.models import League, Team
from ..infra.gcp.storage import upload_from_url

load_dotenv()
BASE_URL = "https://www.thesportsdb.com/api"
TIMEOUT = 5
HEADERS = {
    "X-API-KEY": f"{os.getenv("THESPORTSDB_API_KEY")}",
    "Content-Type": "application/json",
}


class TheSportsDBError(Exception):
    """Custom exception for TheSportsDB API errors."""

    pass


def v2_request(url, type):
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()

        if not data:
            raise TheSportsDBError(data.get("Message", "Empty response from API"))
        if type == "lookup":
            return data.get(type)[0]
        else:
            return data.get(type)

    except requests.exceptions.HTTPError as e:
        raise TheSportsDBError(f"HTTP error: {e}")

    except requests.exceptions.ConnectionError:
        raise TheSportsDBError("Connection error")

    except requests.exceptions.Timeout:
        raise TheSportsDBError("Request timed out")

    except requests.exceptions.RequestException as e:
        raise TheSportsDBError(f"Request failed: {e}")


def get_league(id):
    url = f"{BASE_URL}/v2/json/lookup/league/{id}"
    request_type = "lookup"
    response = v2_request(url, request_type)

    if not response.get("strLeague", None):
        raise TheSportsDBError(f"TSDB league:{id} missing 'strLeague'.")

    return {
        "id": response["idLeague"],
        "name": response["strLeague"],
        "location": response.get("strCountry", None),
        "badge": response.get("strBadge", None),
    }


def get_league_teams(id):
    url = f"{BASE_URL}/v2/json/list/teams/{id}"
    request_type = "list"
    response = v2_request(url, request_type)
    teams = []
    incomplete_teams = None

    for team in response:
        if not team.get("strTeam", None):
            incomplete_teams = 1 if incomplete_teams is None else incomplete_teams + 1
            continue
        teams.append(
            {
                "id": team["idTeam"],
                "name": team["strTeam"],
                "league_id": team.get("idLeague", None),
                "badge": team.get("strBadge", None),
                "location": team.get("strCountry"),
            }
        )

    if incomplete_teams:
        print(f"{incomplete_teams} incomplete teams")

    return teams


def get_team(id):
    url = f"{BASE_URL}/v2/json/lookup/team/{id}"
    request_type = "lookup"
    response = v2_request(url, request_type)

    if not response.get("strTeam", None):
        raise TheSportsDBError(f"TSDB team:{id} missing 'strTeam'.")

    return {
        "id": response["idTeam"],
        "name": response["strTeam"],
        "league_id": response.get("idLeague", None),
        "badge": response.get("strBadge", None),
        "location": response.get("strCountry"),
    }


if __name__ == "__main__":
    print(get_team(133601))

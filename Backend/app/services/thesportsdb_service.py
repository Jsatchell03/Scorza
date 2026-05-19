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


def upload_badge(res, name):
    logo_url = res.get("strBadge", None)
    if not logo_url:
        logo_location = None
    else:
        logo_name = name.lower().replace(" ", "_") + "_badge"
        logo_location = upload_from_url(logo_url, "scorza-provider-assets", logo_name)
    return logo_location


def parse_team(res):
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


def v2_request_decorator(func):
    @functools.wraps(func)
    def wrap(*args, **kwargs):
        try:
            request = func(*args, **kwargs)
            response = requests.get(request["url"], headers=HEADERS, timeout=TIMEOUT)
            response.raise_for_status()
            data = response.json()

            if not data or not data.get(request["type"]):
                raise TheSportsDBError(data.get("Message", "Empty response from API"))
            if request["type"] == "lookup":
                return data.get(request["type"])[0]
            else:
                return data.get(request["type"])

        except requests.exceptions.HTTPError as e:
            raise TheSportsDBError(f"HTTP error: {e}")

        except requests.exceptions.ConnectionError:
            raise TheSportsDBError("Connection error")

        except requests.exceptions.Timeout:
            raise TheSportsDBError("Request timed out")

        except requests.exceptions.RequestException as e:
            raise TheSportsDBError(f"Request failed: {e}")

    return wrap


"""
These functions simply contruct the url and return an object with the information
the wrapper needs to execute and handle errors.
"""


@v2_request_decorator
def search_league_name(name):
    url = f"{BASE_URL}/v2/json/search/league/{name}"
    request_type = "search"
    return {"url": url, "type": request_type}


def get_league(id):
    url = f"{BASE_URL}/v2/json/lookup/league/{id}"
    request_type = "lookup"
    res = v2_request(url, request_type)

    if not res.get("strLeague", None):
        raise TheSportsDBError("Incomplete League")

    return League(
        id=None,
        name=res["strLeague"],
        location=res.get("strCountry", None),
        logo_location=upload_badge(res, res["strLeague"]),
        rules=None,
        is_community_sourced=False,
        sport_id=None,
    )


def get_league_teams(id):
    url = f"{BASE_URL}/v2/json/list/teams/{id}"
    request_type = "list"
    res = v2_request(url, request_type)


@v2_request_decorator
def get_team(id):
    url = f"{BASE_URL}/v2/json/lookup/team/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_team_schedule(id):
    url = f"{BASE_URL}/v2/json/schedule/full/team/{id}"
    request_type = "schedule"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_event_streaming(id):
    url = f"{BASE_URL}/v2/json/lookup/event_tv/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_fixture(id):
    url = f"{BASE_URL}/v2/json/lookup/event/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_fixture_lineup(id):
    url = f"{BASE_URL}/v2/json/lookup/event_lineup/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_fixture_stats(id):
    url = f"{BASE_URL}/v2/json/lookup/event_stats/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_venue(id):
    url = f"{BASE_URL}/v2/json/lookup/venue/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


if __name__ == "__main__":
    print(get_league_teams(4328))

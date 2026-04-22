import requests
import os
from dotenv import load_dotenv
import functools

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


@v2_request_decorator
def get_league(id):
    url = f"{BASE_URL}/v2/json/lookup/league/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_league_teams(id):
    url = f"{BASE_URL}/v2/json/list/teams/{id}"
    request_type = "list"
    return {"url": url, "type": request_type}


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
def get_event(id):
    url = f"{BASE_URL}/v2/json/lookup/event/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_event_lineup(id):
    url = f"{BASE_URL}/v2/json/lookup/event_lineup/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_event_stats(id):
    url = f"{BASE_URL}/v2/json/lookup/event_stats/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}


@v2_request_decorator
def get_venue(id):
    url = f"{BASE_URL}/v2/json/lookup/venue/{id}"
    request_type = "lookup"
    return {"url": url, "type": request_type}

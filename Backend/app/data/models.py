from pydantic import BaseModel
from enum import Enum
from uuid import UUID
from typing import Optional
from datetime import datetime, timezone, date


class Entity_Type(str, Enum):
    LEAGUE = "league"
    FIXTURE = "fixture"
    TEAM = "team"
    EXTERNAL_ID = "external_id"
    FIXTURE_TEAM = "fixture_team"


ALIASES = {
    "Not Started": "not_started",
    "Match Finished": "finished",
}


class Fixture_Status(str, Enum):
    _ignore_ = ["ALIASES"]

    NOT_STARTED = "not_started"
    FINISHED = "finished"
    IN_PROGRESS = "in_progress"
    POSTPONED = "postponed"

    @classmethod
    def _missing_(cls, value):
        if isinstance(value, str):
            value = value.lower()
            value = ALIASES.get(value, value)

            for status in cls:
                if status.value == value:
                    return status
        return None


class External_Id(BaseModel):
    entity_type: Entity_Type
    entity_id: UUID
    external_provider: str
    external_id: str


class League(BaseModel):
    id: Optional[UUID]
    name: str
    location: Optional[str]
    logo_location: Optional[str]
    sport_id: Optional[UUID]
    is_community_sourced: Optional[bool]
    rules: Optional[dict]


class Team(BaseModel):
    id: Optional[UUID]
    name: str
    main_league_id: Optional[UUID]
    logo_location: Optional[str]
    sport_id: Optional[UUID]
    location: Optional[str]


class Fixture(BaseModel):
    id: Optional[UUID]
    league_id: Optional[UUID]
    start: Optional[datetime]
    start_date: Optional[date]
    status: Optional[Fixture_Status]
    label: Optional[str]


class Fixture_Team(BaseModel):
    fixture_id: UUID
    team_id: UUID
    score: Optional[int]
    is_winner: Optional[bool]

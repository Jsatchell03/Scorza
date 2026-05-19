from abc import ABC
from . import models


class BaseRepo(ABC):
    TABLE: str
    MODEL: models.BaseModel

    def __init__(self, db):
        self.db = db

    def insert(self, model):
        if not isinstance(model, self.MODEL):
            raise ValueError(f"Must be instance of {self.ENTITY_TYPE} pydantic model.")

        return self.MODEL(
            **self.db.insert(
                self.TABLE,
                model.model_dump(exclude_unset=True, exclude_none=True, mode="json"),
            ).data[0]
        )


class EntityRepo(BaseRepo):
    ENTITY_TYPE: models.Entity_Type

    def get_by_id(self, id):
        return self.MODEL(**self.db.get_by_id(self.TABLE, id))

    def get_by_external_id(self, external_id, external_provider):
        query_result = (
            self.db.client.table("external_ids")
            .select("entity_id")
            .eq("external_provider", external_provider)
            .eq("external_id", external_id)
            .eq("entity_type", self.ENTITY_TYPE)
            .execute()
        )

        if len(query_result.data) == 0:
            return None
        if len(query_result.data) > 1:
            raise ValueError("Multiple external IDs found")

        return self.get_by_id(query_result.data[0]["entity_id"])


class LeagueRepo(EntityRepo):

    TABLE = "leagues"
    ENTITY_TYPE = models.Entity_Type("league").value
    MODEL = models.League


class TeamRepo(EntityRepo):
    TABLE = "teams"
    ENTITY_TYPE = models.Entity_Type("team").value
    MODEL = models.Team


class FixtureRepo(EntityRepo):
    TABLE = "fixtures"
    ENTITY_TYPE = models.Entity_Type("fixture").value
    MODEL = models.Fixture


class FixtureTeamsRepo(EntityRepo):
    TABLE = "fixture_teams"
    ENTITY_TYPE = models.Entity_Type("fixture_team").value
    MODEL = models.Fixture_Team


class ExternalIdRepo(BaseRepo):
    TABLE = "external_ids"
    ENTITY_TYPE = models.Entity_Type("external_id").value
    MODEL = models.External_Id

    def get_provider_ids(self, external_provider, entity_type=None):
        if not entity_type:
            query_result = (
                self.db.client.table(self.TABLE)
                .select("external_id")
                .eq("external_provider", external_provider)
                .execute()
            )
        else:
            query_result = (
                self.db.client.table(self.TABLE)
                .select("external_id")
                .eq("entity_type", entity_type)
                .eq("external_provider", external_provider)
                .execute()
            )

        if len(query_result.data) == 0:
            return set()
        return set(obj["external_id"] for obj in query_result.data)

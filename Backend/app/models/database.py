from abc import ABC, abstractmethod


class Database(ABC):

    @abstractmethod
    def write_team(self, team_data):
        pass

    @abstractmethod
    def batch_write_teams(self, teams):
        pass

    @abstractmethod
    def read_team(self, team_id):
        pass

    @abstractmethod
    def update_team(self, team_id, new_data):
        pass

    @abstractmethod
    def write_league(self, league_data):
        pass

    @abstractmethod
    def batch_write_leagues(self, leagues):
        pass

    @abstractmethod
    def read_league(self, league_id):
        pass

    @abstractmethod
    def update_league(self, league_id, new_data):
        pass

    @abstractmethod
    def write_fixture(self, fixture_data):
        pass

    @abstractmethod
    def batch_write_fixtures(self, fixtures):
        pass

    @abstractmethod
    def read_fixture(self, fixture_id):
        pass

    @abstractmethod
    def update_fixture(self, fixture_id, new_data):
        pass

    @abstractmethod
    def read_team_fixtures(self, team_id):
        pass

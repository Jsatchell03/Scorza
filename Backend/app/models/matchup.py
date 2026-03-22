import uuid
from sqlalchemy import Column, ForeignKey, Text, SmallInteger, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from .base import Base


class Matchup(Base):
    __tablename__ = "matchups"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    tournament_id = Column(UUID(as_uuid=True), ForeignKey("tournaments.id"))
    season_id = Column(UUID(as_uuid=True), ForeignKey("seasons.id"), nullable=False)

    scoring_rules = Column(JSONB, nullable=False)
    tournament_round = Column(SmallInteger)
    status = Column(Text, nullable=False)

    winner_next_matchup = Column(UUID(as_uuid=True), ForeignKey("matchups.id"))
    loser_next_matchup = Column(UUID(as_uuid=True), ForeignKey("matchups.id"))

    teams = relationship("MatchupTeam", back_populates="matchup")
    fixtures = relationship("Fixture", backref="matchup")


class MatchupTeam(Base):
    __tablename__ = "matchup_teams"

    matchup_id = Column(UUID(as_uuid=True), ForeignKey("matchups.id"), primary_key=True)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), primary_key=True)

    score_breakdown = Column(JSONB)
    is_winner = Column(Boolean)

    matchup = relationship("Matchup", back_populates="teams")
    team = relationship("Team")

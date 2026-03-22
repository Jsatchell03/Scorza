import uuid
from sqlalchemy import Column, Text, ForeignKey, Date, Time, Boolean, SmallInteger
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base


class Fixture(Base):
    __tablename__ = "fixtures"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"))
    season_id = Column(UUID(as_uuid=True), ForeignKey("seasons.id"))

    start_time = Column(Time(timezone=True))
    start_date = Column(Date)
    status = Column(Text, nullable=False)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    label = Column(Text)
    venue_id = Column(UUID(as_uuid=True), ForeignKey("venues.id"))

    matchup_id = Column(UUID(as_uuid=True), ForeignKey("matchups.id"))
    matchup_number = Column(SmallInteger)

    season = relationship("Season", back_populates="fixtures")
    teams = relationship("FixtureTeam", back_populates="fixture")


class FixtureTeam(Base):
    __tablename__ = "fixture_teams"

    fixture_id = Column(UUID(as_uuid=True), ForeignKey("fixtures.id"), primary_key=True)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), primary_key=True)

    score_breakdown = Column(JSONB)
    is_winner = Column(Boolean)

    fixture = relationship("Fixture", back_populates="teams")
    team = relationship("Team", back_populates="fixtures")

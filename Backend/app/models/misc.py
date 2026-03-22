import uuid
from sqlalchemy import Table, Column, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base


class Sport(Base):
    __tablename__ = "sports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    rules = Column(JSONB, nullable=False)


class Venue(Base):
    __tablename__ = "venues"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    city = Column(Text)
    country = Column(Text)
    sport_id = Column(UUID(as_uuid=True), ForeignKey("sports.id"))


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    teams = relationship(
        "Team", secondary=organization_teams, back_populates="organizations"
    )


class Division(Base):
    __tablename__ = "divisions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"), nullable=False)
    logo_location = Column(Text)
    league = relationship("League", back_populates="divisions")
    teams = relationship("Team", secondary=division_teams, back_populates="divisions")


division_teams = Table(
    "division_teams",
    Base.metadata,
    Column(
        "division_id", UUID(as_uuid=True), ForeignKey("divisions.id"), primary_key=True
    ),
    Column("team_id", UUID(as_uuid=True), ForeignKey("teams.id"), primary_key=True),
)

organization_teams = Table(
    "organization_teams",
    Base.metadata,
    Column(
        "organization_id",
        UUID(as_uuid=True),
        ForeignKey("organizations.id"),
        primary_key=True,
    ),
    Column("team_id", UUID(as_uuid=True), ForeignKey("teams.id"), primary_key=True),
)

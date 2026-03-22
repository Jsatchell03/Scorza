import uuid
from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .misc import division_teams, organization_teams
from .base import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    main_league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"))
    logo_location = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    sport_id = Column(UUID(as_uuid=True), ForeignKey("sports.id"))
    venue_id = Column(UUID(as_uuid=True), ForeignKey("venues.id"))

    league = relationship("League", back_populates="teams")
    fixtures = relationship("FixtureTeam", back_populates="team")
    divisions = relationship(
        "Division", secondary=division_teams, back_populates="teams"
    )

    organizations = relationship(
        "Organization", secondary=organization_teams, back_populates="teams"
    )

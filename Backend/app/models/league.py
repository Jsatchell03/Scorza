import uuid
from sqlalchemy import Column, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .base import Base


class League(Base):
    __tablename__ = "leagues"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    location = Column(Text)
    sport_id = Column(UUID(as_uuid=True), ForeignKey("sports.id"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    rules = Column(JSONB, nullable=False)
    logo_location = Column(Text)
    is_community_sourced = Column(Boolean, nullable=False)

    postseason_tournament_id = Column(UUID(as_uuid=True), ForeignKey("tournaments.id"))
    current_season_id = Column(UUID(as_uuid=True), ForeignKey("seasons.id"))

    seasons = relationship("Season", back_populates="league")
    teams = relationship("Team", back_populates="league")

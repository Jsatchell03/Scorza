import uuid
from sqlalchemy import Column, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from .base import Base


class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"))

    name = Column(Text, nullable=False)
    status = Column(Text, nullable=False)
    rules = Column(JSONB, nullable=False)

    sport_id = Column(UUID(as_uuid=True), ForeignKey("sports.id"))
    is_standalone = Column(Boolean, nullable=False)
    current_season_id = Column(UUID(as_uuid=True), ForeignKey("seasons.id"))

    matchups = relationship("Matchup", backref="tournament")

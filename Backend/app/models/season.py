import uuid
from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import relationship
from .base import Base


class Season(Base):
    __tablename__ = "seasons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    started_at = Column(TIMESTAMP(timezone=True))
    name = Column(Text, nullable=False)
    status = Column(Text, nullable=False)

    league_id = Column(UUID(as_uuid=True), ForeignKey("leagues.id"))
    tournament_id = Column(UUID(as_uuid=True), ForeignKey("tournaments.id"))

    league = relationship("League", back_populates="seasons")
    fixtures = relationship("Fixture", back_populates="season")

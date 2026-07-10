from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    hospital = Column(String(100))
    speciality = Column(String(100))
    city = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))

    interactions = relationship("Interaction", back_populates="hcp")


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_id = Column(Integer, ForeignKey("hcps.id"))
    date = Column(Date)
    interaction_type = Column(String(50))
    summary = Column(Text)
    sentiment = Column(String(20))
    follow_up = Column(String(100))

    hcp = relationship("HCP", back_populates="interactions")
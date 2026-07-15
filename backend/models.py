from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class CrowdReading(Base):
    __tablename__ = "crowd_readings"
    id = Column(Integer, primary_key=True)
    location = Column(String, index=True)
    crowd_value = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
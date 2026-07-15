import json, os, random, math
from datetime import datetime, timedelta
from database import Base, engine, SessionLocal
from models import CrowdReading

Base.metadata.create_all(engine)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, "data", "locations.json")) as f:
    locations = json.load(f)

def simulate_day_curve(hour):
    # peaks around early morning (aarti) and evening
    peak1 = math.exp(-((hour - 6) ** 2) / 8)
    peak2 = math.exp(-((hour - 19) ** 2) / 8)
    return peak1 + peak2  # 0..~2

session = SessionLocal()
start = datetime.utcnow() - timedelta(days=7)

for location, base_crowd in locations.items():
    for hour_offset in range(7 * 24):
        ts = start + timedelta(hours=hour_offset)
        curve = simulate_day_curve(ts.hour)
        noise = random.uniform(-5, 5)
        value = max(5, min(100, base_crowd * 0.5 + curve * 30 + noise))
        session.add(CrowdReading(location=location, crowd_value=value, timestamp=ts))

session.commit()
session.close()
print("Seeded 7 days of realistic hourly crowd history.")
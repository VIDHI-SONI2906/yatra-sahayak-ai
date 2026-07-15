import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
from sqlalchemy import desc
from database import SessionLocal
from models import CrowdReading

def get_crowd_data():
    session = SessionLocal()
    result = []
    locations = session.query(CrowdReading.location).distinct()
    for (location,) in locations:
        latest = (session.query(CrowdReading)
                  .filter_by(location=location)
                  .order_by(desc(CrowdReading.timestamp))
                  .first())
        if latest:
            result.append({"location": location, "crowd": round(latest.crowd_value, 1)})
    session.close()
    return result

def get_prediction(location, hours_ahead=1):
    session = SessionLocal()
    readings = (session.query(CrowdReading)
                .filter_by(location=location)
                .order_by(CrowdReading.timestamp)
                .all())
    session.close()

    if len(readings) < 5:
        return {"location": location, "error": "not enough history"}

    # Fit a simple linear trend on the most recent readings
    recent = readings[-24:]  # last 24 hourly readings
    X = np.array([[i] for i in range(len(recent))])
    y = np.array([r.crowd_value for r in recent])
    model = LinearRegression().fit(X, y)
    predicted = model.predict([[len(recent) + hours_ahead - 1]])[0]
    predicted = max(0, min(100, predicted))

    return {
        "location": location,
        "current": round(recent[-1].crowd_value, 1),
        "predicted": round(predicted, 1),
        "trend": "rising" if model.coef_[0] > 0 else "falling"
    }

def get_alerts():
    session = SessionLocal()
    alerts = []
    locations = session.query(CrowdReading.location).distinct()
    for (location,) in locations:
        latest = (session.query(CrowdReading)
                  .filter_by(location=location)
                  .order_by(desc(CrowdReading.timestamp))
                  .first())
        if latest and latest.crowd_value > 50:
            alerts.append(f"⚠ High congestion at {location}")
    session.close()
    return alerts
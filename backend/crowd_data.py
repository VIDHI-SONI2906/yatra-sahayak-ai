import json
import random
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "data", "locations.json")

with open(file_path, "r") as f:
    locations = json.load(f)

def get_crowd_data():
    result = []

    for location, crowd in locations.items():
        updated = max(10, min(100, crowd + random.randint(-5, 5)))

        result.append({
            "location": location,
            "crowd": updated
        })

    return result

def get_prediction(location):
    current = locations.get(location, 0)

    predicted = min(100, current + random.randint(5, 15))

    return {
        "location": location,
        "current": current,
        "predicted": predicted
    }

def get_alerts():
    alerts = []

    for location, crowd in locations.items():
        if crowd > 80:
            alerts.append(f"⚠ High congestion at {location}")

    return alerts
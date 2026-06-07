from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from crowd_data import (
    get_crowd_data,
    get_prediction,
    get_alerts
)

from route_optimizer import get_best_route

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "CrowdFlow AI Backend Running"
    }

@app.get("/crowd")
def crowd():
    return get_crowd_data()

@app.get("/alerts")
def alerts():
    return get_alerts()

@app.get("/predict/{location}")
def predict(location: str):
    return get_prediction(location)

@app.get("/route")
def route(source: str, destination: str):
    return get_best_route(
        source,
        destination
    )
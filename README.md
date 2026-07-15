# 🧭 Yatra Sahayak

AI-Assisted Crowd Prediction & Route Optimization for Ujjain Simhastha Mahakumbh

## 📌 Problem Statement

The Simhastha Mahakumbh draws millions of pilgrims, creating serious congestion risks at ghats, temples, and transit hubs. Yatra Sahayak is a decision-support dashboard that monitors crowd density, forecasts short-term congestion trends, and computes optimal routes between key locations — helping authorities and pilgrims alike make safer, faster decisions.

## 🎯 Features

### 📊 Pilgrim Density Monitor
Live crowd density per location, pulled from a SQLite-backed history of readings, refreshed every 5 seconds.

### 📈 Crowd Prediction
Forecasts crowd levels 30 minutes ahead using a linear regression model (scikit-learn) fit on each location's recent trend. **Note:** historical data is synthetically generated (`seed.py`) with realistic time-of-day patterns (peaks around early morning and evening aarti timings) to simulate what a real sensor feed would produce — the prediction pipeline itself is genuine and would work identically on real data.

### 🧭 Smart Route Guidance
Computes the shortest weighted path between any two locations using NetworkX (Dijkstra's algorithm) on a hand-defined graph of walking routes, then renders the actual road-following path on a live map via OSRM.

### 🗺️ Live Map
Interactive Leaflet map showing all locations color-coded by crowd density, with the selected route drawn as real road geometry (not a straight line).

### 🚨 Safety Alerts
Surfaces a top-of-page alert banner when any location crosses a high-congestion threshold (>80%).

## 🏛️ Monitored Locations

- Ram Ghat, Mahakaleshwar Temple, Har Siddhi Temple — real Ujjain landmarks
- Ujjain Railway Station, Nanakheda Bus Stand — real transit hubs
- Simhastha Sector A/B/C — illustrative zones used to simulate additional crowd-management points for the event

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Leaflet / React-Leaflet
**Backend:** FastAPI, Python
**Data & ML:** SQLAlchemy + SQLite, scikit-learn (Linear Regression)
**Routing:** NetworkX (shortest path), OSRM (road geometry)

## 🏗️ System Architecture

```text
Frontend (React + Vite + Tailwind)
          │
          ▼
      REST API
          │
          ▼
   Backend (FastAPI)
          │
 ┌────────┼────────┬─────────┐
 │        │        │         │
 ▼        ▼        ▼         ▼
Crowd   Predict   Route    Alert
(SQLite) (sklearn) (NetworkX) System
```

## 🚀 Installation

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed.py        # generates synthetic historical data
uvicorn main:app --reload
```
Runs at `http://127.0.0.1:8000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

## 🧪 Testing

Backend tests: `pytest backend/test/`

## 📷 Screenshots

*(keep your existing screenshot embeds here — re-take them once the rename is done so they show "Yatra Sahayak" in the header)*

## 🔮 Future Scope

- Real sensor/CCTV-based crowd data instead of simulated history
- Self-hosted OSRM instance for production reliability
- Mobile app for pilgrims with real-time GPS navigation
- IoT integration for live density readings

## 👨‍💻 Developed For

AI-Assisted Product Build Challenge — Track: Intelligent Crowd Flow Prediction & Route Optimization
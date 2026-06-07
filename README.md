# 🚦 Simhastha CrowdFlow AI

AI-Powered Crowd Prediction & Route Optimization System for Ujjain Simhastha Mahakumbh

## 📌 Problem Statement

The Simhastha Mahakumbh attracts millions of pilgrims, leading to congestion at ghats, temples, transport hubs, and major pathways. Managing crowd movement efficiently is critical for safety, emergency response, and pilgrim experience.

Simhastha CrowdFlow AI provides a smart dashboard that helps monitor crowd density, predict congestion, optimize routes, and generate safety alerts.

---

## 🎯 Features

### 📊 Pilgrim Density Monitor
- Real-time crowd monitoring across major Simhastha locations.
- Visual representation of crowd density levels.

### 📈 Crowd Prediction
- Predicts future crowd congestion based on current crowd trends.
- Helps authorities take preventive actions.

### 🧭 Smart Route Guidance
- Suggests optimal routes between important locations.
- Uses graph-based shortest path algorithms.

### 🚨 Safety & Congestion Alerts
- Generates alerts for highly congested areas.
- Assists crowd management teams in decision making.

### 🗺️ Crowd Heatmap
- Visual overview of crowd distribution across locations.

---

## 🏛️ Monitored Locations

- Ram Ghat
- Mahakaleshwar Temple
- Har Siddhi Temple
- Ujjain Railway Station
- Nanakheda Bus Stand
- Simhastha Sector A
- Simhastha Sector B
- Simhastha Sector C

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- FastAPI
- Python

### Algorithms & Libraries
- NetworkX (Route Optimization)
- REST APIs

---

## 🏗️ System Architecture

```text
Frontend (React + Vite)
          │
          ▼
      REST API
          │
          ▼
 Backend (FastAPI)
          │
 ┌────────┼────────┐
 │        │        │
 ▼        ▼        ▼
Crowd   Route   Alert
Data    Engine  System
```

## 🚀 Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 📷 Screenshots

- Dashboard
  <img width="1866" height="900" alt="image" src="https://github.com/user-attachments/assets/73b3448a-0aa5-45c0-982c-34bf87b33e1a" />

- Crowd Prediction and Smart Route Guidance
  <img width="1840" height="375" alt="image" src="https://github.com/user-attachments/assets/3a642e3b-99d4-491f-8fd1-56c63cf777fb" />


- Safety Alerts
  <img width="1808" height="522" alt="image" src="https://github.com/user-attachments/assets/14491a25-5fe3-48cf-a249-bdae675324ac" />


---

## 🔮 Future Scope

- CCTV-based Crowd Analytics
- Drone-assisted Monitoring
- AI-powered Crowd Forecasting
- Emergency Evacuation Planning
- IoT Sensor Integration
- Mobile App for Pilgrims
- Real-Time GPS Navigation

---

## 💡 Innovation

This project combines crowd monitoring, predictive analytics, route optimization, and safety alert generation into a unified decision-support platform for managing large-scale religious gatherings such as Ujjain Simhastha Mahakumbh.

---

## 👨‍💻 Developed For

AI-Assisted Product Build Challenge

Track: Intelligent Crowd Flow Prediction & Route Optimization

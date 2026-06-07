import CrowdCard from "../components/CrowdCard";
import PredictionPanel from "../components/PredictionPanel";
import RouteFinder from "../components/RouteFinder";
import MapView from "../components/MapView";
import AlertPanel from "../components/AlertPanel";

export default function Dashboard() {
  return (
    <div className="container">

      <div className="header">
  <h1>🚦 Simhastha CrowdFlow AI</h1>

  <p>
    Real-Time Crowd Prediction & Route Optimization
    for Ujjain Simhastha Mahakumbh
  </p>
</div>

      <div className="stats">

  <div className="stat-card">
    <h2>2.4M</h2>
    <p>Active Pilgrims</p>
  </div>

  <div className="stat-card">
    <h2>3</h2>
    <p>Congested Zones</p>
  </div>

  <div className="stat-card">
    <h2>8</h2>
    <p>Safe Routes</p>
  </div>

  <div className="stat-card">
    <h2>25</h2>
    <p>Emergency Teams</p>
  </div>

</div>

      <CrowdCard />

      <div className="section-grid">
        <PredictionPanel />
        <RouteFinder />
      </div>

      <MapView />

      <AlertPanel />
    </div>
  );
}
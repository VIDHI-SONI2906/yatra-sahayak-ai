import { useEffect, useState } from "react";
import { getCrowd, getAlerts } from "../services/api";
import CrowdCard from "../components/CrowdCard";
import HeatZones from "../components/HeatZones";
import RouteMap from "../components/RouteMap";
import PredictionPanel from "../components/PredictionPanel";
import RouteFinder from "../components/RouteFinder";
import AlertPanel from "../components/AlertPanel";

export default function Dashboard() {
  const [crowdData, setCrowdData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [routePath, setRoutePath] = useState(null);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    const [crowdRes, alertRes] = await Promise.all([getCrowd(), getAlerts()]);
    setCrowdData(crowdRes.data);
    setAlerts(alertRes.data);
  };

  const congestedCount = crowdData.filter((d) => d.crowd > 50).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 space-y-6">
      {alerts.length > 0 && <AlertPanel alerts={alerts} />}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          🚦 Simhastha CrowdFlow AI
        </h1>
        <p className="mt-2 text-blue-100">
          Real-Time Crowd Prediction & Route Optimization for Ujjain Simhastha Mahakumbh
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard value={crowdData.length} label="Locations Monitored" />
        <StatCard value={congestedCount} label="Congested Zones" />
        <StatCard value={alerts.length} label="Active Alerts" />
      </div>

      <CrowdCard data={crowdData} />

      <div className="grid md:grid-cols-2 gap-6">
        <PredictionPanel />
        <RouteFinder onRouteFound={setRoutePath} />
      </div>

      <RouteMap crowdData={crowdData} routePath={routePath} />

      <HeatZones data={crowdData} />
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-xl bg-slate-900 p-6 text-center">
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="text-slate-400 mt-1">{label}</p>
    </div>
  );
}
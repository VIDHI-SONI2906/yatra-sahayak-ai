import { useState } from "react";
import { getRoute } from "../services/api";

export default function RouteFinder({ onRouteFound }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);

  const locations = [
    "Ram Ghat",
    "Mahakaleshwar Temple",
    "Har Siddhi Temple",
    "Ujjain Railway Station",
    "Nanakheda Bus Stand",
    "Simhastha Sector A",
    "Simhastha Sector B",
    "Simhastha Sector C"
  ];

  const findRoute = async () => {
    if (!source || !destination) {
      alert("Please select source and destination");
      return;
    }
    try {
      const res = await getRoute(source, destination);
      setRoute(res.data);
      if (onRouteFound) onRouteFound(res.data.path);
    } catch (error) {
      alert("Route not found");
    }
  };

  const selectClasses =
    "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white mb-3";

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold mb-4">🧭 Smart Route Guidance</h2>

      <select value={source} onChange={(e) => setSource(e.target.value)} className={selectClasses}>
        <option value="">Select Source</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClasses}>
        <option value="">Select Destination</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <button
        onClick={findRoute}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2.5 font-medium"
      >
        Find Best Route
      </button>

      {route && (
        <div className="mt-4 rounded-xl bg-blue-950 border border-blue-600 p-4">
          <h3 className="font-semibold text-blue-200">Recommended Route</h3>
          <p className="text-sm text-slate-200 mt-2">{route.path.join(" ➜ ")}</p>
          <p className="text-sm text-blue-300 mt-2">
            ⏱ Estimated Time: {route.estimated_time} mins
          </p>
        </div>
      )}
    </div>
  );
}
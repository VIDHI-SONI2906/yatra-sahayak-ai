import { useState } from "react";
import { getRoute } from "../services/api";

export default function RouteFinder() {
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
    } catch (error) {
      alert("Route not found");
    }
  };

  return (
    <div className="card">
      <h2>🧭 Smart Route Guidance</h2>

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="">Select Source</option>

        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">Select Destination</option>

        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <button onClick={findRoute}>
        Find Best Route
      </button>

      {route && (
        <div
          className="route-result"
        >
          <h3>Recommended Route</h3>

          <p>
            {route.path.join(" ➜ ")}
          </p>

          <p>
            ⏱ Estimated Time:
            {" "}
            {route.estimated_time}
            {" "}
            mins
          </p>
        </div>
      )}
    </div>
  );
}
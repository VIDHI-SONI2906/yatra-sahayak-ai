import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { locationCoords } from "../data/locations";

function FitBounds({ points, fitKey }) {
  const map = useMap();
  const lastKey = useRef(null);

  useEffect(() => {
    if (points.length > 0 && fitKey !== lastKey.current) {
      map.fitBounds(points, { padding: [30, 30], maxZoom: 17 });
      lastKey.current = fitKey;
    }
  }, [fitKey, points, map]);

  return null;
}

export default function RouteMap({ crowdData, routePath }) {
  const [roadPath, setRoadPath] = useState([]);

  const getColor = (crowd) => {
    if (crowd > 50) return "#ef4444";
    if (crowd > 35) return "#f59e0b";
    return "#22c55e";
  };

  const allPoints = crowdData
    .map((item) => locationCoords[item.location])
    .filter(Boolean);

  const waypoints = routePath
    ? routePath.map((name) => locationCoords[name]).filter(Boolean)
    : [];

  useEffect(() => {
    if (waypoints.length < 2) {
      setRoadPath([]);
      return;
    }
    const coordStr = waypoints.map(([lat, lng]) => `${lng},${lat}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes[0]) {
          const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRoadPath(coords);
        } else {
          setRoadPath(waypoints);
        }
      })
      .catch(() => setRoadPath(waypoints));
  }, [routePath]);

  // Frame the real road geometry once loaded; fall back to straight waypoints/all points
  const focusPoints = roadPath.length > 1 ? roadPath : waypoints.length > 1 ? waypoints : allPoints;

  // Stable key so we only re-fit when the actual route changes, not on every 5s poll
  const fitKey = routePath ? routePath.join("|") : "all";

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold mb-4">🗺 Live Map</h2>
      <div className="rounded-xl overflow-hidden" style={{ height: "450px" }}>
        <MapContainer style={{ height: "100%", width: "100%" }} center={[23.18, 75.77]} zoom={14}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {focusPoints.length > 0 && <FitBounds points={focusPoints} fitKey={fitKey} />}

          {crowdData.map((item) => {
            const coords = locationCoords[item.location];
            if (!coords) return null;
            const onRoute = routePath && routePath.includes(item.location);
            return (
              <CircleMarker
                key={item.location}
                center={coords}
                radius={onRoute ? 12 : 9}
                pathOptions={{
                  color: getColor(item.crowd),
                  fillColor: getColor(item.crowd),
                  fillOpacity: 0.85,
                  weight: onRoute ? 3 : 1,
                }}
              >
                <Popup>
                  <strong>{item.location}</strong><br />
                  Crowd: {item.crowd}%
                </Popup>
              </CircleMarker>
            );
          })}

          {roadPath.length > 1 && (
            <Polyline positions={roadPath} pathOptions={{ color: "#3b82f6", weight: 5 }} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
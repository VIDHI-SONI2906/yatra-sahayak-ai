import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    const res = await getAlerts();
    setAlerts(res.data);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Alerts</h2>

      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        alerts.map((a, i) => (
          <p key={i} style={{ color: "red" }}>{a}</p>
        ))
      )}
    </div>
  );
}
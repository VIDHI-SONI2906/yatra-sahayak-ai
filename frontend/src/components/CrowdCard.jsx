import { useEffect, useState } from "react";
import { getCrowd } from "../services/api";

export default function CrowdCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    load();

    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    const res = await getCrowd();
    setData(res.data);
  };

  const getStatus = (crowd) => {
    if (crowd > 80) return "🔴 High";
    if (crowd > 50) return "🟠 Moderate";
    return "🟢 Safe";
  };

  const getColor = (crowd) => {
    if (crowd > 80) return "#ef4444";
    if (crowd > 50) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div className="card">
      <h2>🕉 Pilgrim Density Monitor</h2>

      <div className="crowd-grid">
        {data.map((item) => (
          <div
            key={item.location}
            className="crowd-card"
          >
            <h3>{item.location}</h3>

            <p>
              Crowd Density: <strong>{item.crowd}%</strong>
            </p>

            <p>
              Status: {getStatus(item.crowd)}
            </p>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${item.crowd}%`,
                  background: getColor(item.crowd)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
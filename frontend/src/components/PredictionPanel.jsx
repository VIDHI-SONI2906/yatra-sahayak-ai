import { useState } from "react";
import { getPrediction } from "../services/api";

export default function PredictionPanel() {
  const [location, setLocation] = useState("");
  const [prediction, setPrediction] = useState(null);

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

  const predictCrowd = async () => {
    if (!location) {
      alert("Please select a location");
      return;
    }

    try {
      const res = await getPrediction(location);
      setPrediction(res.data);
    } catch (error) {
      alert("Prediction failed");
    }
  };

  return (
    <div className="card">
      <h2>📈 Crowd Prediction</h2>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">
          Select Location
        </option>

        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <button onClick={predictCrowd}>
        Predict Crowd
      </button>

      {prediction && (
        <div
  className="prediction-result"
>
          <h3>{prediction.location}</h3>

          <p>
            Current Crowd:
            {" "}
            {prediction.current}%
          </p>

          <p>
            Predicted Crowd (Next 30 min):
            {" "}
            {prediction.predicted}%
          </p>

          <p>
            Status:
            {" "}
            {prediction.predicted > 80
              ? "🔴 High Congestion Expected"
              : prediction.predicted > 50
              ? "🟠 Moderate Crowd"
              : "🟢 Safe"}
          </p>
        </div>
      )}
    </div>
  );
}
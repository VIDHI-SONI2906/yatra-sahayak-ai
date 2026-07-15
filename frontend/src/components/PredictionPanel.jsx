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

  const statusFor = (predicted) => {
    if (predicted > 50) return { text: "High Congestion Expected", icon: "🔴", color: "text-red-300" };
    if (predicted > 35) return { text: "Moderate Crowd", icon: "🟠", color: "text-amber-300" };
    return { text: "Safe", icon: "🟢", color: "text-emerald-300" };
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold mb-4">📈 Crowd Prediction</h2>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white mb-3"
      >
        <option value="">Select Location</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <button
        onClick={predictCrowd}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2.5 font-medium"
      >
        Predict Crowd
      </button>

      {prediction && (
        <div className="mt-4 rounded-xl bg-slate-800 border border-slate-700 p-4">
          <h3 className="font-semibold">{prediction.location}</h3>
          <p className="text-sm text-slate-300 mt-2">
            Current Crowd: <strong>{prediction.current}%</strong>
          </p>
          <p className="text-sm text-slate-300">
            Predicted Crowd (Next 30 min): <strong>{prediction.predicted}%</strong>
          </p>
          {(() => {
            const s = statusFor(prediction.predicted);
            return (
              <p className={`text-sm mt-2 ${s.color}`}>
                {s.icon} {s.text}
              </p>
            );
          })()}
        </div>
      )}
    </div>
  );
}
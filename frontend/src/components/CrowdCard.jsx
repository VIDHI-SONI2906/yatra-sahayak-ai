export default function CrowdCard({ data }) {
  const getStatus = (crowd) => {
    if (crowd > 50) return { label: "High", color: "text-red-400", bar: "bg-red-500" };
    if (crowd > 35) return { label: "Moderate", color: "text-amber-400", bar: "bg-amber-500" };
    return { label: "Safe", color: "text-emerald-400", bar: "bg-emerald-500" };
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold mb-4">🕉 Pilgrim Density Monitor</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => {
          const status = getStatus(item.crowd);
          return (
            <div key={item.location} className="rounded-xl bg-slate-800 p-4">
              <h3 className="font-semibold">{item.location}</h3>
              <p className="text-sm text-slate-300 mt-1">
                Crowd Density: <strong>{item.crowd}%</strong>
              </p>
              <p className={`text-sm mt-1 ${status.color}`}>● {status.label}</p>
              <div className="mt-3 h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                  className={`h-full ${status.bar}`}
                  style={{ width: `${item.crowd}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default function HeatZones({ data }) {
  const getStyle = (crowd) => {
    if (crowd > 50) return { bg: "bg-red-500", icon: "🔴" };
    if (crowd > 35) return { bg: "bg-amber-500", icon: "🟠" };
    return { bg: "bg-emerald-500", icon: "🟢" };
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="text-xl font-semibold mb-4">📊 Crowd Overview</h2>
      <div className="space-y-2">
        {data.map((loc) => {
          const s = getStyle(loc.crowd);
          return (
            <div key={loc.location} className={`${s.bg} rounded-lg px-4 py-2 flex justify-between items-center`}>
              <span>{s.icon} {loc.location}</span>
              <span className="font-semibold">{loc.crowd}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
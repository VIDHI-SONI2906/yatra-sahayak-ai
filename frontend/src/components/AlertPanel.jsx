export default function AlertPanel({ alerts }) {
  return (
    <div className="rounded-2xl bg-red-950 border border-red-600 p-5">
      <h2 className="text-lg font-semibold text-red-300 flex items-center gap-2 mb-3">
        🚨 Active Alerts
      </h2>
      <div className="space-y-2">
        {alerts.map((a, i) => (
          <p key={i} className="text-red-200 bg-red-900/50 rounded-lg px-4 py-2">
            {a}
          </p>
        ))}
      </div>
    </div>
  );
}
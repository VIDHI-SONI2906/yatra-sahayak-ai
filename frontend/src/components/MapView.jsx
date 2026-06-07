export default function MapView() {

  const locations = [
    { name: "Sangam Ghat", crowd: 90 },
    { name: "Temple Area", crowd: 65 },
    { name: "Bus Stand", crowd: 85 },
    { name: "Railway Station", crowd: 45 },
    { name: "Sector A", crowd: 35 },
    { name: "Sector B", crowd: 55 },
    { name: "Sector C", crowd: 25 }
  ];

  const getColor = (crowd) => {
    if (crowd > 80) return "red";
    if (crowd > 50) return "orange";
    return "green";
  };

  return (
    <div className="card">
      <h2>🗺 Crowd Heat Zones</h2>

      <div className="heatmap">

        {locations.map((loc) => (
          <div
            key={loc.name}
            className="heatbox"
            style={{
              backgroundColor: getColor(loc.crowd)
            }}
          >
            {loc.name}
            <br />
            {loc.crowd}%
          </div>
        ))}

      </div>
    </div>
  );
}
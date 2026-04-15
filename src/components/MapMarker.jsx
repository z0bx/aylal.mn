import { useState } from "react";

export default function MapMarker({ top, left, name, color, img }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{ position: "absolute", top, left }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "relative" }}>
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 36,
            color,
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,.3))",
            fontVariationSettings: "'FILL' 1",
            cursor: "pointer",
            display: "block",
          }}
        >
          location_pin
        </span>

        {hov && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: 16,
              width: 192,
              background: "#fff",
              padding: 16,
              borderRadius: 12,
              boxShadow: "0 12px 40px rgba(0,0,0,.2)",
              zIndex: 10,
            }}
          >
            <img src={img} alt={name} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
            <h4 style={{ fontSize: 13, fontWeight: 700 }}>{name}</h4>
          </div>
        )}
      </div>
    </div>
  );
}
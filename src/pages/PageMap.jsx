import { useState } from "react";
import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import { BtnPrimary } from "../components/Buttons";
import GoogleMapComponent from "../components/GoogleMap";
import { useNavigation } from "../hooks/useNavigation";

export default function PageMap({ setPage }) {
  const { navigateTo } = useNavigation();
  const [stops,     setStops]     = useState([
    { id: 1, label: "Зогсоол 1", name: "Тэрэлж БЦГ", lat: 47.8926, lng: 107.3044 },
    { id: 2, label: "Зогсоол 2", name: "Хустай Нуруу", lat: 47.7333, lng: 107.2667 },
  ]);
  const [stopInput, setStopInput] = useState("");
  const [addMode,   setAddMode]   = useState(false);

  const addStop = () => {
    if (!stopInput.trim()) return;
    setStops(s => [...s, { id: Date.now(), label: `Зогсоол ${s.length + 1}`, name: stopInput, lat: 47.9, lng: 106.88 }]);
    setStopInput(""); setAddMode(false);
  };

  const handleMapClick = (event) => {
    if (!event || !event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setStops((s) => [
      ...s,
      {
        id: Date.now(),
        label: `Зогсоол ${s.length + 1}`,
        name: `Шинэ цэг ${s.length + 1}`,
        lat,
        lng,
      },
    ]);
  };

  // Map markers for Google Maps
  const mapMarkers = [
    { id: 0, name: "Улаанбаатар", lat: 47.9, lng: 106.88, color: T.primary },
    ...stops.map(s => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng, color: T.secondary }))
  ];

  // Create route path
  const routePath = mapMarkers.map(m => ({ lat: m.lat, lng: m.lng }));

  return (
    <main style={{ display: "flex", height: "calc(100vh - 80px)", overflow: "hidden" }}>
      {/* ── Sidebar ── */}
      <aside style={{ width: 380, flexShrink: 0, background: T.surfaceContainerLow, overflowY: "auto", zIndex: 40, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="fu">
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: T.primary }}>Аялал төлөвлөлт</span>
            <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 32, fontWeight: 900, marginTop: 8 }}>Маршрут төлөвлөгч</h1>
          </div>

          {/* Start point */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.1em" }}>Эхлэх цэг</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.outlineVariant}40`, padding: "10px 0", marginTop: 6 }}>
              <Icon name="location_on" size={18} style={{ color: T.primary }} />
              <input defaultValue="Улаанбаатар хот" style={{ background: "transparent", border: "none", fontFamily: "'Work Sans',sans-serif", fontSize: 14, color: T.onSurface, flex: 1, outline: "none" }} />
            </div>
          </div>

          {/* Stops list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {stops.map(s => (
              <div key={s.id} style={{ background: T.surfaceContainerLowest, padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 4px rgba(32,27,14,.06)" }}>
                <Icon name="trip_origin" size={18} style={{ color: T.tertiaryContainer }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: T.onSurfaceVariant, fontWeight: 600 }}>{s.label}</p>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</p>
                </div>
                <button onClick={() => setStops(p => p.filter(x => x.id !== s.id))} style={{ background: "none", border: "none", color: T.outlineVariant }}>
                  <Icon name="close" size={16} />
                </button>
              </div>
            ))}
            {addMode ? (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  autoFocus
                  value={stopInput}
                  onChange={e => setStopInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addStop()}
                  placeholder="Газрын нэр оруулна уу"
                  style={{ flex: 1, background: T.surfaceContainerLowest, border: `1px solid ${T.outlineVariant}50`, borderRadius: 8, padding: "10px 14px", fontFamily: "'Work Sans',sans-serif", fontSize: 13, outline: "none" }}
                />
                <button onClick={addStop} style={{ background: T.primary, color: "#fff", border: "none", borderRadius: 8, padding: "0 16px", fontSize: 13, fontWeight: 700 }}>+</button>
              </div>
            ) : (
              <button onClick={() => setAddMode(true)} style={{ padding: "14px", border: `1px dashed ${T.outlineVariant}50`, borderRadius: 12, background: "transparent", color: T.onSurfaceVariant, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon name="add" size={16} /> Зогсоол нэмэх
              </button>
            )}
          </div>

          {/* Cost estimate */}
          <div style={{ background: T.surfaceContainer, padding: 24, borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurfaceVariant }}>Тооцоолсон зардал</h3>
                <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 28, fontWeight: 900, color: T.primary, marginTop: 4 }}>2,450,000 ₮</p>
              </div>
              <Icon name="payments" size={28} style={{ color: T.primaryContainer }} />
            </div>
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${T.outlineVariant}20`, display: "flex", flexDirection: "column", gap: 8 }}>
              {[["Шатахуун", "450,000 ₮"], ["Байрлах газар", "1,200,000 ₮"], ["Хөтөч & Хоол", "800,000 ₮"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span style={{ color: T.onSurfaceVariant }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <BtnPrimary onClick={() => navigateTo("booking")} style={{ padding: "16px", justifyContent: "center", borderRadius: 8, fontSize: 13, gap: 10 }}>
            Аялал эхлүүлэх <Icon name="arrow_forward" size={16} />
          </BtnPrimary>
        </div>
      </aside>

      {/* ── Map canvas ── */}
      <section style={{ flex: 1, position: "relative", background: T.surfaceContainerHigh, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 24, left: 24, zIndex: 12, background: "rgba(255,255,255,.95)", padding: "10px 16px", borderRadius: 999, boxShadow: "0 10px 30px rgba(32,27,14,.08)", fontSize: 13, fontWeight: 600, color: T.onSurface, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="place" size={16} />
          <span>Газрын цэг нэмэхэд газрын зураг дээр дарна уу</span>
        </div>
        <GoogleMapComponent markers={mapMarkers} routePath={routePath} onMapClick={handleMapClick} />

        {/* Route info pill */}
        <div style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,.85)", backdropFilter: "blur(12px)", padding: "10px 24px", borderRadius: 999, boxShadow: "0 4px 16px rgba(32,27,14,.12)", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="distance" size={14} style={{ color: T.primary }} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>185 км</span>
          </div>
          <div style={{ width: 1, height: 16, background: T.outlineVariant }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="schedule" size={14} style={{ color: T.primary }} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>3ц 45м</span>
          </div>
        </div>

        {/* Zoom controls */}
        <div style={{ position: "absolute", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          <button style={{ width: 44, height: 44, background: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(32,27,14,.15)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: T.onSurfaceVariant }}>
            <Icon name="my_location" size={18} />
          </button>
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 4px 12px rgba(32,27,14,.15)", overflow: "hidden" }}>
            {["add", "remove"].map((ic, i) => (
              <button key={ic} style={{ display: "flex", width: 44, height: 44, alignItems: "center", justifyContent: "center", border: "none", borderBottom: i === 0 ? `1px solid ${T.outlineVariant}20` : "none", background: "transparent", color: T.onSurfaceVariant }}>
                <Icon name={ic} size={16} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
import { T } from "../constants/theme";
import Icon from "./Icon";

const COLUMNS = [
  { title: "Цэс",          links: ["Бидний тухай", "Холбоо барих", "Асуулт хариулт"] },
  { title: "Хууль эрх зүй", links: ["Нууцлалын бодлого", "Үйлчилгээний нөхцөл", "Төлбөрийн нөхцөл"] },
  { title: "Холбоо барих",  links: ["Улаанбаатар хот", "+976 7000 0000", "info@nomadichorizon.mn"] },
];

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: T.surfaceContainer, padding: "64px 32px", marginTop: 96 }}>
      <div style={{ width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
          {/* Brand */}
          <div>
            <a
              onClick={() => setPage("home")}
              style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 900, color: T.primary, cursor: "pointer", display: "block", marginBottom: 16 }}
            >
              Nomadic Horizon
            </a>
            <p style={{ fontSize: 13, color: T.onSurfaceVariant, lineHeight: 1.7 }}>
              Монгол орны өвөрмөц соёл, байгалийн үзэсгэлэнг дэлхий дахинд сурталчлах эрхэм зорилготой аяллын агентлаг.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              {["public", "share", "mail"].map(ic => (
                <span key={ic} style={{ color: T.primary, opacity: .6, cursor: "pointer" }}>
                  <Icon name={ic} size={20} />
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: T.primary, marginBottom: 20 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a style={{ fontSize: 13, color: T.onSurfaceVariant, opacity: .8 }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${T.outline}25`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 11, color: T.onSurfaceVariant, opacity: .6 }}>
            © 2024 Nomadic Horizon. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <span style={{ color: T.primary, opacity: .6 }}>
            <Icon name="language" size={16} />
          </span>
        </div>
      </div>
    </footer>
  );
}
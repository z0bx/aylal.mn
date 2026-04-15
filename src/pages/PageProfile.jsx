import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import Badge from "../components/Bagde.jsx";
import { BtnPrimary, BtnGhost } from "../components/Buttons";

const JOURNAL_ENTRIES = [
  { title: "Алтай Таван Богд",          date: "2024.05.12", km: "420 км",  quote: "Мөсөн голын өглөөний туяа үнэхээр ер бусын...", img: IMGS.altaiSmall },
  { title: "Хөвсгөл нуур",              date: "2024.03.20", km: "850 км",  quote: "Мөсний баярын үеэр авсан зургууд минь...",       img: IMGS.khovsgol  },
  { title: "Тэрэлж байгалийн цогцолбор", date: "2024.01.05", km: "60 км",   quote: "Хадан тогтоц ба өвлийн нам гүм байдал...",      img: IMGS.terelj2   },
];

const STATS = [
  { label: "Очсон газрууд",     val: "24",  accent: T.primary },
  { label: "Аяллын тэмдэглэл",  val: "156", accent: T.secondary },
  { label: "Нийт ажиглалт",     val: "89",  accent: T.tertiary },
  { label: "Үнэлгээ",           val: "4.9", accent: T.primaryContainer },
];

export default function PageProfile({ setPage }) {
  return (
    <main style={{ width: "100%", padding: "48px 32px 0" }}>
      {/* ── Hero ── */}
      <section style={{ marginBottom: 80, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }} className="fu">
        <div>
          <Badge>Pathfinder Rank</Badge>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: T.primary, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
            Аялагч мастер
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: T.onSurfaceVariant, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 22 }}>Kaelen Vance</span>
            <span style={{ opacity: .3 }}>|</span>
            <span style={{ fontSize: 16 }}>Туулсан зам: 42,000 км</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <BtnPrimary onClick={() => setPage("booking")}>Шинэ аялал захиалах</BtnPrimary>
          <BtnGhost   onClick={() => setPage("map")}>Маршрут харах</BtnGhost>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "flex-start" }}>
        {/* ── Main column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* Upcoming trip */}
          <section className="fu1">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 26, fontWeight: 700 }}>Удахгүй болох аялал</h2>
              <a style={{ color: T.primary, fontWeight: 700, fontSize: 13, textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer" }}>Бүгдийг харах</a>
            </div>
            <div onClick={() => setPage("travel")} className="card-lift" style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ aspectRatio: "21/9", overflow: "hidden" }}>
                <img src={IMGS.gobiBig} alt="Gobi" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(32,27,14,.8), transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: "32px 48px", color: "#fff" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                  <span style={{ background: T.primary, padding: "4px 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", borderRadius: 4 }}>8 сарын 15</span>
                  <span style={{ background: "rgba(255,255,255,.2)", backdropFilter: "blur(8px)", padding: "4px 12px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", borderRadius: 4 }}>12 өдөр</span>
                </div>
                <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Говийн элсэн манхан</h3>
                <p style={{ color: "rgba(255,255,255,.8)", maxWidth: 480, lineHeight: 1.6, marginBottom: 24 }}>
                  Өмнөговь аймгийн Хонгорын элс рүү хийх энэхүү аялал нь байгалийн хамгийн үзэсгэлэнт тогтоц болон нүүдэлчин ахуйтай танилцах боломж олгоно.
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: T.onSurface, padding: "12px 24px", borderRadius: 6, fontWeight: 700 }}>
                  <Icon name="map" size={18} />Аяллын дэлгэрэнгүй
                </span>
              </div>
            </div>
          </section>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16 }} className="fu2">
            {STATS.map(s => (
              <div key={s.label} style={{ background: T.surfaceContainer, padding: 24, borderRadius: 12, borderLeft: `4px solid ${s.accent}` }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurfaceVariant, marginBottom: 6 }}>{s.label}</p>
                <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 30, fontWeight: 900 }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Journal sidebar ── */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 24 }} className="fu3">
          <div style={{ background: T.surfaceContainerLow, padding: 32, borderRadius: 12 }}>
            <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700, marginBottom: 32 }}>Тэмдэглэлүүд</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {JOURNAL_ENTRIES.map(e => (
                <div key={e.title} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    <img
                      src={e.img}
                      alt={e.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", transition: "filter .3s" }}
                      onMouseEnter={ev => ev.target.style.filter = "none"}
                      onMouseLeave={ev => ev.target.style.filter = "grayscale(100%)"}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 14 }}>{e.title}</h4>
                    <p style={{ fontSize: 11, color: T.onSurfaceVariant, marginBottom: 6 }}>{e.date} • {e.km}</p>
                    <p style={{ fontSize: 12, fontStyle: "italic", color: T.onSurfaceVariant, lineHeight: 1.5 }}>"{e.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", marginTop: 40, padding: "16px", border: `1px solid ${T.outlineVariant}40`, color: T.onSurfaceVariant, fontFamily: "'Work Sans',sans-serif", fontWeight: 700, borderRadius: 6, background: "transparent", cursor: "pointer" }}>
              Бүх тэмдэглэлийг унших
            </button>
          </div>

          {/* Rank progress */}
          <div style={{ background: T.primaryContainer, padding: 32, borderRadius: 12, color: T.onPrimaryContainer }} className="fu4">
            <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Дараагийн даваа</h4>
            <p style={{ fontSize: 13, opacity: .9, marginBottom: 24, lineHeight: 1.6 }}>
              "Аялагч мастер" зэргээс "Ертөнцийн хайгуулч" болоход 8,000 км дутуу байна.
            </p>
            <div style={{ height: 6, background: "rgba(0,0,0,.15)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "80%", height: "100%", background: T.primary, borderRadius: 3, transition: "width 1s ease" }} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
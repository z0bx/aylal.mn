import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import Badge from "../components/Bagde";
import { BtnPrimary, BtnGhost } from "../components/Buttons";
import siteData from "../data/site-data.json";

export default function PageTravel({ setPage }) {
  return (
    <main style={{ width: "100%", padding: "64px 32px 0" }}>
      {/* ── Hero header ── */}
      <header style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, marginBottom: 96, alignItems: "flex-end" }} className="fu">
        <div>
          <span style={{ fontSize: 12, color: T.primary, fontFamily: "'Work Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 16, fontWeight: 600 }}>Экспедицийн танилцуулга</span>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(40px,5vw,72px)", fontWeight: 900, color: T.onSurface, lineHeight: 1.1, marginBottom: 24 }}>Алтайн бүргэдүүд</h1>
          <p style={{ fontSize: 20, fontWeight: 300, color: T.onSurfaceVariant, fontStyle: "italic", lineHeight: 1.7 }}>
            "Ариун жим" – Тэнгэрийн хаадтай зэрэгцэн орших Монгол Алтайн нурууны нууцлаг түүхээр аялах нь.
          </p>
        </div>
        <div style={{ background: T.surfaceContainerLow, padding: 32, borderRadius: 12 }} className="fu1">
          {[
            ["schedule", "Аяллын хугацаа",  "14 хоног"],
            ["terrain",  "Хүндрэлийн зэрэг","Дундаас дээш"],
            ["group",    "Бүлгийн хэмжээ",  "8–12 хүн"],
          ].map(([ic, label, val]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <Icon name={ic} size={22} style={{ color: T.primary }} />
              <div>
                <p style={{ fontSize: 10, color: T.onSurfaceVariant, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>{val}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ── Bento photo grid ── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 96 }} className="fu2">
        <div className="card-lift" style={{ gridColumn: "span 2", gridRow: "span 2", position: "relative", height: 600, overflow: "hidden", borderRadius: 12 }}>
          <img src={IMGS.eagle} alt="Eagle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.5), transparent 50%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: 32 }}>
            <Badge>ОНЦЛОХ ТУРШЛАГА</Badge>
            <h3 style={{ color: "#fff", fontFamily: "'Noto Serif',serif", fontSize: 28, fontWeight: 700, marginTop: 12 }}>Бүргэдийн анчдын өв соёл</h3>
          </div>
        </div>
        {[{ img: IMGS.altaiPeaks, alt: "Altai peaks" }, { img: IMGS.horses, alt: "Horses" }].map(({ img, alt }) => (
          <div key={alt} className="card-lift" style={{ height: 288, overflow: "hidden", borderRadius: 12 }}>
            <img src={img} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
        <div className="card-lift" style={{ gridColumn: "span 2", position: "relative", height: 288, overflow: "hidden", borderRadius: 12 }}>
          <img src={IMGS.ger} alt="Ger" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `${T.primary}33`, backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", border: "1px solid rgba(255,255,255,.4)", padding: "12px 32px", borderRadius: 4, backdropFilter: "blur(8px)", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Галерей үзэх</span>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ maxWidth: 960, margin: "0 auto 96px" }}>
        <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, textAlign: "center", marginBottom: 80 }} className="fu">
          Аяллын ариун жим
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {siteData.days.map((d, i) => (
            <div key={d.num} className={`fu${i + 1}`} style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
              <div style={{ width: "30%", display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 64, fontWeight: 900, color: T.primary, opacity: .2 }}>{d.num}</span>
              </div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.tertiaryContainer, marginTop: 32, flexShrink: 0 }} />
              <div
                style={{ flex: 1, background: d.border ? T.surfaceContainerLowest : T.surfaceContainerLow, padding: 40, borderRadius: 12, borderLeft: d.border ? `4px solid ${T.primary}` : "none", boxShadow: d.border ? "0 2px 8px rgba(32,27,14,.06)" : "none" }}
                className="card-lift"
              >
                <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{d.title}</h3>
                <p style={{ color: T.onSurfaceVariant, lineHeight: 1.7, marginBottom: 20 }}>{d.text}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {d.badges.map((b, bi) => (
                    <Badge key={b} variant={bi === 0 && d.badgePrimary === 0 ? "primary" : "surface"}>{b}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: T.surfaceContainerHighest, borderRadius: 12, padding: 80, textAlign: "center", marginBottom: 80, position: "relative", overflow: "hidden" }} className="fu">
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 900, marginBottom: 20 }}>Та бэлэн үү?</h2>
          <p style={{ color: T.onSurfaceVariant, maxWidth: 500, margin: "0 auto 40px", fontSize: 16 }}>Хязгааргүй тал нутаг, мөнх цаст оргилууд таныг хүлээж байна.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => setPage("booking")} style={{ padding: "16px 40px", fontSize: 13 }}>ОДОО ЗАХИАЛАХ</BtnPrimary>
            <BtnGhost style={{ padding: "16px 40px", fontSize: 13 }}>ХӨТӨЛБӨР ТАТАХ</BtnGhost>
          </div>
        </div>
      </section>
    </main>
  );
}
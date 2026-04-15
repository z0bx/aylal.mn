import { useState } from "react";
import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import Badge from "../components/Bagde";
import { BtnPrimary, BtnGhost } from "../components/Buttons";

const STATS = [
  { val: "1.5M", label: "Нутаг дэвсгэр (км²)" },
  { val: "300+", label: "Нартай өдөр" },
  { val: "21",   label: "Аймгийн соёл" },
  { val: "100%", label: "Онгон байгаль" },
];

export default function PageHome({ setPage }) {
  const [newsEmail, setNewsEmail] = useState("");
  const [newsDone,  setNewsDone]  = useState(false);

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: 700, display: "flex", alignItems: "center", padding: "80px 64px 96px", overflow: "hidden" }} className="fu">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMGS.hero} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${T.surface}CC, ${T.surface}66, transparent)` }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }} className="fu2">
          <Badge>Discovery Mongolia</Badge>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontWeight: 900, fontSize: "clamp(48px,7vw,80px)", color: T.onSurface, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "24px 0 20px" }}>
            Алтан талын<br />шивнээ
          </h1>
          <p style={{ fontSize: 18, color: T.onSurfaceVariant, lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
            Монгол орны онгон дагшин байгаль, нүүдэлчин соёлтой танилцах хосгүй аялал.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => setPage("travel")} style={{ padding: "16px 32px", fontSize: 13 }}>
              <span>Аялалаа эхлэх</span><Icon name="arrow_forward" size={16} />
            </BtnPrimary>
            <BtnGhost style={{ padding: "16px 32px", fontSize: 13, gap: 12 }}>
              <Icon name="play_circle" size={18} /><span>Бичлэг үзэх</span>
            </BtnGhost>
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section style={{ padding: "96px 32px", background: T.surface }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, gap: 24, flexWrap: "wrap" }} className="fu">
            <div style={{ maxWidth: 480 }}>
              <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: T.primary, marginBottom: 16 }}>Алдартай чиглэлүүд</h2>
              <div style={{ height: 4, width: 72, background: T.secondaryContainer, marginBottom: 20, borderRadius: 2 }} />
              <p style={{ color: T.onSurfaceVariant, fontSize: 16 }}>Талын салхинаас эхлээд говийн элсэн манхан хүртэлх Монгол орны хамгийн гайхалтай цэгүүд.</p>
            </div>
            <a onClick={() => setPage("map")} style={{ color: T.primary, fontWeight: 700, fontSize: 14, borderBottom: `1px solid ${T.primary}33`, paddingBottom: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Бүх чиглэлийг харах <Icon name="north_east" size={14} />
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 16 }}>
            {/* Gobi – large */}
            <div onClick={() => setPage("travel")} className="card-lift" style={{ gridColumn: "span 8", position: "relative", overflow: "hidden", borderRadius: 12, height: 460 }}>
              <img src={IMGS.gobi} alt="Говь" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: 40 }}>
                <span style={{ color: T.primaryFixed, fontFamily: "'Work Sans',sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 8 }}>Өмнөговь</span>
                <h3 style={{ color: "#fff", fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Говь</h3>
                <p style={{ color: "rgba(255,255,255,.8)", maxWidth: 360, marginBottom: 20, fontWeight: 300 }}>Дуулдаг элсэн манхан, Хэрмэн цавын улаан хадан хясаа болон үлэг гүрвэлийн мөрөөр аялах гайхамшигт ертөнц.</p>
                <span style={{ display: "inline-block", background: "rgba(255,255,255,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", padding: "10px 24px", borderRadius: 4, fontSize: 13, fontWeight: 700 }}>Дэлгэрэнгүй</span>
              </div>
            </div>
            {/* Altai */}
            <div onClick={() => setPage("travel")} className="card-lift" style={{ gridColumn: "span 4", position: "relative", overflow: "hidden", borderRadius: 12, height: 460 }}>
              <img src={IMGS.altai} alt="Алтай" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: 32 }}>
                <span style={{ color: T.primaryFixed, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 8 }}>Баян-Өлгий</span>
                <h3 style={{ color: "#fff", fontFamily: "'Noto Serif',serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Алтай</h3>
                <Icon name="arrow_right_alt" size={28} style={{ color: "#fff" }} />
              </div>
            </div>
            {/* Terelj */}
            <div onClick={() => setPage("travel")} className="card-lift" style={{ gridColumn: "span 4", position: "relative", overflow: "hidden", borderRadius: 12, height: 320 }}>
              <img src={IMGS.terelj} alt="Тэрэлж" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: 32 }}>
                <span style={{ color: T.primaryFixed, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 8 }}>Төв аймаг</span>
                <h3 style={{ color: "#fff", fontFamily: "'Noto Serif',serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Тэрэлж</h3>
                <Icon name="arrow_right_alt" size={28} style={{ color: "#fff" }} />
              </div>
            </div>
            {/* Stats block */}
            <div style={{ gridColumn: "span 8", background: T.surfaceContainerLow, borderRadius: 12, padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 24 }}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <span style={{ display: "block", fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 900, color: T.primary, marginBottom: 6 }}>{s.val}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.onSurfaceVariant }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40, paddingTop: 40, borderTop: `1px solid ${T.outlineVariant}30` }}>
                <blockquote style={{ fontFamily: "'Noto Serif',serif", fontStyle: "italic", fontSize: 20, color: T.onSurface, opacity: .75, lineHeight: 1.6 }}>
                  "Талын нүүдэлчдийн сүнс салхинд нь оршиж, эрх чөлөө нь уудам талд нь багтдаг."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ padding: "96px 32px", background: T.surfaceContainerHigh }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }} className="fu">
          <Icon name="mail" size={48} style={{ color: T.primary, display: "block", marginBottom: 24 }} />
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Аяллын мэдээлэл хүлээн авах</h2>
          <p style={{ color: T.onSurfaceVariant, marginBottom: 40, fontSize: 16 }}>Шинэ аяллын хөтөлбөр болон онцгой хөнгөлөлтийн мэдээллийг цаг алдалгүй аваарай.</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto" }}>
            <input
              value={newsEmail}
              onChange={e => setNewsEmail(e.target.value)}
              placeholder="Таны имэйл хаяг"
              type="email"
              style={{ flex: 1, background: T.surfaceContainerLowest, border: "none", borderBottom: `2px solid ${T.outlineVariant}`, padding: "14px 20px", fontFamily: "'Work Sans',sans-serif", fontSize: 14, color: T.onSurface, outline: "none", borderRadius: "4px 4px 0 0" }}
            />
            <BtnPrimary
              onClick={() => { if (newsEmail) { setNewsDone(true); setNewsEmail(""); } }}
              style={{ padding: "14px 24px", borderRadius: 4 }}
            >
              {newsDone ? "✓" : "Бүртгүүлэх"}
            </BtnPrimary>
          </div>
        </div>
      </section>
    </main>
  );
}
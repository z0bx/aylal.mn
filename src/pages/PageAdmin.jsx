import { useState } from "react";
import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import QuickActionBtn from "../components/QuickActionBtn";

const CHART_DATA = [
  { month: "1-р сар", h: 40,  active: false },
  { month: "2-р сар", h: 65,  active: false },
  { month: "3-р сар", h: 85,  active: true  },
  { month: "4-р сар", h: 55,  active: false },
  { month: "5-р сар", h: 75,  active: false },
  { month: "6-р сар", h: 95,  active: true  },
];

const ACTIVITY = [
  { text: "Б. Бат-Эрдэнэ захиалга хийлээ",  sub: "Говийн экспедиц • 2 минутын өмнө",          color: T.primary         },
  { text: "Шинэ сэтгэгдэл ирлээ",            sub: '"Гайхалтай аялал боллоо..." • 1 цагийн өмнө', color: T.secondary       },
  { text: "Төлбөр баталгаажлаа",             sub: "Захиалга #8842 • 3 цагийн өмнө",              color: T.tertiary        },
  { text: "Аяллын хөтөлбөр шинэчлэгдлээ",   sub: "Хөвсгөл нуурын аялал • 5 цагийн өмнө",       color: T.primaryContainer },
];

const STAT_CARDS = [
  { label: "Нийт орлого",     val: "$412,850", sub: "+12.5% Өнгөрсөн сараас", subColor: "#15803d",         icon: "payments", bg: T.surfaceContainerLow      },
  { label: "Идэвхтэй аяллууд", val: "24",       sub: "8 Орон нутгийн чиглэлд", subColor: T.onSurfaceVariant, icon: "explore",  bg: T.surfaceContainer         },
  { label: "Шинэ аялагчид",   val: "1,204",    sub: "98% Сэтгэл ханамж",      subColor: T.primaryFixedDim,  icon: "group",    bg: T.surfaceContainerHighest  },
];

export default function PageAdmin({ setPage }) {
  const [hovBar, setHovBar] = useState(null);

  return (
    <main style={{ width: "100%", padding: "64px 32px" }}>
      {/* ── Header ── */}
      <div style={{ marginBottom: 80 }} className="fu">
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: T.primary, display: "block", marginBottom: 12 }}>Системийн удирдлага</span>
        <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: T.onSurface, letterSpacing: "-0.02em" }}>Удирдах хэсэг</h2>
        <p style={{ color: T.onSurfaceVariant, fontSize: 16, marginTop: 12, maxWidth: 600, lineHeight: 1.7 }}>
          Таны аялал жуулчлалын бизнесийн өдөр тутмын хяналт болон стратегийн удирдлагын нэгдсэн төв.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }} className="fu1">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="card-lift" style={{ background: s.bg, padding: 32, borderRadius: 12, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div>
              <span style={{ color: T.onSurfaceVariant, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{s.label}</span>
              <div style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 700, color: T.primary, marginTop: 16 }}>{s.val}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: s.subColor }}>
              <Icon name={s.subColor === "#15803d" ? "trending_up" : "location_on"} size={14} />
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.sub}</span>
            </div>
            <div style={{ position: "absolute", right: -8, bottom: -8, opacity: .05 }}>
              <Icon name={s.icon} size={120} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }} className="fu2">
        {/* ── Main column ── */}
        <div>
          {/* Bar chart */}
          <div style={{ background: T.surfaceContainerLowest, padding: 40, borderRadius: 12, border: `1px solid ${T.outlineVariant}15`, marginBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700 }}>Аялал захиалга</h3>
                <p style={{ color: T.onSurfaceVariant, fontSize: 13, marginTop: 4 }}>Сүүлийн 6 сарын захиалгын үзүүлэлт</p>
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                {[["Дотоод", T.primary], ["Гадаад", T.primaryContainer]].map(([l, c]) => (
                  <span key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: T.onSurfaceVariant }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />{l}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ height: 240, display: "flex", alignItems: "flex-end", gap: 12, padding: "0 8px" }}>
              {CHART_DATA.map((d, i) => (
                <div key={d.month} onClick={() => setHovBar(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <div style={{ width: "100%", height: `${d.h * 2.4}px`, background: hovBar === i || d.active ? T.primaryContainer : T.surfaceContainer, borderRadius: "2px 2px 0 0", transition: "background .2s" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: T.outline, marginTop: 8, whiteSpace: "nowrap" }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            <div className="card-lift" style={{ position: "relative", height: 280, borderRadius: 12, overflow: "hidden" }}>
              <img src={IMGS.adminGobi} alt="Gobi" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.7), transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: 28, color: "#fff" }}>
                <span style={{ fontSize: 11, color: T.primaryFixed, fontWeight: 700, textTransform: "uppercase" }}>Онцлох аялал</span>
                <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 700, marginTop: 8, marginBottom: 12 }}>Говийн их нүүдэл</h4>
                <a onClick={() => setPage("travel")} style={{ color: "#fff", fontSize: 11, textTransform: "uppercase", fontWeight: 700, textDecoration: "underline", textDecorationColor: T.primary, textUnderlineOffset: 6, cursor: "pointer" }}>Засварлах</a>
              </div>
            </div>

            <div style={{ background: T.surfaceContainerLow, padding: 32, borderRadius: 12, border: `1px solid ${T.outlineVariant}15`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Шуурхай үйлдэл</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Шинэ аялал нэмэх", "add"], ["Тайлан татах", "download"], ["Мэдэгдэл илгээх", "campaign"]].map(([label, icon]) => (
                  <QuickActionBtn key={label} label={label} icon={icon} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Activity feed ── */}
        <div style={{ position: "sticky", top: 100 }} className="fu3">
          <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 700, marginBottom: 32 }}>Сүүлийн үйл ажиллагаа</h3>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: `${T.outlineVariant}40` }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ position: "relative", paddingLeft: 40 }}>
                  <div style={{ position: "absolute", left: 0, top: 2, width: 24, height: 24, borderRadius: "50%", background: T.surfaceContainerHighest, border: `4px solid ${T.surface}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color }} />
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>{a.text}</p>
                  <p style={{ fontSize: 11, color: T.onSurfaceVariant, marginTop: 4 }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System status */}
          <div style={{ marginTop: 48, padding: 32, background: T.primary, borderRadius: 12, color: "#fff" }}>
            <Icon name="shield_with_heart" size={24} fill={1} style={{ color: "rgba(255,255,255,.8)", display: "block", marginBottom: 16 }} />
            <h5 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Системийн төлөв</h5>
            <p style={{ fontSize: 12, opacity: .8, lineHeight: 1.6, marginBottom: 20 }}>
              Бүх системүүд хэвийн ажиллаж байна. Сүүлийн хамгаалалтын шалгалт 12 минутын өмнө хийгдсэн.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="pulse" style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%" }} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>Аюулгүй</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
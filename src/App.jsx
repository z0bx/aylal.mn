import { useState, useEffect, useRef } from "react";

const T = {
  primary: "#855312",
  primaryContainer: "#c68b46",
  primaryFixed: "#ffddbb",
  primaryFixedDim: "#fbba70",
  onPrimary: "#ffffff",
  onPrimaryFixed: "#2b1700",
  onPrimaryContainer: "#472800",
  secondary: "#904c31",
  secondaryContainer: "#fea685",
  tertiary: "#685e38",
  tertiaryContainer: "#b8ab7f",
  onTertiary: "#ffffff",
  onTertiaryContainer: "#483f1d",
  surface: "#fff8f1",
  surfaceContainer: "#f8edd8",
  surfaceContainerLow: "#fef2dd",
  surfaceContainerHigh: "#f3e7d2",
  surfaceContainerHighest: "#ede1cd",
  surfaceContainerLowest: "#ffffff",
  onSurface: "#201b0e",
  onSurfaceVariant: "#514539",
  outline: "#837467",
  outlineVariant: "#d5c3b4",
  background: "#fff8f1",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;0,900;1,400&family=Work+Sans:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Work Sans',sans-serif;background:${T.surface};color:${T.onSurface};-webkit-font-smoothing:antialiased;line-height:1.6;overflow-x:hidden}
  h1,h2,h3,h4{font-family:'Noto Serif',serif}
  ::selection{background:${T.primaryFixed};color:${T.onPrimaryFixed}}
  .material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;user-select:none}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .fu{animation:fadeUp .5s ease both}
  .fu1{animation:fadeUp .5s .05s ease both}
  .fu2{animation:fadeUp .5s .15s ease both}
  .fu3{animation:fadeUp .5s .25s ease both}
  .fu4{animation:fadeUp .5s .35s ease both}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .pulse{animation:pulse 2s infinite}
  .card-lift{transition:transform .25s ease,box-shadow .25s ease;cursor:pointer}
  .card-lift:hover{transform:translateY(-4px);box-shadow:0 16px 32px rgba(32,27,14,.10)}
  input:focus{outline:none}
  button{cursor:pointer}
  a{text-decoration:none;color:inherit}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-thumb{background:${T.outlineVariant};border-radius:3px}
  .nh-nav-desktop{display:flex;gap:28px;align-items:center}
  .nh-mobile-toggle{display:none}
  @media(max-width:768px){
    .nh-nav-desktop{display:none!important}
    .nh-mobile-toggle{display:flex!important}
    .nh-header-actions .nh-ghost{display:none}
  }
`;

const Icon = ({ name, size = 20, fill = 0, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill},'wght' 400,'GRAD' 0,'opsz' ${size}`, lineHeight: 1, ...style }}
  >
    {name}
  </span>
);

function Badge({ children, variant = "primary" }) {
  const bg = variant === "primary" ? T.primaryFixed : T.surfaceContainer;
  const color = variant === "primary" ? T.onPrimaryFixed : T.onSurfaceVariant;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700, fontFamily: "'Work Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", background: bg, color }}>
      {children}
    </span>
  );
}

function BtnPrimary({ children, onClick, style = {}, small = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: small ? "6px 14px" : "10px 20px", borderRadius: 4, background: `linear-gradient(to bottom, ${T.primary}, ${T.primaryContainer})`, color: T.onPrimary, fontFamily: "'Work Sans',sans-serif", fontSize: small ? 11 : 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", border: "none", boxShadow: "0 2px 8px rgba(133,83,18,.2)", transform: hov ? "translateY(-1px)" : "none", transition: "transform .15s, box-shadow .15s", ...style }}
    >
      {children}
    </button>
  );
}

function BtnGhost({ children, onClick, style = {}, className = "" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 4, border: `1px solid ${T.outlineVariant}55`, color: T.onSurface, fontFamily: "'Work Sans',sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", background: hov ? T.surfaceContainer : "transparent", transition: "background .2s", ...style }}
    >
      {children}
    </button>
  );
}

// Reliable Unsplash images for Mongolia / travel topics
const IMGS = {
  hero:        "https://lh3.googleusercontent.com/aida-public/AB6AXuDl4MOQ4VIx0P4Zj5n0z4ax-JmcHESb_HwWaW09c_E-ZWHdHu2TCxwiMGBc1zfqtB3QkIoOasG_huPj4UzJGPVbCvYqSyouYWlo_1r-i8-5O7bc5zvSLXTulc50wonRVfQm97oKKFWbTbhDE2E7DR7ZC5sLXU6AZM_w1AyzFvwqkxdzKBfDaIaR89CZxJABL3Zd53Ic3_dTlxuwfpYm0_MT5WE9hwxaZuaelYb6J6tIfBZS2pZBnX_51Uznls17AtIBZFAT0Ph8Uwc",
  gobi:        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80",
  altai:       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  terelj:      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80",
  eagle:       "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=900&q=80",
  altaiPeaks:  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=700&q=80",
  horses:      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=700&q=80",
  ger:         "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?w=900&q=80",
  user:        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
  terelj2:     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
  khovsgol:    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=200&q=80",
  altaiSmall:  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80",
  gobiBig:     "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
  rider:       "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80",
  mapBg:       "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600&q=80",
  marker1:     "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&q=80",
  marker2:     "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&q=80",
  bookingTour: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
  profileHero: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1400&q=80",
  adminGobi:   "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80",
};

/* ─── Header ────────────────────────────────────────────────────── */
function Header({ page, setPage, loggedIn }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Нүүр", key: "home" },
    { label: "Чиглэлүүд", key: "map" },
    { label: "Аяллын хөтөлбөр", key: "travel" },
  ];

  const headerBg = scrolled ? T.surfaceContainerLow : "rgba(255,248,241,0.85)";
  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: headerBg, backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? T.outlineVariant + "30" : "transparent"}`, boxShadow: scrolled ? "0 1px 12px rgba(32,27,14,.08)" : "none", transition: "all .3s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "18px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
            <a onClick={() => setPage("home")} style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 900, color: T.primary, letterSpacing: "-0.02em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
              Nomadic Horizon
            </a>
            <nav className="nh-nav-desktop">
              {navLinks.map((l, i) => (
                <a key={i} onClick={() => setPage(l.key)} style={{ fontFamily: "'Noto Serif',serif", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: page === l.key ? T.primary : T.onSurfaceVariant, fontWeight: page === l.key ? 700 : 400, borderBottom: page === l.key ? `2px solid ${T.primary}` : "2px solid transparent", paddingBottom: 2, cursor: "pointer", transition: "color .25s", whiteSpace: "nowrap" }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="nh-header-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {loggedIn ? (
              <>
                <BtnPrimary onClick={() => setPage("booking")} small>Захиалах</BtnPrimary>
                <div onClick={() => setPage("profile")} style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${T.primary}`, overflow: "hidden", cursor: "pointer", flexShrink: 0 }}>
                  <img src={IMGS.user} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </>
            ) : (
              <>
                <BtnGhost className="nh-ghost" onClick={() => setPage("login")}>Нэвтрэх</BtnGhost>
                <BtnPrimary onClick={() => setPage("booking")} small>Захиалах</BtnPrimary>
              </>
            )}
           
          </div>
        </div>
       
      </header>
    </>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <footer style={{ background: T.surfaceContainer, padding: "64px 32px", marginTop: 96 }}>
      <div style={{ width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
          <div>
            <a onClick={() => setPage("home")} style={{ fontFamily: "'Noto Serif',serif", fontSize: 20, fontWeight: 900, color: T.primary, cursor: "pointer", display: "block", marginBottom: 16 }}>Nomadic Horizon</a>
            <p style={{ fontSize: 13, color: T.onSurfaceVariant, lineHeight: 1.7 }}>Монгол орны өвөрмөц соёл, байгалийн үзэсгэлэнг дэлхий дахинд сурталчлах эрхэм зорилготой аяллын агентлаг.</p>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              {["public", "share", "mail"].map(ic => (
                <span key={ic} style={{ color: T.primary, opacity: .6, cursor: "pointer" }}><Icon name={ic} size={20} /></span>
              ))}
            </div>
          </div>
          {[
            { title: "Цэс", links: ["Бидний тухай", "Холбоо барих", "Асуулт хариулт"] },
            { title: "Хууль эрх зүй", links: ["Нууцлалын бодлого", "Үйлчилгээний нөхцөл", "Төлбөрийн нөхцөл"] },
            { title: "Холбоо барих", links: ["Улаанбаатар хот", "+976 7000 0000", "info@nomadichorizon.mn"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: T.primary, marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => <li key={l}><a style={{ fontSize: 13, color: T.onSurfaceVariant, opacity: .8 }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${T.outline}25`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 11, color: T.onSurfaceVariant, opacity: .6 }}>© 2024 Nomadic Horizon. Бүх эрх хуулиар хамгаалагдсан.</p>
          <span style={{ color: T.primary, opacity: .6 }}><Icon name="language" size={16} /></span>
        </div>
      </div>
    </footer>
  );
}

/* ─── HOME ────────────────────────────────────────────────────────*/
function PageHome({ setPage }) {
  const [newsDone, setNewsDone] = useState(false);
  const [newsEmail, setNewsEmail] = useState("");

  const stats = [
    { val: "1.5M", label: "Нутаг дэвсгэр (км²)" },
    { val: "300+", label: "Нартай өдөр" },
    { val: "21", label: "Аймгийн соёл" },
    { val: "100%", label: "Онгон байгаль" },
  ];

  return (
    <main>
      {/* Hero */}
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

      {/* Destinations */}
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
            {/* Gobi large */}
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
            {/* Stats */}
            <div style={{ gridColumn: "span 8", background: T.surfaceContainerLow, borderRadius: 12, padding: "48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 24 }}>
                {stats.map(s => (
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

      {/* Newsletter */}
      <section style={{ padding: "96px 32px", background: T.surfaceContainerHigh }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }} className="fu">
          <Icon name="mail" size={48} style={{ color: T.primary, display: "block", marginBottom: 24 }} />
          <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 36, fontWeight: 700, marginBottom: 20 }}>Аяллын мэдээлэл хүлээн авах</h2>
          <p style={{ color: T.onSurfaceVariant, marginBottom: 40, fontSize: 16 }}>Шинэ аяллын хөтөлбөр болон онцгой хөнгөлөлтийн мэдээллийг цаг алдалгүй аваарай.</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto" }}>
            <input value={newsEmail} onChange={e => setNewsEmail(e.target.value)} placeholder="Таны имэйл хаяг" type="email" style={{ flex: 1, background: T.surfaceContainerLowest, border: "none", borderBottom: `2px solid ${T.outlineVariant}`, padding: "14px 20px", fontFamily: "'Work Sans',sans-serif", fontSize: 14, color: T.onSurface, outline: "none", borderRadius: "4px 4px 0 0" }} />
            <BtnPrimary onClick={() => { if (newsEmail) { setNewsDone(true); setNewsEmail(""); } }} style={{ padding: "14px 24px", borderRadius: 4 }}>
              {newsDone ? "✓" : "Бүртгүүлэх"}
            </BtnPrimary>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── MAP ────────────────────────────────────────────────────────*/
function PageMap({ setPage }) {
  const [stops, setStops] = useState([
    { id: 1, label: "Зогсоол 1", name: "Тэрэлж БЦГ" },
    { id: 2, label: "Зогсоол 2", name: "Хустай Нуруу" },
  ]);
  const [stopInput, setStopInput] = useState("");
  const [addMode, setAddMode] = useState(false);

  const addStop = () => {
    if (!stopInput.trim()) return;
    setStops(s => [...s, { id: Date.now(), label: `Зогсоол ${s.length + 1}`, name: stopInput }]);
    setStopInput(""); setAddMode(false);
  };

  return (
    <main style={{ display: "flex", height: "calc(100vh - 80px)", overflow: "hidden" }}>
      <aside style={{ width: 380, flexShrink: 0, background: T.surfaceContainerLow, overflowY: "auto", zIndex: 40, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="fu">
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: T.primary }}>Аялал төлөвлөлт</span>
            <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: 32, fontWeight: 900, marginTop: 8 }}>Маршрут төлөвлөгч</h1>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.1em" }}>Эхлэх цэг</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.outlineVariant}40`, padding: "10px 0", marginTop: 6 }}>
              <Icon name="location_on" size={18} style={{ color: T.primary }} />
              <input defaultValue="Улаанбаатар хот" style={{ background: "transparent", border: "none", fontFamily: "'Work Sans',sans-serif", fontSize: 14, color: T.onSurface, flex: 1, outline: "none" }} />
            </div>
          </div>
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
                <input autoFocus value={stopInput} onChange={e => setStopInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addStop()} placeholder="Газрын нэр оруулна уу" style={{ flex: 1, background: T.surfaceContainerLowest, border: `1px solid ${T.outlineVariant}50`, borderRadius: 8, padding: "10px 14px", fontFamily: "'Work Sans',sans-serif", fontSize: 13, outline: "none" }} />
                <button onClick={addStop} style={{ background: T.primary, color: "#fff", border: "none", borderRadius: 8, padding: "0 16px", fontSize: 13, fontWeight: 700 }}>+</button>
              </div>
            ) : (
              <button onClick={() => setAddMode(true)} style={{ padding: "14px", border: `1px dashed ${T.outlineVariant}50`, borderRadius: 12, background: "transparent", color: T.onSurfaceVariant, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon name="add" size={16} /> Зогсоол нэмэх
              </button>
            )}
          </div>
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
                  <span style={{ color: T.onSurfaceVariant }}>{k}</span><span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <BtnPrimary onClick={() => setPage("booking")} style={{ padding: "16px", justifyContent: "center", borderRadius: 8, fontSize: 13, gap: 10 }}>
            Аялал эхлүүлэх <Icon name="arrow_forward" size={16} />
          </BtnPrimary>
        </div>
      </aside>

      <section style={{ flex: 1, position: "relative", background: T.surfaceContainerHigh, overflow: "hidden" }}>
        <img src={IMGS.mapBg} alt="Map background" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .35 }} />
        {[
          { top: "25%", left: "33%", name: "Тэрэлж БЦГ", color: T.primary, img: IMGS.marker1 },
          { top: "50%", left: "25%", name: "Хустай Нуруу", color: T.secondary, img: IMGS.marker2 },
        ].map(m => <MapMarker key={m.name} {...m} />)}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs><linearGradient id="rg" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" stopColor={T.primary} /><stop offset="100%" stopColor={T.secondary} /></linearGradient></defs>
          <path d="M 640 220 Q 600 350 480 440" fill="none" stroke="url(#rg)" strokeDasharray="12 8" strokeWidth="4" />
        </svg>
        <div style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,.85)", backdropFilter: "blur(12px)", padding: "10px 24px", borderRadius: 999, boxShadow: "0 4px 16px rgba(32,27,14,.12)", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="distance" size={14} style={{ color: T.primary }} /><span style={{ fontSize: 13, fontWeight: 700 }}>185 км</span></div>
          <div style={{ width: 1, height: 16, background: T.outlineVariant }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="schedule" size={14} style={{ color: T.primary }} /><span style={{ fontSize: 13, fontWeight: 700 }}>3ц 45м</span></div>
        </div>
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

function MapMarker({ top, left, name, color, img }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "absolute", top, left }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "relative" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 36, color, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.3))", fontVariationSettings: "'FILL' 1", cursor: "pointer", display: "block" }}>location_pin</span>
        {hov && (
          <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 16, width: 192, background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,.2)", zIndex: 10 }}>
            <img src={img} alt={name} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
            <h4 style={{ fontSize: 13, fontWeight: 700 }}>{name}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── TRAVEL ─────────────────────────────────────────────────────*/
function PageTravel({ setPage }) {
  const days = [
    { num: "01", title: "Улаанбаатар хотод хүрэлцэн ирэх", text: "Хүрэлцэн ирсэн зочдыг угтан авч, аяллын ерөнхий зааварчилгаа болон багийн танилцуулга хийгдэнэ.", badges: ["Буудал", "Оройн хоол"], border: true },
    { num: "05", title: "Бүргэдийн сургуулилт", text: "Казах түмний олон зуун жилийн түүхтэй бүргэдээр ан хийх соёлтой гүнзгий танилцана.", badges: ["Мастер анги", "Фото аялал"], border: false, badgePrimary: 0 },
    { num: "10", title: "Морин аялал", text: "Алтайн өндөр уулс, цэнгэг нуурын хөвөөгөөр мориор аялан байгалийн үзэмжийг тольдоно.", badges: ["Хоног: 3", "Барууны морьд"], border: true },
  ];
  return (
    <main style={{ width: "100%", padding: "64px 32px 0" }}>
      <header style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, marginBottom: 96, alignItems: "flex-end" }} className="fu">
        <div>
          <span style={{ fontSize: 12, color: T.primary, fontFamily: "'Work Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 16, fontWeight: 600 }}>Экспедицийн танилцуулга</span>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(40px,5vw,72px)", fontWeight: 900, color: T.onSurface, lineHeight: 1.1, marginBottom: 24 }}>Алтайн бүргэдүүд</h1>
          <p style={{ fontSize: 20, fontWeight: 300, color: T.onSurfaceVariant, fontStyle: "italic", lineHeight: 1.7 }}>"Ариун жим" – Тэнгэрийн хаадтай зэрэгцэн орших Монгол Алтайн нурууны нууцлаг түүхээр аялах нь.</p>
        </div>
        <div style={{ background: T.surfaceContainerLow, padding: 32, borderRadius: 12 }} className="fu1">
          {[["schedule", "Аяллын хугацаа", "14 хоног"], ["terrain", "Хүндрэлийн зэрэг", "Дундаас дээш"], ["group", "Бүлгийн хэмжээ", "8–12 хүн"]].map(([ic, label, val]) => (
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

      <section style={{ maxWidth: 960, margin: "0 auto 96px" }}>
        <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, textAlign: "center", marginBottom: 80 }} className="fu">Аяллын ариун жим</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {days.map((d, i) => (
            <div key={d.num} className={`fu${i + 1}`} style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
              <div style={{ width: "30%", display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 64, fontWeight: 900, color: T.primary, opacity: .2 }}>{d.num}</span>
              </div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.tertiaryContainer, marginTop: 32, flexShrink: 0 }} />
              <div style={{ flex: 1, background: d.border ? T.surfaceContainerLowest : T.surfaceContainerLow, padding: 40, borderRadius: 12, borderLeft: d.border ? `4px solid ${T.primary}` : "none", boxShadow: d.border ? "0 2px 8px rgba(32,27,14,.06)" : "none" }} className="card-lift">
                <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{d.title}</h3>
                <p style={{ color: T.onSurfaceVariant, lineHeight: 1.7, marginBottom: 20 }}>{d.text}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {d.badges.map((b, bi) => <Badge key={b} variant={bi === 0 && d.badgePrimary === 0 ? "primary" : "surface"}>{b}</Badge>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

/* ─── BOOKING ────────────────────────────────────────────────────*/
function PageBooking({ setPage }) {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const paymentMethods = [
    { icon: "credit_card", label: "Дебит/Кредит карт", sub: "Visa, Mastercard, UnionPay" },
    { icon: "account_balance", label: "Банкны шилжүүлэг", sub: "Дотоодын банкууд" },
  ];

  return (
    <main style={{ width: "100%", padding: "48px 32px 96px" }}>
      <header style={{ marginBottom: 64 }} className="fu">
        <p style={{ fontFamily: "'Work Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.2em", color: T.primary, marginBottom: 12, fontSize: 12, fontWeight: 600 }}>ТАНЫ АЯЛАЛ ЭНДЭЭС ЭХЭЛНЭ</p>
        <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.02em" }}>Аяллаа баталгаажуулах</h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          <section className="fu1">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", background: T.tertiaryContainer, display: "flex", alignItems: "center", justifyContent: "center", color: T.onTertiaryContainer, fontWeight: 700, fontSize: 14 }}>1</span>
              <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700 }}>Аялагчийн мэдээлэл</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
              {[["Овог", "text", "1"], ["Нэр", "text", "1"], ["И-мэйл хаяг", "email", "2"], ["Утасны дугаар", "tel", "2"]].map(([label, type, span]) => (
                <div key={label} style={{ gridColumn: span === "2" ? "span 2" : "span 1" }}>
                  <FieldUnderline label={label} type={type} placeholder={label === "И-мэйл хаяг" ? "example@nomadichorizon.mn" : label === "Утасны дугаар" ? "+976" : "Мэдээллээ оруулна уу"} />
                </div>
              ))}
            </div>
          </section>

          <section className="fu2">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", background: T.tertiaryContainer, display: "flex", alignItems: "center", justifyContent: "center", color: T.onTertiaryContainer, fontWeight: 700, fontSize: 14 }}>2</span>
              <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700 }}>Төлбөрийн хэрэгсэл</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {paymentMethods.map((m, i) => (
                <div key={m.label} onClick={() => setSelectedPayment(i)} style={{ padding: "20px 24px", borderRadius: 8, border: selectedPayment === i ? `2px solid ${T.primary}` : `1px solid transparent`, background: selectedPayment === i ? T.surfaceContainerLowest : T.surfaceContainerLow, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Icon name={m.icon} size={20} style={{ color: selectedPayment === i ? T.primary : T.onSurfaceVariant }} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</p>
                      <p style={{ fontSize: 11, color: T.onSurfaceVariant, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.sub}</p>
                    </div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: selectedPayment === i ? `4px solid ${T.primary}` : `2px solid ${T.outlineVariant}`, background: T.surface, transition: "border .2s" }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <FieldUnderline label="Картны дугаар" placeholder="0000 0000 0000 0000" />
              </div>
              <FieldUnderline label="Дуусах хугацаа" placeholder="MM/YY" />
              <FieldUnderline label="CVC" placeholder="123" />
            </div>
          </section>
        </div>

        <aside style={{ position: "sticky", top: 120 }} className="fu3">
          <div style={{ background: T.surfaceContainer, padding: 32, borderRadius: 12, border: `1px solid ${T.outlineVariant}18`, boxShadow: "0 2px 8px rgba(32,27,14,.06)" }}>
            <div style={{ aspectRatio: "16/10", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
              <img src={IMGS.bookingTour} alt="Tour" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Говийн Наран: Дуун аялал</h3>
            <div style={{ display: "flex", gap: 20, color: T.onSurfaceVariant, fontSize: 13, marginBottom: 24, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="calendar_today" size={14} />2024.11.15</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="schedule" size={14} />8 өдөр</span>
            </div>
            <div style={{ borderTop: `1px solid ${T.outlineVariant}25`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Насанд хүрэгч (2)", "4,200,000₮"], ["Үйлчилгээний хураамж", "85,000₮"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", color: T.onSurfaceVariant, fontSize: 14 }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", color: T.onSurfaceVariant, fontSize: 14 }}>
                <span>Хөнгөлөлт</span><span style={{ color: T.secondary }}>-150,000₮</span>
              </div>
              <div style={{ paddingTop: 20, marginTop: 12, borderTop: `1px solid ${T.onSurface}15`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: T.onSurfaceVariant, marginBottom: 4 }}>Нийт дүн</p>
                  <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 28, fontWeight: 900, color: T.primary }}>4,135,000₮</p>
                </div>
                <Badge>БАТАЛГААЖСАН</Badge>
              </div>
            </div>
            <button
              onClick={() => setConfirmed(true)}
              disabled={confirmed}
              style={{ width: "100%", marginTop: 32, padding: "20px", background: confirmed ? T.surfaceContainerHigh : `linear-gradient(to bottom, ${T.primary}, ${T.primaryContainer})`, color: confirmed ? T.onSurfaceVariant : T.onPrimary, fontFamily: "'Work Sans',sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13, border: "none", borderRadius: 6, cursor: confirmed ? "default" : "pointer", transition: "all .2s", boxShadow: confirmed ? "none" : `0 4px 12px ${T.primary}33` }}
            >
              {confirmed ? "✓ Баталгаажлаа" : "Төлбөр баталгаажуулах"}
            </button>
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: T.onSurfaceVariant, lineHeight: 1.6 }}>
              Төлбөр баталгаажуулснаар <span style={{ textDecoration: "underline", cursor: "pointer" }}>Үйлчилгээний нөхцөл</span> болон <span style={{ textDecoration: "underline", cursor: "pointer" }}>Нууцлалын бодлогыг</span> хүлээн зөвшөөрнө.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function FieldUnderline({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "'Work Sans',sans-serif", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: T.onSurfaceVariant, marginBottom: 6 }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${T.outlineVariant}66`, padding: "12px 0", fontFamily: "'Work Sans',sans-serif", fontSize: 15, color: T.onSurface, outline: "none" }} />
    </div>
  );
}

/* ─── LOGIN ──────────────────────────────────────────────────────*/
function PageLogin({ setPage, setLoggedIn }) {
  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const handleLogin = () => { setLoggedIn(true); setPage("profile"); };

  return (
    <main style={{ minHeight: "calc(100vh - 80px)", display: "flex", overflow: "hidden" }}>
      <div style={{ flex: 3, background: T.surfaceContainer, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 80px" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .2, backgroundImage: `radial-gradient(${T.primary} 0.5px, transparent 0.5px)`, backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560 }} className="fu">
          <a onClick={() => setPage("home")} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: T.primary, display: "block", marginBottom: 40, cursor: "pointer" }}>← Nomadic Horizon</a>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, color: T.onSurface, lineHeight: .95, letterSpacing: "-0.02em", marginBottom: 40 }}>
            Тавтай<br />морилно уу
          </h1>
          <div style={{ position: "relative" }}>
            <img src={IMGS.rider} alt="Rider" style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 12, filter: "grayscale(100%)", clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)", boxShadow: "0 20px 40px -10px rgba(32,27,14,.1)", transition: "filter .7s" }} onMouseEnter={e => e.target.style.filter = "none"} onMouseLeave={e => e.target.style.filter = "grayscale(100%)"} />
            <div style={{ position: "absolute", bottom: -24, right: -24, background: T.surface, padding: 24, borderRadius: 4, borderLeft: `4px solid ${T.primary}`, maxWidth: 280, boxShadow: "0 20px 40px -10px rgba(32,27,14,.1)" }}>
              <p style={{ fontFamily: "'Noto Serif',serif", fontStyle: "italic", color: T.onSurfaceVariant, fontSize: 15, lineHeight: 1.6 }}>"Ертөнцийн хязгаар руу хийх таны дараагийн аялал эндээс эхэлнэ."</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 2, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 64px", position: "relative" }}>
        <div style={{ width: "100%", maxWidth: 380 }} className="fu2">
          <div style={{ display: "flex", gap: 32, alignItems: "flex-end", marginBottom: 40 }}>
            {[["login", "Нэвтрэх", 28], ["register", "Бүртгүүлэх", 20]].map(([key, label, size]) => (
              <button key={key} onClick={() => setTab(key)} style={{ fontFamily: "'Noto Serif',serif", fontSize: size, fontWeight: 700, background: "none", border: "none", borderBottom: tab === key ? `2px solid ${T.primary}` : "2px solid transparent", paddingBottom: 8, color: tab === key ? T.onSurface : T.onSurfaceVariant, cursor: "pointer", transition: "all .2s" }}>
                {label}
              </button>
            ))}
          </div>
          {tab === "login" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <FieldUnderline label="Имэйл хаяг" type="email" placeholder="example@nomad.mn" />
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: T.onSurfaceVariant }}>Нууц үг</label>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurfaceVariant, cursor: "pointer" }}>Мартсан уу?</span>
                </div>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} placeholder="••••••••" style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${T.outlineVariant}66`, padding: "12px 36px 12px 0", fontFamily: "'Work Sans',sans-serif", fontSize: 15, color: T.onSurface, outline: "none" }} />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: T.onSurfaceVariant }}>
                    <Icon name={showPw ? "visibility_off" : "visibility"} size={18} />
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" id="remember" style={{ accentColor: T.primary }} />
                <label htmlFor="remember" style={{ fontSize: 13, color: T.onSurfaceVariant }}>Намайг сануул</label>
              </div>
              <BtnPrimary onClick={handleLogin} style={{ padding: "20px 32px", borderRadius: 6, justifyContent: "space-between", fontSize: 13 }}>
                <span>Аяллаа үргэлжлүүлэх</span><Icon name="arrow_forward" size={16} />
              </BtnPrimary>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <FieldUnderline label="Нэр" placeholder="Таны нэр" />
              <FieldUnderline label="Имэйл хаяг" type="email" placeholder="example@nomad.mn" />
              <FieldUnderline label="Нууц үг" type="password" placeholder="••••••••" />
              <BtnPrimary onClick={handleLogin} style={{ padding: "20px 32px", borderRadius: 6, justifyContent: "space-between", fontSize: 13 }}>
                <span>Бүртгүүлэх</span><Icon name="arrow_forward" size={16} />
              </BtnPrimary>
            </div>
          )}
          <div style={{ marginTop: 48, position: "relative", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `${T.outlineVariant}30` }} />
            <span style={{ position: "relative", background: T.surface, padding: "0 16px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: T.onSurfaceVariant }}>Эсвэл нэвтрэх</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
            {[{ label: "Google" }, { label: "Apple", icon: "smartphone" }].map(({ label, icon }) => (
              <button key={label} style={{ padding: "16px", background: T.surfaceContainerLow, border: "none", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurface, cursor: "pointer" }}>
                {icon ? <Icon name={icon} size={18} /> : (
                  <svg width={18} height={18} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                )}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── PROFILE ────────────────────────────────────────────────────*/
function PageProfile({ setPage }) {
  const journalEntries = [
    { title: "Алтай Таван Богд", date: "2024.05.12", km: "420 км", quote: "Мөсөн голын өглөөний туяа үнэхээр ер бусын...", img: IMGS.altaiSmall },
    { title: "Хөвсгөл нуур", date: "2024.03.20", km: "850 км", quote: "Мөсний баярын үеэр авсан зургууд минь...", img: IMGS.khovsgol },
    { title: "Тэрэлж байгалийн цогцолбор", date: "2024.01.05", km: "60 км", quote: "Хадан тогтоц ба өвлийн нам гүм байдал...", img: IMGS.terelj2 },
  ];
  const stats = [
    { label: "Очсон газрууд", val: "24", accent: T.primary },
    { label: "Аяллын тэмдэглэл", val: "156", accent: T.secondary },
    { label: "Нийт ажиглалт", val: "89", accent: T.tertiary },
    { label: "Үнэлгээ", val: "4.9", accent: T.primaryContainer },
  ];
  return (
    <main style={{ width: "100%", padding: "48px 32px 0" }}>
      <section style={{ marginBottom: 80, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }} className="fu">
        <div>
          <Badge>Pathfinder Rank</Badge>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: T.primary, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>Аялагч мастер</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: T.onSurfaceVariant, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Noto Serif',serif", fontSize: 22 }}>Kaelen Vance</span>
            <span style={{ opacity: .3 }}>|</span>
            <span style={{ fontSize: 16 }}>Туулсан зам: 42,000 км</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <BtnPrimary onClick={() => setPage("booking")}>Шинэ аялал захиалах</BtnPrimary>
          <BtnGhost onClick={() => setPage("map")}>Маршрут харах</BtnGhost>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
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
                <p style={{ color: "rgba(255,255,255,.8)", maxWidth: 480, lineHeight: 1.6, marginBottom: 24 }}>Өмнөговь аймгийн Хонгорын элс рүү хийх энэхүү аялал нь байгалийн хамгийн үзэсгэлэнт тогтоц болон нүүдэлчин ахуйтай танилцах боломж олгоно.</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: T.onSurface, padding: "12px 24px", borderRadius: 6, fontWeight: 700 }}>
                  <Icon name="map" size={18} />Аяллын дэлгэрэнгүй
                </span>
              </div>
            </div>
          </section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16 }} className="fu2">
            {stats.map(s => (
              <div key={s.label} style={{ background: T.surfaceContainer, padding: 24, borderRadius: 12, borderLeft: `4px solid ${s.accent}` }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurfaceVariant, marginBottom: 6 }}>{s.label}</p>
                <p style={{ fontFamily: "'Noto Serif',serif", fontSize: 30, fontWeight: 900 }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 24 }} className="fu3">
          <div style={{ background: T.surfaceContainerLow, padding: 32, borderRadius: 12 }}>
            <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700, marginBottom: 32 }}>Тэмдэглэлүүд</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {journalEntries.map(e => (
                <div key={e.title} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    <img src={e.img} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", transition: "filter .3s" }} onMouseEnter={e2 => e2.target.style.filter = "none"} onMouseLeave={e2 => e2.target.style.filter = "grayscale(100%)"} />
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
          <div style={{ background: T.primaryContainer, padding: 32, borderRadius: 12, color: T.onPrimaryContainer, position: "relative", overflow: "hidden" }} className="fu4">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h4 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Дараагийн даваа</h4>
              <p style={{ fontSize: 13, opacity: .9, marginBottom: 24, lineHeight: 1.6 }}>"Аялагч мастер" зэргээс "Ертөнцийн хайгуулч" болоход 8,000 км дутуу байна.</p>
              <div style={{ height: 6, background: "rgba(0,0,0,.15)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "80%", height: "100%", background: T.primary, borderRadius: 3, transition: "width 1s ease" }} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* ─── ADMIN ──────────────────────────────────────────────────────*/
function PageAdmin({ setPage }) {
  const chartData = [
    { month: "1-р сар", h: 40, active: false },
    { month: "2-р сар", h: 65, active: false },
    { month: "3-р сар", h: 85, active: true },
    { month: "4-р сар", h: 55, active: false },
    { month: "5-р сар", h: 75, active: false },
    { month: "6-р сар", h: 95, active: true },
  ];
  const activity = [
    { text: "Б. Бат-Эрдэнэ захиалга хийлээ", sub: "Говийн экспедиц • 2 минутын өмнө", color: T.primary },
    { text: "Шинэ сэтгэгдэл ирлээ", sub: '"Гайхалтай аялал боллоо..." • 1 цагийн өмнө', color: T.secondary },
    { text: "Төлбөр баталгаажлаа", sub: "Захиалга #8842 • 3 цагийн өмнө", color: T.tertiary },
    { text: "Аяллын хөтөлбөр шинэчлэгдлээ", sub: "Хөвсгөл нуурын аялал • 5 цагийн өмнө", color: T.primaryContainer },
  ];
  const [hovBar, setHovBar] = useState(null);

  return (
    <main style={{ width: "100%", padding: "64px 32px" }}>
      <div style={{ marginBottom: 80 }} className="fu">
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: T.primary, display: "block", marginBottom: 12 }}>Системийн удирдлага</span>
        <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: T.onSurface, letterSpacing: "-0.02em" }}>Удирдах хэсэг</h2>
        <p style={{ color: T.onSurfaceVariant, fontSize: 16, marginTop: 12, maxWidth: 600, lineHeight: 1.7 }}>Таны аялал жуулчлалын бизнесийн өдөр тутмын хяналт болон стратегийн удирдлагын нэгдсэн төв.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 48 }} className="fu1">
        {[
          { label: "Нийт орлого", val: "$412,850", sub: "+12.5% Өнгөрсөн сараас", subColor: "#15803d", icon: "payments", bg: T.surfaceContainerLow },
          { label: "Идэвхтэй аяллууд", val: "24", sub: "8 Орон нутгийн чиглэлд", subColor: T.onSurfaceVariant, icon: "explore", bg: T.surfaceContainer },
          { label: "Шинэ аялагчид", val: "1,204", sub: "98% Сэтгэл ханамж", subColor: T.primaryFixedDim, icon: "group", bg: T.surfaceContainerHighest },
        ].map(s => (
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
        <div>
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
              {chartData.map((d, i) => (
                <div key={d.month} onClick={() => setHovBar(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                  <div style={{ width: "100%", height: `${d.h * 2.4}px`, background: hovBar === i || d.active ? T.primaryContainer : T.surfaceContainer, borderRadius: "2px 2px 0 0", transition: "background .2s" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: T.outline, marginTop: 8, whiteSpace: "nowrap" }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>
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

        <div style={{ position: "sticky", top: 100 }} className="fu3">
          <h3 style={{ fontFamily: "'Noto Serif',serif", fontSize: 18, fontWeight: 700, marginBottom: 32 }}>Сүүлийн үйл ажиллагаа</h3>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: `${T.outlineVariant}40` }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {activity.map((a, i) => (
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
          <div style={{ marginTop: 48, padding: 32, background: T.primary, borderRadius: 12, color: "#fff" }}>
            <Icon name="shield_with_heart" size={24} fill={1} style={{ color: "rgba(255,255,255,.8)", display: "block", marginBottom: 16 }} />
            <h5 style={{ fontFamily: "'Noto Serif',serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Системийн төлөв</h5>
            <p style={{ fontSize: 12, opacity: .8, lineHeight: 1.6, marginBottom: 20 }}>Бүх системүүд хэвийн ажиллаж байна. Сүүлийн хамгаалалтын шалгалт 12 минутын өмнө хийгдсэн.</p>
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

function QuickActionBtn({ label, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: hov ? T.primary : "#fff", color: hov ? "#fff" : T.onSurface, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "all .3s", cursor: "pointer" }}>
      {label}
      <Icon name={icon} size={16} />
    </button>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────*/
export default function App() {
  const [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const id = "nh-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    window.scrollTo(0, 0);
  }, [page]);

  const navigateTo = (key) => setPage(key);
  const showFooter = !["map", "login"].includes(page);

  return (
    <div style={{ minHeight: "100vh", background: T.surface, minWidth: "100%" }} className="w-full">
      <Header page={page} setPage={navigateTo} loggedIn={loggedIn} />
      <div key={page}>
        {page === "home"    && <PageHome    setPage={navigateTo} />}
        {page === "map"     && <PageMap     setPage={navigateTo} />}
        {page === "travel"  && <PageTravel  setPage={navigateTo} />}
        {page === "booking" && <PageBooking setPage={navigateTo} />}
        {page === "login"   && <PageLogin   setPage={navigateTo} setLoggedIn={setLoggedIn} />}
        {page === "profile" && <PageProfile setPage={navigateTo} />}
        {page === "admin"   && <PageAdmin   setPage={navigateTo} />}
      </div>
      {showFooter && <Footer setPage={navigateTo} />}

      <div onClick={() => setPage("admin")} title="Удирдах хэсэг" style={{ position: "fixed", bottom: 24, right: 24, width: 44, height: 44, borderRadius: "50%", background: T.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 4px 12px ${T.primary}44`, zIndex: 99 }}>
        <Icon name="admin_panel_settings" size={20} />
      </div>
    </div>
  );
}
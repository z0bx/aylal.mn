import { useState, useEffect } from "react";
import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "./Icon";
import { BtnPrimary, BtnGhost } from "./Buttons";

const NAV_LINKS = [
  { label: "Нүүр",           key: "home"   },
  { label: "Чиглэлүүд",     key: "map"    },
  { label: "Аяллын хөтөлбөр", key: "travel" },
  { label: "Экспедиц",      key: "travel" },
  { label: "Өв соёл",       key: "travel" },
];

export default function Header({ page, setPage, loggedIn }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = scrolled ? T.surfaceContainerLow : "rgba(255,248,241,0.85)";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: headerBg,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? T.outlineVariant + "30" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 12px rgba(32,27,14,.08)" : "none",
        transition: "all .3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "18px 32px" }}>
        {/* Logo + desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <a
            onClick={() => setPage("home")}
            style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 900, color: T.primary, letterSpacing: "-0.02em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}
          >
            Nomadic Horizon
          </a>
          <nav className="nh-nav-desktop">
            {NAV_LINKS.map((l, i) => (
              <a
                key={i}
                onClick={() => setPage(l.key)}
                style={{
                  fontFamily: "'Noto Serif',serif",
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: page === l.key ? T.primary : T.onSurfaceVariant,
                  fontWeight: page === l.key ? 700 : 400,
                  borderBottom: page === l.key ? `2px solid ${T.primary}` : "2px solid transparent",
                  paddingBottom: 2,
                  cursor: "pointer",
                  transition: "color .25s",
                  whiteSpace: "nowrap",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="nh-header-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {loggedIn ? (
            <>
              <BtnPrimary onClick={() => setPage("booking")} small>Захиалах</BtnPrimary>
              <div
                onClick={() => setPage("profile")}
                style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${T.primary}`, overflow: "hidden", cursor: "pointer", flexShrink: 0 }}
              >
                <img src={IMGS.user} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </>
          ) : (
            <>
              <BtnGhost className="nh-ghost" onClick={() => setPage("login")}>Нэвтрэх</BtnGhost>
              <BtnPrimary onClick={() => setPage("booking")} small>Захиалах</BtnPrimary>
            </>
          )}
          <button
            className="nh-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", color: T.primary, display: "flex", alignItems: "center" }}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            background: T.surfaceContainerLow,
            borderTop: `1px solid ${T.outlineVariant}30`,
            padding: "12px 32px 20px",
            gap: 12,
          }}
        >
          {[...NAV_LINKS, { label: "Нэвтрэх", key: "login" }, { label: "Захиалах", key: "booking" }].map((l, i) => (
            <a
              key={i}
              onClick={() => { setPage(l.key); setMobileOpen(false); }}
              style={{ fontFamily: "'Noto Serif',serif", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.05em", color: T.onSurfaceVariant, padding: "8px 0", borderBottom: `1px solid ${T.outlineVariant}20`, cursor: "pointer" }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
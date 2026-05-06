import { useState } from "react";
import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import { BtnPrimary } from "../components/Buttons";
import FieldUnderline from "../components/FieldUnderline";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";

export default function PageLogin({ setPage }) {
  const [tab,    setTab]    = useState("login");
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const { navigateTo } = useNavigation();

  const handleLogin = () => { 
    login({ name: "User", email: "user@example.com" }); 
    navigateTo("profile");
  };

  return (
    <main style={{ minHeight: "calc(100vh - 80px)", display: "flex", overflow: "hidden" }}>
      {/* ── Left panel ── */}
      <div style={{ flex: 3, background: T.surfaceContainer, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 80px" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .2, backgroundImage: `radial-gradient(${T.primary} 0.5px, transparent 0.5px)`, backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 560 }} className="fu">
          <a onClick={() => navigateTo("home")} style={{ fontFamily: "'Work Sans',sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: T.primary, display: "block", marginBottom: 40, cursor: "pointer" }}>
            ← Nomadic Horizon
          </a>
          <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, color: T.onSurface, lineHeight: .95, letterSpacing: "-0.02em", marginBottom: 40 }}>
            Тавтай<br />морилно уу
          </h1>
          <div style={{ position: "relative" }}>
            <img
              src={IMGS.rider}
              alt="Rider"
              style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 12, filter: "grayscale(100%)", clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0 95%)", boxShadow: "0 20px 40px -10px rgba(32,27,14,.1)", transition: "filter .7s" }}
              onMouseEnter={e => e.target.style.filter = "none"}
              onMouseLeave={e => e.target.style.filter = "grayscale(100%)"}
            />
            <div style={{ position: "absolute", bottom: -24, right: -24, background: T.surface, padding: 24, borderRadius: 4, borderLeft: `4px solid ${T.primary}`, maxWidth: 280, boxShadow: "0 20px 40px -10px rgba(32,27,14,.1)" }}>
              <p style={{ fontFamily: "'Noto Serif',serif", fontStyle: "italic", color: T.onSurfaceVariant, fontSize: 15, lineHeight: 1.6 }}>
                "Ертөнцийн хязгаар руу хийх таны дараагийн аялал эндээс эхэлнэ."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex: 2, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 64px" }}>
        <div style={{ width: "100%", maxWidth: 380 }} className="fu2">
          {/* Tabs */}
          <div style={{ display: "flex", gap: 32, alignItems: "flex-end", marginBottom: 40 }}>
            {[["login", "Нэвтрэх", 28], ["register", "Бүртгүүлэх", 20]].map(([key, label, size]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{ fontFamily: "'Noto Serif',serif", fontSize: size, fontWeight: 700, background: "none", border: "none", borderBottom: tab === key ? `2px solid ${T.primary}` : "2px solid transparent", paddingBottom: 8, color: tab === key ? T.onSurface : T.onSurfaceVariant, cursor: "pointer", transition: "all .2s" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Login form */}
          {tab === "login" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <FieldUnderline label="Имэйл хаяг" type="email" placeholder="example@nomad.mn" />
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: T.onSurfaceVariant }}>Нууц үг</label>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurfaceVariant, cursor: "pointer" }}>Мартсан уу?</span>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${T.outlineVariant}66`, padding: "12px 36px 12px 0", fontFamily: "'Work Sans',sans-serif", fontSize: 15, color: T.onSurface, outline: "none" }}
                  />
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
            /* Register form */
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <FieldUnderline label="Нэр"        placeholder="Таны нэр" />
              <FieldUnderline label="Имэйл хаяг" type="email"    placeholder="example@nomad.mn" />
              <FieldUnderline label="Нууц үг"    type="password" placeholder="••••••••" />
              <BtnPrimary onClick={handleLogin} style={{ padding: "20px 32px", borderRadius: 6, justifyContent: "space-between", fontSize: 13 }}>
                <span>Бүртгүүлэх</span><Icon name="arrow_forward" size={16} />
              </BtnPrimary>
            </div>
          )}

          {/* Divider */}
          <div style={{ marginTop: 48, position: "relative", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: `${T.outlineVariant}30` }} />
            <span style={{ position: "relative", background: T.surface, padding: "0 16px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: T.onSurfaceVariant }}>Эсвэл нэвтрэх</span>
          </div>

          {/* Social login */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
            {[{ label: "Google" }, { label: "Apple", icon: "smartphone" }].map(({ label, icon }) => (
              <button
                key={label}
                style={{ padding: "16px", background: T.surfaceContainerLow, border: "none", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.onSurface, cursor: "pointer" }}
              >
                {icon ? <Icon name={icon} size={18} /> : <GoogleLogo />}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function GoogleLogo() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
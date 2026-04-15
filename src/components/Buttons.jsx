import { useState } from "react";
import { T } from "../constants/theme";

export function BtnPrimary({ children, onClick, style = {}, small = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "6px 14px" : "10px 20px",
        borderRadius: 4,
        background: `linear-gradient(to bottom, ${T.primary}, ${T.primaryContainer})`,
        color: T.onPrimary,
        fontFamily: "'Work Sans',sans-serif",
        fontSize: small ? 11 : 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        border: "none",
        boxShadow: "0 2px 8px rgba(133,83,18,.2)",
        transform: hov ? "translateY(-1px)" : "none",
        transition: "transform .15s, box-shadow .15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function BtnGhost({ children, onClick, style = {}, className = "" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 16px",
        borderRadius: 4,
        border: `1px solid ${T.outlineVariant}55`,
        color: T.onSurface,
        fontFamily: "'Work Sans',sans-serif",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        background: hov ? T.surfaceContainer : "transparent",
        transition: "background .2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
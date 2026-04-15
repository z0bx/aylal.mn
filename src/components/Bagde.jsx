import { T } from "../constants/theme";

export default function Badge({ children, variant = "primary" }) {
  const bg    = variant === "primary" ? T.primaryFixed    : T.surfaceContainer;
  const color = variant === "primary" ? T.onPrimaryFixed  : T.onSurfaceVariant;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 12,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "'Work Sans',sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}
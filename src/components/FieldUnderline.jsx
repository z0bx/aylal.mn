import { T } from "../constants/theme";

export default function FieldUnderline({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'Work Sans',sans-serif",
          fontSize: 10,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: T.onSurfaceVariant,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${T.outlineVariant}66`,
          padding: "12px 0",
          fontFamily: "'Work Sans',sans-serif",
          fontSize: 15,
          color: T.onSurface,
          outline: "none",
        }}
      />
    </div>
  );
}
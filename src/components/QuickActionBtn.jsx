import { useState } from "react";
import { T } from "../constants/theme";
import Icon from "./Icon";

export default function QuickActionBtn({ label, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: hov ? T.primary : "#fff",
        color: hov ? "#fff" : T.onSurface,
        border: "none",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        transition: "all .3s",
        cursor: "pointer",
      }}
    >
      {label}
      <Icon name={icon} size={16} />
    </button>
  );
}
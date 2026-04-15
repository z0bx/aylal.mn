import { useState } from "react";
import { T } from "../constants/theme";
import { IMGS } from "../constants/images";
import Icon from "../components/Icon";
import Badge from "../components/Bagde";
import { BtnPrimary } from "../components/Buttons";
import FieldUnderline from "../components/FieldUnderline";

const PAYMENT_METHODS = [
  { icon: "credit_card",    label: "Дебит/Кредит карт",  sub: "Visa, Mastercard, UnionPay" },
  { icon: "account_balance", label: "Банкны шилжүүлэг", sub: "Дотоодын банкууд" },
];

const TRAVELLER_FIELDS = [
  { label: "Овог",          type: "text",  span: "1", placeholder: "Мэдээллээ оруулна уу" },
  { label: "Нэр",           type: "text",  span: "1", placeholder: "Мэдээллээ оруулна уу" },
  { label: "И-мэйл хаяг",  type: "email", span: "2", placeholder: "example@nomadichorizon.mn" },
  { label: "Утасны дугаар", type: "tel",   span: "2", placeholder: "+976" },
];

export default function PageBooking() {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [confirmed,       setConfirmed]       = useState(false);

  return (
    <main style={{ width: "100%", padding: "48px 32px 96px" }}>
      <header style={{ marginBottom: 64 }} className="fu">
        <p style={{ fontFamily: "'Work Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.2em", color: T.primary, marginBottom: 12, fontSize: 12, fontWeight: 600 }}>
          ТАНЫ АЯЛАЛ ЭНДЭЭС ЭХЭЛНЭ
        </p>
        <h1 style={{ fontFamily: "'Noto Serif',serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.02em" }}>
          Аяллаа баталгаажуулах
        </h1>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "flex-start" }}>
        {/* ── Form ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {/* Step 1 – Traveller info */}
          <section className="fu1">
            <StepHeader num="1" title="Аялагчийн мэдээлэл" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
              {TRAVELLER_FIELDS.map(f => (
                <div key={f.label} style={{ gridColumn: f.span === "2" ? "span 2" : "span 1" }}>
                  <FieldUnderline label={f.label} type={f.type} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          </section>

          {/* Step 2 – Payment */}
          <section className="fu2">
            <StepHeader num="2" title="Төлбөрийн хэрэгсэл" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PAYMENT_METHODS.map((m, i) => (
                <div
                  key={m.label}
                  onClick={() => setSelectedPayment(i)}
                  style={{ padding: "20px 24px", borderRadius: 8, border: selectedPayment === i ? `2px solid ${T.primary}` : `1px solid transparent`, background: selectedPayment === i ? T.surfaceContainerLowest : T.surfaceContainerLow, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all .2s" }}
                >
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

        {/* ── Order summary ── */}
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
                <span>Хөнгөлөлт</span>
                <span style={{ color: T.secondary }}>-150,000₮</span>
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
              Төлбөр баталгаажуулснаар{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Үйлчилгээний нөхцөл</span>
              {" "}болон{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Нууцлалын бодлогыг</span>
              {" "}хүлээн зөвшөөрнө.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function StepHeader({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
      <span style={{ width: 32, height: 32, borderRadius: "50%", background: T.tertiaryContainer, display: "flex", alignItems: "center", justifyContent: "center", color: T.onTertiaryContainer, fontWeight: 700, fontSize: 14 }}>
        {num}
      </span>
      <h2 style={{ fontFamily: "'Noto Serif',serif", fontSize: 22, fontWeight: 700 }}>{title}</h2>
    </div>
  );
}
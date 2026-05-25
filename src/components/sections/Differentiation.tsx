"use client";
import { motion } from "framer-motion";

const cols = [
  { title: "COSTING TOOLS", desc: "Estimate price only.", highlight: false },
  { title: "ERP SYSTEMS", desc: "Manage transactions.", highlight: false },
  { title: "PLM SYSTEMS", desc: "Manage product data.", highlight: false },
  { title: "EMITHRAN", desc: "Connects everything.", highlight: true },
];

export default function Differentiation() {
  return (
    <section
      style={{
        borderTop: "1px solid #1f1f1f",
        padding: "7rem 0",
        background: "#0a0a0a",
      }}
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#666",
              marginBottom: "1.5rem",
            }}
          >
            THE EMITHRAN ADVANTAGE
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 7vw, 100px)",
              color: "#ffffff",
              lineHeight: 1,
              marginBottom: "5rem",
            }}
          >
            Not Just Costing. Not Just ERP. End-to-End Manufacturing
            Intelligence.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              border: "1px solid #1f1f1f",
            }}
          >
            {cols.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem 2rem",
                  borderRight: i < 3 ? "1px solid #1f1f1f" : "none",
                  background: c.highlight ? "#111111" : "transparent",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: c.highlight ? "#ffffff" : "#555",
                    marginBottom: "0.75rem",
                    fontWeight: c.highlight ? 600 : 400,
                  }}
                >
                  {c.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    color: c.highlight ? "#ffffff" : "#444",
                    lineHeight: 1.6,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 56px)",
              color: "#ffffff",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: "5rem",
              lineHeight: 1.2,
            }}
          >
            "One platform for the complete manufacturing lifecycle."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

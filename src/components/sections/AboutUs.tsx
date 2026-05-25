"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section
      style={{
        borderTop: "1px solid #1f1f1f",
        padding: "7rem 0",
        background: "#080808",
      }}
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem" }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#666",
            marginBottom: "3rem",
          }}
        >
          ABOUT US
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4vw, 52px)",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "2rem",
              }}
            >
              Built in India. Built for India's Manufacturing Future.
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "#aaaaaa",
                  lineHeight: 1.8,
                }}
              >
                India spends over ₹6 lakh crore every year on defence — and yet
                the software running its manufacturing operations was built
                abroad, for foreign threats, foreign supply chains, and
                foreign-scale budgets. We built Emithran to change that.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "#aaaaaa",
                  lineHeight: 1.8,
                }}
              >
                We are a Bangalore-based manufacturing intelligence startup
                built for the complexity of Indian space, defence, aerospace,
                and precision manufacturing — with Indian data sovereignty and
                fair pricing for Indian OEMs.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "#aaaaaa",
                  lineHeight: 1.8,
                }}
              >
                We are backed by a deep belief in India's Atmanirbhar Bharat
                mission — and an equally deep impatience with how slowly India's
                manufacturing industry has digitised. Emithran is our answer.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ border: "1px solid #1f1f1f", padding: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(44px, 5vw, 64px)",
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                ₹6L Cr+
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "#aaaaaa",
                  marginTop: "0.75rem",
                  lineHeight: 1.7,
                }}
              >
                India's annual defence budget — running largely on spreadsheets.
              </p>
            </div>
            <div style={{ border: "1px solid #1f1f1f", padding: "2.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(44px, 5vw, 64px)",
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                01
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "#aaaaaa",
                  marginTop: "0.75rem",
                  lineHeight: 1.7,
                }}
              >
                The number of Indian-built end-to-end manufacturing intelligence
                platforms. That's Emithran.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

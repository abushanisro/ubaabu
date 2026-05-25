"use client";
import { motion } from "framer-motion";

const roles = [
  {
    title: "DESIGN ENGINEERS",
    pain: "Cost blindness at design stage.",
    value:
      "Instantly review design changes, manufacturability, and cost implications.",
  },
  {
    title: "COST & VALUE ENGINEERS",
    pain: "Manual costing loops that take days.",
    value:
      "Create should-cost models faster. Find actionable cost reduction opportunities.",
  },
  {
    title: "CATEGORY MANAGERS",
    pain: "Supplier quotes with no baseline.",
    value:
      "Compare quotes against internal cost models. Nominate vendors with confidence.",
  },
  {
    title: "MANUFACTURING ENGINEERS",
    pain: "Process assumptions locked in spreadsheets.",
    value: "Build process plans and validate manufacturing routes.",
  },
  {
    title: "ESTIMATORS",
    pain: "RFQs requiring days of manual calculation.",
    value: "Respond to RFQs faster with structured costing and supplier data.",
  },
  {
    title: "QUALITY TEAMS",
    pain: "Inspection data disconnected from production.",
    value:
      "Connect testing and compliance workflows to the same manufacturing record.",
  },
  {
    title: "LEADERSHIP TEAMS",
    pain: "Programme risk visible only through old ERP reports.",
    value: "Track cost, supplier performance, and delivery risk — live.",
  },
];

export default function RoleBased() {
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem" }}
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
            WHO USES EMITHRAN
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 88px)",
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            Built for Every Team in the Lifecycle.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "1px solid #1f1f1f",
          }}
        >
          {roles.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                borderBottom: "1px solid #1f1f1f",
                borderRight: "1px solid #1f1f1f",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#444",
                  marginBottom: "1rem",
                }}
              >
                {r.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: 1.65,
                  marginBottom: "1rem",
                }}
              >
                {r.pain}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "#ffffff",
                  lineHeight: 1.65,
                }}
              >
                {r.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

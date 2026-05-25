'use client'
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ManufacturingCard } from "@/components/ui/ManufacturingCard";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { BomCard } from "@/components/cards/BomCard";
import { ProcessCard } from "@/components/cards/ProcessCard";
import { SupplierEvalCard } from "@/components/cards/SupplierEvalCard";
import { NominationCard } from "@/components/cards/NominationCard";
import { ProductionCard } from "@/components/cards/ProductionCard";
import { QualityCard } from "@/components/cards/QualityCard";
import { DeliveryCard } from "@/components/cards/DeliveryCard";
import { BenchmarkCard } from "@/components/cards/BenchmarkCard";
import { VaveCard } from "@/components/cards/VaveCard";
import { DashboardPreview } from "@/components/sections/DashboardPreview";

interface ActivityMetric { label: string; pct: number }

interface CardData {
  title: string;
  desc: string;
  body: React.ReactNode;
  longDesc: string;
  features: string[];
  activity: ActivityMetric[];
  stat: { value: string; label: string };
  testimonial: { company: string; quote: string; author: string; role: string };
}

const cards: CardData[] = [
  {
    title: "BOM Management",
    desc: "Create and manage Bills of Materials with assembly hierarchies, technical drawings, and 3D models.",
    body: <BomCard />,
    longDesc: "Build accurate, multi-level Bills of Materials that connect every part, drawing, and revision. Keep engineering and procurement aligned from the first design iteration to mass production.",
    features: [
      "Multi-level assemblies with parent-child hierarchies",
      "Attach 3D models, drawings, and specifications",
      "Track revisions and engineering change orders",
      "Cross-reference common parts across projects",
    ],
    activity: [
      { label: "Parts Linked", pct: 96 },
      { label: "Revisions Tracked", pct: 88 },
      { label: "Drawing Coverage", pct: 82 },
    ],
    stat: { value: "60%", label: "reduction in BOM preparation time reported by customers" },
    testimonial: {
      company: "Tier-1 Automotive",
      quote: "We cut our BOM preparation time by 60%. Engineering changes that used to take a week now propagate in minutes across every project that references the part.",
      author: "Priya Mehta",
      role: "Engineering Manager, Tier-1 Automotive",
    },
  },
  {
    title: "Process Planning & Costing",
    desc: "Define manufacturing processes, material selection, and cost estimation for OEM and suppliers.",
    body: <ProcessCard />,
    longDesc: "Map every manufacturing step alongside material and machine costs. Compare OEM versus supplier scenarios and generate detailed cost breakdowns before a single part is made.",
    features: [
      "Step-by-step process routing with cycle times",
      "Material cost library with real-time price feeds",
      "OEM vs. supplier scenario comparison",
      "Automated cost breakdown report generation",
    ],
    activity: [
      { label: "Process Steps Mapped", pct: 91 },
      { label: "Material Costs Live", pct: 85 },
      { label: "Scenarios Compared", pct: 73 },
    ],
    stat: { value: "3 wks", label: "saved per programme on cost modelling and scenario comparison" },
    testimonial: {
      company: "Global OEM",
      quote: "The OEM vs supplier scenario tool alone saved us three weeks of spreadsheet work on our last platform programme. The cost waterfall report goes straight to our CEO.",
      author: "Arjun Raghavan",
      role: "Cost Engineering Lead, OEM",
    },
  },
  {
    title: "Supplier Evaluation",
    desc: "Technical feasibility assessment, supplier shortlist management, and RFQ distribution.",
    body: <SupplierEvalCard />,
    longDesc: "Assess supplier capability with a structured technical feasibility framework. Manage your shortlist, distribute RFQs at scale, and consolidate responses in one place.",
    features: [
      "Structured technical feasibility scoring",
      "Supplier capability database and shortlisting",
      "Bulk RFQ distribution and response tracking",
      "Automated supplier comparison matrices",
    ],
    activity: [
      { label: "Suppliers Shortlisted", pct: 78 },
      { label: "RFQs Responded", pct: 92 },
      { label: "Feasibility Scored", pct: 86 },
    ],
    stat: { value: "40+", label: "suppliers evaluated across 6 countries in under two weeks" },
    testimonial: {
      company: "Global Sourcing",
      quote: "We evaluated 40 suppliers across 6 countries in two weeks. The feasibility scoring framework is now our standard globally — it removed all subjectivity from the shortlisting process.",
      author: "Lin Wei",
      role: "Global Sourcing Director",
    },
  },
  {
    title: "Supplier Nomination",
    desc: "Cost analysis, weighted scoring, and final supplier recommendation for nomination decisions.",
    body: <NominationCard />,
    longDesc: "Make defensible nomination decisions with weighted scoring across cost, quality, delivery, and technology. AI surfaces the recommended supplier with a full audit trail.",
    features: [
      "Configurable weighted scoring across criteria",
      "Side-by-side cost and capability analysis",
      "AI-powered nomination recommendation",
      "Decision audit trail for compliance",
    ],
    activity: [
      { label: "Criteria Weighted", pct: 100 },
      { label: "AI Recommendations", pct: 94 },
      { label: "Audit Trail Complete", pct: 97 },
    ],
    stat: { value: "100%", label: "of nomination packs accepted by customer gateway teams first time" },
    testimonial: {
      company: "Tier-2 Supplier",
      quote: "Our customer gateway teams now accept our nomination packs without pushback. The audit trail and AI rationale is exactly what they need to sign off quickly.",
      author: "Sarah O'Brien",
      role: "Commodity Manager, Tier-2 Supplier",
    },
  },
  {
    title: "Production Planning",
    desc: "Manage ISIR/FIA sample submission, PPAP lot, and batch lot production planning.",
    body: <ProductionCard />,
    longDesc: "Coordinate every production milestone from initial sample submission to mass production. Manage ISIR, PPAP, and batch lots with clear stage-gate controls.",
    features: [
      "ISIR and FIA sample submission tracking",
      "PPAP lot planning and sign-off management",
      "Batch and mass lot production scheduling",
      "Cross-functional milestone visibility",
    ],
    activity: [
      { label: "ISIR Submissions", pct: 88 },
      { label: "PPAP Elements Closed", pct: 74 },
      { label: "Milestones On-Time", pct: 91 },
    ],
    stat: { value: "5 days", label: "average PPAP closure time, down from 3 weeks" },
    testimonial: {
      company: "Tier-1 Japan",
      quote: "PPAP preparation used to take our team 3 weeks of chasing documents across email chains. Now it is centralised and we close in under 5 days, every time.",
      author: "Kenji Tanaka",
      role: "Program Manager, Tier-1 Japan",
    },
  },
  {
    title: "Quality Control",
    desc: "Quality inspections, testing protocols, defect tracking, and compliance documentation.",
    body: <QualityCard />,
    longDesc: "Run structured inspection protocols, capture defects with evidence, and maintain compliance documentation automatically. Achieve and sustain industry-leading quality scores.",
    features: [
      "Configurable inspection plans and checklists",
      "Photo-linked defect capture and root cause",
      "Compliance tracking against customer standards",
      "Automated PPAP and APQP documentation",
    ],
    activity: [
      { label: "Inspections Passed", pct: 99 },
      { label: "Defects Root-Caused", pct: 87 },
      { label: "Compliance Docs Filed", pct: 95 },
    ],
    stat: { value: "80 PPM", label: "achieved from 1,200 PPM in 18 months using defect trending" },
    testimonial: {
      company: "Electronics Manufacturer",
      quote: "We went from 1,200 PPM to under 80 PPM in 18 months. The defect trending dashboard tells us exactly where to focus every single week.",
      author: "Anita Srinivas",
      role: "Quality Director, Electronics Manufacturer",
    },
  },
  {
    title: "Delivery",
    desc: "Coordinate packing and logistics for efficient end-to-end delivery management.",
    body: <DeliveryCard />,
    longDesc: "Plan packing, book logistics, and track shipments in real time. Manage customs documentation and delivery confirmations from a single operations view.",
    features: [
      "Packing instruction and label generation",
      "Freight booking and carrier integration",
      "Real-time shipment visibility and alerts",
      "Customs documentation and compliance",
    ],
    activity: [
      { label: "Shipments Tracked", pct: 98 },
      { label: "Packing Compliance", pct: 96 },
      { label: "Customs Cleared", pct: 93 },
    ],
    stat: { value: "97.4%", label: "on-time-in-full, up from 88% in the first quarter after go-live" },
    testimonial: {
      company: "Logistics Operations",
      quote: "On-time-in-full jumped from 88% to 97.4% in the first quarter after go-live. Our customer scorecard has never looked better — it was a complete step change.",
      author: "Marcus Hofer",
      role: "Logistics Operations Manager",
    },
  },
  {
    title: "Benchmark Analysis",
    desc: "Compare BOMs across projects, identify cost drivers, and discover VAVE opportunities.",
    body: <BenchmarkCard />,
    longDesc: "Overlay BOMs from multiple projects or OEMs to surface cost outliers and repeating patterns. Turn benchmark insights directly into VAVE opportunities.",
    features: [
      "Multi-project BOM cost overlay and diff",
      "Top cost driver identification by category",
      "Benchmark against market and historical data",
      "One-click conversion to VAVE pipeline",
    ],
    activity: [
      { label: "BOMs Overlaid", pct: 83 },
      { label: "Cost Drivers Found", pct: 77 },
      { label: "VAVE Opportunities", pct: 69 },
    ],
    stat: { value: "34%", label: "above-market cost identified on a single component in first analysis" },
    testimonial: {
      company: "Mobility OEM",
      quote: "The benchmark module showed us we were paying 34% above market on a single bracket. That one finding funded the entire platform investment in the first month.",
      author: "David Okafor",
      role: "VP Purchasing, Mobility OEM",
    },
  },
  {
    title: "VAVE",
    desc: "Value Analysis & Value Engineering — AI-accelerated cost reduction using SCAMPER, TRIZ, and should-cost analysis.",
    body: <VaveCard />,
    longDesc: "Let AI generate value improvement ideas using SCAMPER and TRIZ frameworks, grounded in should-cost benchmarks. Score, prioritise, and track every idea through to approved savings.",
    features: [
      "AI idea generation via SCAMPER and TRIZ",
      "Should-cost analysis with market benchmarks",
      "Structured idea pipeline and priority scoring",
      "Savings tracking from idea to implementation",
    ],
    activity: [
      { label: "Ideas Generated", pct: 89 },
      { label: "Ideas Approved", pct: 62 },
      { label: "Savings Implemented", pct: 54 },
    ],
    stat: { value: "$1.2M", label: "in approved savings surfaced across 3 programmes in just 90 days" },
    testimonial: {
      company: "Tier-1 Global",
      quote: "In 90 days the AI VAVE pipeline surfaced $1.2M in approved savings across 3 programmes. It would have taken our team a full year to find these opportunities manually.",
      author: "Fatima Al-Rashid",
      role: "VAVE Programme Lead, Tier-1 Global",
    },
  },
];

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l2.5 2.5L9 1" stroke="oklch(0.52 0.12 185)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlatformShowcase() {
  const [active, setActive] = useState<CardData | null>(null);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section className="platform-showcase bg-white">
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-[1400px] mx-auto">
        <header className="mb-12 max-w-4xl" style={{ animation: "fadeUp 0.7s both" }}>
          <p className="text-2xl md:text-4xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight text-gray-900">
            Precision at every stage of{" "}
            <AnimatedText
              text="manufacturing."
              textClassName="text-gray-900 font-bold"
              underlineColor="oklch(0.68 0.13 180)"
              underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
              underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
              underlineDuration={1.8}
            />{" "}
            <span className="font-normal text-gray-400">
              From BOM and supplier selection to production, quality, delivery, and value engineering. All operating as one intelligent system.
            </span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={c.title} style={{ animation: `fadeUp 0.6s ${i * 70}ms both` }}>
              <ManufacturingCard title={c.title} description={c.desc} onClick={() => setActive(c)}>
                {c.body}
              </ManufacturingCard>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ animation: "fadeUp 0.7s 600ms both" }}>
          <div className="rounded-2xl bg-card border border-border/40 card-shadow p-6 relative overflow-hidden">
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
            <h3 className="text-lg font-semibold mb-2 relative text-gray-900">One Intelligent System</h3>
            <p className="text-xs text-gray-500 mb-5 relative">All modules working together seamlessly for smarter manufacturing.</p>
            <div className="relative rounded-xl border border-border/50 bg-background/60 backdrop-blur p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">Project Alpha</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Active
                </span>
              </div>
              {[
                ["BOM Completed", "100%"],
                ["Suppliers Evaluated", "4 / 4"],
                ["Production Progress", "75%"],
                ["Quality Score", "98.6%"],
                ["On-Time Delivery", "Yes"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs py-1 border-t border-border/40">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold text-foreground">{v}</span>
                </div>
              ))}
              <button className="mt-3 w-full py-2 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition">
                View Dashboard
              </button>
            </div>
          </div>
          <div className="lg:col-span-2">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* ── Expand dialog ── */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center md:items-stretch md:justify-center md:px-6"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, oklch(0.85 0.1 185 / 0.45) 100%)", backdropFilter: "blur(16px)" }}
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl shadow-2xl overflow-hidden md:mt-12"
            style={{
              height: "calc(100vh - 48px)",
              maxHeight: "calc(100vh - 48px)",
              animation: "dialogSlideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
              background: "#ffffff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #1a1a1a, #000000)" }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto no-scrollbar" style={{ height: "100%" }}>

              {/* ── Section 1: 2-col hero ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-10 pt-10 pb-8">
                {/* left: title + desc + CTAs + visualization */}
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
                    {active.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{active.longDesc}</p>
                  <div className="flex items-center gap-3 mb-8">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-85 transition whitespace-nowrap" style={{ background: "linear-gradient(135deg, #2a2a2a, #000000)" }}>
                      Explore {active.title}
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M1 5h7" /><path d="M5 1l4 4-4 4" />
                      </svg>
                    </button>
                    <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-50 transition whitespace-nowrap">
                      See pricing details
                    </button>
                  </div>
                  {/* visualization */}
                  <div className="platform-showcase">
                    {active.body}
                  </div>
                </div>

                {/* right: feature bullets + stat card */}
                <div className="flex flex-col gap-6">
                  <ul className="space-y-4">
                    {active.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "oklch(0.68 0.13 180 / 0.14)" }}>
                          <CheckIcon />
                        </span>
                        <span className="text-sm text-gray-700 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* mini activity widget */}
                  <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Live Activity</p>
                    <div className="space-y-3">
                      {active.activity.map(({ label, pct }) => (
                        <div key={label}>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-gray-500">{label}</span>
                            <span className="font-semibold text-gray-800">{pct}%</span>
                          </div>
                          <div className="h-1 rounded-full bg-gray-200">
                            <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #2a2a2a, #000000)" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* stat card */}
                  <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.62 0.16 185) 0%, oklch(0.48 0.2 270) 100%)" }}>
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, white, transparent)" }} />
                    <div className="text-4xl font-bold mb-2 relative">{active.stat.value}</div>
                    <div className="text-xs leading-relaxed opacity-80 relative">{active.stat.label}</div>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Testimonial (white bg, centered) ── */}
              <div className="bg-white px-8 md:px-16 py-12 text-center">
                <p className="text-sm font-bold text-gray-900 mb-6 tracking-wide uppercase">{active.testimonial.company}</p>
                <blockquote className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
                  &ldquo;{active.testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">{active.testimonial.author},</span>{" "}
                  {active.testimonial.role}
                </p>
                <button className="mt-4 text-sm font-medium hover:opacity-70 transition flex items-center gap-1 mx-auto text-gray-900">
                  Read the story
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M1 5h7" /><path d="M5 1l4 4-4 4" />
                  </svg>
                </button>
              </div>

              {/* divider */}
              <div className="mx-8 md:mx-16 border-t border-gray-100" />

              {/* ── Section 3: CTA footer (centered) ── */}
              <div className="px-8 md:px-16 py-12 text-center bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get started with {active.title}</h3>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <button className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition shadow-sm" style={{ background: "linear-gradient(135deg, #2a2a2a, #000000)" }}>
                    Start now
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M1 5h7" /><path d="M5 1l4 4-4 4" />
                    </svg>
                  </button>
                  <button className="px-8 py-3 rounded-xl text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-50 transition">
                    Contact sales
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

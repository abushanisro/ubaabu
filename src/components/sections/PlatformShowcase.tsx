'use client'
import { useState, useEffect, useRef } from "react";
import { FloatingPaths } from "@/components/ui/background-paths";
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

const METRIC_ICONS: Record<string, { bg: string; icon: string }> = {
  "BOM Completed":       { bg: "#dcfce7", icon: "✓" },
  "Cost Analysis":       { bg: "#fef9c3", icon: "$" },
  "Process Planning":    { bg: "#dbeafe", icon: "≡" },
  "Suppliers Evaluated": { bg: "#fef3c7", icon: "●" },
  "Production Progress": { bg: "#e0f2fe", icon: "▶" },
  "Quality Score":       { bg: "#d1fae5", icon: "◆" },
  "On-Time Delivery":    { bg: "#ccfbf1", icon: "✓" },
  "Vendor Network":      { bg: "#ede9fe", icon: "⬡" },
};

const BAR_DATA = [
  { month: "Jan", val: 62 }, { month: "Feb", val: 75 }, { month: "Mar", val: 58 },
  { month: "Apr", val: 88 }, { month: "May", val: 72 }, { month: "Jun", val: 95 },
];
const SPARK = [40, 55, 48, 70, 62, 80, 74, 90, 85, 95];

function MetricsCard() {
  return (
    <div className="p-5 h-full flex flex-col">
      <h3 className="text-base font-bold mb-1 text-gray-900">One Intelligent System</h3>
      <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
        All modules working together seamlessly for smarter manufacturing.
      </p>
      <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.52 0.16 185))" }}>
          P
        </div>
        <p className="text-xs font-semibold text-gray-900 flex-1">Project Alpha</p>
        <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: "oklch(0.68 0.13 180 / 0.12)", color: "oklch(0.45 0.14 180)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.68 0.13 180)" }} />
          Active
        </span>
      </div>
      <div className="space-y-2 flex-1">
        {[
          ["BOM Completed",       "100%"],
          ["Cost Analysis",       "$5K saved"],
          ["Process Planning",    "12 steps"],
          ["Suppliers Evaluated", "4 / 4"],
          ["Production Progress", "75%"],
          ["Quality Score",       "98.6%"],
          ["On-Time Delivery",    "Yes"],
          ["Vendor Network",      "32 active"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: METRIC_ICONS[k]?.bg ?? "#f3f4f6", color: "#555" }}>
                {METRIC_ICONS[k]?.icon ?? "●"}
              </span>
              <span className="text-gray-500">{k}</span>
            </div>
            <span className="font-semibold text-gray-800">{v}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-4 w-full py-2 rounded-lg text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition"
        style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.52 0.16 185))" }}
      >
        View Dashboard
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 5h7" /><path d="M5 1l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
}

function AnalyticsCard() {
  const maxVal = Math.max(...BAR_DATA.map(d => d.val));
  const tealFill = "oklch(0.68 0.13 180)";
  const sparkPts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * 180},${40 - (v / 100) * 36}`).join(" ");

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Platform Analytics</h3>
          <p className="text-[11px] text-gray-500">Cost savings & performance trends</p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "oklch(0.68 0.13 180 / 0.12)", color: "oklch(0.45 0.14 180)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.68 0.13 180)" }} />
          Live
        </span>
      </div>

      {/* KPI pills */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Cost Saved", value: "$5K", delta: "+18%" },
          { label: "OTD Rate",   value: "98.6%", delta: "+2.1%" },
          { label: "Suppliers",  value: "32",    delta: "+4" },
        ].map(k => (
          <div key={k.label} className="rounded-xl p-2.5 text-center border border-gray-100 bg-gray-50/60">
            <p className="text-[10px] text-gray-400 mb-0.5">{k.label}</p>
            <p className="text-sm font-bold text-gray-900">{k.value}</p>
            <p className="text-[9px] font-semibold" style={{ color: "oklch(0.52 0.14 160)" }}>{k.delta}</p>
          </div>
        ))}
      </div>

      {/* Bar chart — monthly cost savings */}
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Monthly Cost Reduction ($K)</p>
      <div className="flex items-end gap-1.5 h-20 mb-1 flex-1">
        {BAR_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full rounded-t-md transition-all duration-700"
              style={{
                height: `${(d.val / maxVal) * 68}px`,
                background: `linear-gradient(to top, oklch(0.52 0.16 185), oklch(0.72 0.13 178))`,
                opacity: d.val === maxVal ? 1 : 0.55 + (d.val / maxVal) * 0.45,
              }}
            />
            <span className="text-[8px] text-gray-400">{d.month}</span>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold text-gray-500">Quality Score Trend</span>
          <span className="text-[10px] font-bold" style={{ color: tealFill }}>↑ 98.6%</span>
        </div>
        <svg viewBox="0 0 180 40" className="w-full" style={{ height: 32 }}>
          <defs>
            <linearGradient id="ag-spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.13 180)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="oklch(0.68 0.13 180)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={sparkPts} fill="none" stroke="oklch(0.68 0.13 180)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points={`0,40 ${sparkPts} 180,40`} fill="url(#ag-spark)" />
        </svg>
      </div>
    </div>
  );
}

function BentoSystemCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cardIdx, setCardIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const id = setInterval(() => setCardIdx(p => (p + 1) % 2), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  return (
    <>
    <div
      ref={cardRef}
      className="mt-8 relative rounded-2xl group"
      style={{
        background: "linear-gradient(135deg, oklch(0.84 0.10 185 / 0.35) 0%, oklch(0.89 0.07 178 / 0.25) 50%, oklch(0.97 0.02 182 / 0.20) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 40px oklch(0.68 0.13 180 / 0.25), 0 1px 0 white inset",
        border: "1px solid oklch(0.78 0.09 180 / 0.4)",
        minHeight: 'clamp(240px, 40vw, 340px)',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Overflow clip only for decorative layers */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.68 0.13 180 / 0.30)" }} />
        <div className="absolute -top-10 right-10 w-48 h-48 rounded-full blur-3xl"
          style={{ background: "oklch(0.78 0.10 175 / 0.20)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(280px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.12), transparent 70%)` }} />
      </div>

      {/* Expand button — sits ABOVE the card at top-right, outside overflow clip */}
      <button
        onClick={() => setExpanded(true)}
        className="absolute -top-3 right-3 z-30 w-7 h-7 rounded-md flex items-center justify-center border border-white/60 bg-white/70 backdrop-blur-sm shadow-md hover:bg-white/90 transition"
        title="Expand details"
      >
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
          <path d="M13.75 6.75H10.25V5H15.5V10.25H13.75V6.75Z" fill="rgba(10,80,80,0.85)" />
          <path d="M6.75 10.25H5V15.5H10.25V13.75H6.75V10.25Z" fill="rgba(10,80,80,0.85)" />
        </svg>
      </button>

      {/* Inner grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">

        {/* ── Left: auto-cycling card ── */}
        <div className="rounded-2xl overflow-hidden shadow-lg relative"
          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}>

          {/* Sliding track */}
          <div
            style={{
              display: "flex",
              width: "200%",
              transform: `translateX(${cardIdx === 0 ? "0%" : "-50%"})`,
              transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ width: "50%", flexShrink: 0 }}><MetricsCard /></div>
            <div style={{ width: "50%", flexShrink: 0 }}><AnalyticsCard /></div>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {[0, 1].map(i => (
              <button
                key={i}
                onClick={() => setCardIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: cardIdx === i ? 16 : 6,
                  height: 6,
                  background: cardIdx === i ? "oklch(0.68 0.13 180)" : "oklch(0.68 0.13 180 / 0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Right: dashboard panel ── */}
        <div className="lg:col-span-2">
          <DashboardPreview />
        </div>
      </div>
    </div>

    {/* ── Expanded detail modal — same pattern as all other cards ── */}
    {expanded && (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center md:items-stretch md:justify-center md:px-6"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, oklch(0.85 0.1 185 / 0.45) 100%)", backdropFilter: "blur(16px)" }}
        onClick={() => setExpanded(false)}
      >
        <div
          className="relative w-full max-w-5xl shadow-2xl overflow-hidden md:mt-12"
          style={{
            height: "calc(100vh - 48px)",
            maxHeight: "calc(100vh - 48px)",
            animation: "dialogSlideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
            background: "#ffffff",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* close */}
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition hover:opacity-80"
            style={{ background: "linear-gradient(135deg, #1a1a1a, #000000)" }}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="overflow-y-auto no-scrollbar pb-6" style={{ height: "100%" }}>

            {/* ── Section 1: 2-col hero ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-10 pt-10 pb-8">
              {/* left: title + desc + CTAs + visualization */}
              <div className="flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
                  One Intelligent System
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Connect every manufacturing module into one unified platform — BOM, process planning, supplier evaluation, production, quality, delivery, benchmarking, and VAVE — all sharing live data and working together to accelerate decisions.
                </p>
                <div className="flex items-center gap-3 mb-8">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-85 transition whitespace-nowrap" style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}>
                    Explore Platform
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M1 5h7" /><path d="M5 1l4 4-4 4" />
                    </svg>
                  </button>
                  <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-50 transition whitespace-nowrap">
                    See pricing details
                  </button>
                </div>
                {/* visualization — the cycling card */}
                <div className="platform-showcase">
                  <div className="rounded-2xl overflow-hidden shadow-lg relative"
                    style={{ background: "rgba(248,250,252,1)", border: "1px solid #e5e7eb" }}>
                    <div style={{ display: "flex", width: "200%", transform: `translateX(${cardIdx === 0 ? "0%" : "-50%"})`, transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)" }}>
                      <div style={{ width: "50%", flexShrink: 0 }}><MetricsCard /></div>
                      <div style={{ width: "50%", flexShrink: 0 }}><AnalyticsCard /></div>
                    </div>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {[0, 1].map(i => (
                        <button key={i} onClick={() => setCardIdx(i)} className="rounded-full transition-all duration-300"
                          style={{ width: cardIdx === i ? 16 : 6, height: 6, background: cardIdx === i ? "oklch(0.68 0.13 180)" : "oklch(0.68 0.13 180 / 0.3)" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* right: features + activity + stat */}
              <div className="flex flex-col gap-6">
                <ul className="space-y-4">
                  {[
                    "All 9 modules share live data with zero manual sync",
                    "AI insights surface across BOM, cost, and supplier data",
                    "Single project view from RFQ to delivery confirmation",
                    "Real-time alerts and escalations across every stage",
                    "Audit trail and compliance documentation built-in",
                  ].map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "oklch(0.68 0.13 180 / 0.14)" }}>
                        <CheckIcon />
                      </span>
                      <span className="text-sm text-gray-700 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* activity widget */}
                <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Live Activity</p>
                  <div className="space-y-3">
                    {[
                      { label: "Modules Active",         pct: 100 },
                      { label: "Data Sync Rate",         pct: 99  },
                      { label: "AI Insights Generated",  pct: 87  },
                    ].map(({ label, pct }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-gray-500">{label}</span>
                          <span className="font-semibold text-gray-800">{pct}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-gray-200">
                          <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, oklch(0.68 0.13 180), oklch(0.52 0.16 185))" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* stat card */}
                <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.62 0.16 185) 0%, oklch(0.48 0.2 270) 100%)" }}>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, white, transparent)" }} />
                  <div className="text-4xl font-bold mb-2 relative">$1.8M</div>
                  <div className="text-xs leading-relaxed opacity-80 relative">in total cost savings identified across all active projects using the unified intelligence platform</div>
                </div>
              </div>
            </div>

            {/* ── Section 2: Testimonial ── */}
            <div className="bg-white px-8 md:px-16 py-12 text-center">
              <p className="text-sm font-bold text-gray-900 mb-6 tracking-wide uppercase">Aerospace OEM</p>
              <blockquote className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
                &ldquo;For the first time, our engineering, sourcing, and quality teams are looking at the same data in real time. The decisions we make in Emithran flow instantly across every module — it changed how we operate.&rdquo;
              </blockquote>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">Vikram Nair,</span>{" "}
                CTO, Aerospace OEM
              </p>
              <button className="mt-4 text-sm font-medium hover:opacity-70 transition flex items-center gap-1 mx-auto text-gray-900">
                Read the story
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M1 5h7" /><path d="M5 1l4 4-4 4" />
                </svg>
              </button>
            </div>

            <div className="mx-8 md:mx-16 border-t border-gray-100" />

            {/* ── Section 3: CTA footer ── */}
            <div className="px-8 md:px-16 py-12 text-center bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get started with the full platform</h3>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition shadow-sm" style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}>
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
    </>
  );
}

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
    <section
      className="platform-showcase"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'url(/assets/cards/demo.svg)',
        backgroundSize: '100% auto',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-[1400px] mx-auto">
        <header className="mb-12 max-w-4xl">
          <p className="text-xl md:text-2xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight text-gray-900">
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
          {cards.map((c) => (
            <ManufacturingCard key={c.title} title={c.title} description={c.desc} onClick={() => setActive(c)}>
              {c.body}
            </ManufacturingCard>
          ))}
        </div>

        <BentoSystemCard />
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
              background: "#f0f4f4",
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

            <div className="overflow-y-auto no-scrollbar pb-6" style={{ height: "100%" }}>

              {/* ── Section 1: 2-col hero ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-10 pt-10 pb-8">
                {/* left: title + desc + CTAs + visualization */}
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
                    {active.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{active.longDesc}</p>
                  <div className="flex items-center gap-3 mb-8">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-85 transition whitespace-nowrap" style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}>
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
                  <button className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition shadow-sm" style={{ background: "linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))" }}>
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



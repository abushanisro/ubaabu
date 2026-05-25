import { ManufacturingCard } from "@/components/ui/ManufacturingCard";
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

const cards = [
  { title: "BOM Management", desc: "Create and manage Bills of Materials with assembly hierarchies, technical drawings, and 3D models.", body: <BomCard /> },
  { title: "Process Planning & Costing", desc: "Define manufacturing processes, material selection, and cost estimation for OEM and suppliers.", body: <ProcessCard /> },
  { title: "Supplier Evaluation", desc: "Technical feasibility assessment, supplier shortlist management, and RFQ distribution.", body: <SupplierEvalCard /> },
  { title: "Supplier Nomination", desc: "Cost analysis, weighted scoring, and final supplier recommendation for nomination decisions.", body: <NominationCard /> },
  { title: "Production Planning", desc: "Manage ISIR/FIA sample submission, PPAP lot, and batch lot production planning.", body: <ProductionCard /> },
  { title: "Quality Control", desc: "Quality inspections, testing protocols, defect tracking, and compliance documentation.", body: <QualityCard /> },
  { title: "Delivery", desc: "Coordinate packing and logistics for efficient end-to-end delivery management.", body: <DeliveryCard /> },
  { title: "Benchmark Analysis", desc: "Compare BOMs across projects, identify cost drivers, and discover VAVE opportunities.", body: <BenchmarkCard /> },
  { title: "VAVE", desc: "Value Analysis & Value Engineering — AI-accelerated cost reduction using SCAMPER, TRIZ, and should-cost analysis.", body: <VaveCard /> },
];

export default function PlatformShowcase() {
  return (
    <section className="platform-showcase bg-white">
      <div className="px-6 md:px-12 py-16 md:py-20 max-w-[1400px] mx-auto">
        <header className="mb-12" style={{ animation: "fadeUp 0.7s both" }}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-tight">
            One platform for every stage of manufacturing.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl">
            From BOM and supplier selection to production, quality, delivery, and value engineering — operating together as{" "}
            <span className="text-gradient font-semibold">one intelligent system.</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={c.title} style={{ animation: `fadeUp 0.6s ${i * 70}ms both` }}>
              <ManufacturingCard title={c.title} description={c.desc}>
                {c.body}
              </ManufacturingCard>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ animation: "fadeUp 0.7s 600ms both" }}>
          <div className="rounded-2xl bg-card border border-border/40 card-shadow p-6 relative overflow-hidden">
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
            <h3 className="text-lg font-semibold mb-2 relative text-foreground">One Intelligent System</h3>
            <p className="text-xs text-muted-foreground mb-5 relative">All modules working together seamlessly for smarter manufacturing.</p>
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
    </section>
  );
}

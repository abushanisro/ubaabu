import { Boxes, Cpu, Factory, ShieldCheck, Truck, Wrench } from "lucide-react";

const caps = [
  { icon: Cpu, name: "Design & DFM", desc: "CAD review, simulation and design-for-manufacturing baked into one workspace.", c: "from-sky-100 to-indigo-100" },
  { icon: Boxes, name: "Sourcing", desc: "A vetted network of 1,200+ component and material suppliers across 14 countries.", c: "from-amber-100 to-rose-100" },
  { icon: Factory, name: "Production", desc: "CNC, injection moulding, sheet metal, PCBA and assembly — orchestrated as one line.", c: "from-emerald-100 to-teal-100" },
  { icon: ShieldCheck, name: "Quality", desc: "In-line SPC, CMM, AOI and full PPAP/ISIR documentation, every batch.", c: "from-violet-100 to-fuchsia-100" },
  { icon: Truck, name: "Logistics", desc: "Bonded warehousing, customs and last-mile fulfillment in 38 markets.", c: "from-cyan-100 to-sky-100" },
  { icon: Wrench, name: "Aftermarket", desc: "Spares, RMA, refurbishment and field-service programs that scale with you.", c: "from-orange-100 to-amber-100" },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chip">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
              One platform for every step of the build.
            </h2>
          </div>
          <p className="max-w-md text-[var(--ink-soft)]">
            From a single CAD upload to delivered units — every stage shares the same data model,
            the same dashboards, and the same accountability.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <article
              key={c.name}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-[var(--background)] p-7 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`absolute inset-x-0 -top-24 h-48 bg-gradient-to-br ${c.c} opacity-60 blur-2xl transition group-hover:opacity-90`} />
              <div className="relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--ink)] text-white">
                  <c.icon size={18} />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{c.name}</h3>
                <p className="mt-2 text-[var(--ink-soft)]">{c.desc}</p>
                <a className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--ink)]">
                  Learn more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

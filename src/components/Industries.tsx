const industries = [
  { name: "Automotive", desc: "EV battery trays, sub-assemblies, ADAS housings.", img: "from-slate-200 to-zinc-300" },
  { name: "Medical devices", desc: "Class II / III enclosures with full traceability.", img: "from-sky-200 to-cyan-200" },
  { name: "Industrial IoT", desc: "Sensor modules and ruggedized PCBAs at scale.", img: "from-amber-200 to-rose-200" },
  { name: "Consumer hardware", desc: "Cosmetic plastics, anodized aluminum, packaging.", img: "from-emerald-200 to-lime-200" },
];

export function Industries() {
  return (
    <section className="bg-[var(--background)] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="chip">Industries</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Built for the things people actually use.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {industries.map((i) => (
            <article key={i.name} className="overflow-hidden rounded-3xl border border-black/5 bg-white">
              <div className={`h-56 bg-gradient-to-br ${i.img}`} />
              <div className="flex items-end justify-between p-7">
                <div>
                  <h3 className="text-2xl font-semibold">{i.name}</h3>
                  <p className="mt-1 text-[var(--ink-soft)]">{i.desc}</p>
                </div>
                <a className="text-sm font-medium">View case →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

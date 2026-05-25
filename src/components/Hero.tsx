export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="aurora-bg" aria-hidden />
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="max-w-3xl">
          <p className="chip fade-up">End-to-End Manufacturing Infrastructure</p>
          <h1 className="fade-up mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-[var(--ink)] md:text-7xl lg:text-[88px]">
            Manufacturing,<br />engineered as one&nbsp;stack.
          </h1>
          <p className="fade-up mt-6 max-w-2xl text-lg text-[var(--ink-soft)] md:text-xl">
            Emithran unifies design, sourcing, production, quality and logistics into a single
            programmable system — so you can take a product from CAD to container in weeks, not quarters.
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">Start a project →</a>
            <a href="#capabilities" className="btn-ghost">Explore the platform</a>
          </div>
        </div>
      </div>

      {/* floating product card */}
      <div className="relative mx-auto mt-20 max-w-[1280px] px-6">
        <div className="fade-up rounded-3xl border border-black/5 bg-white/70 p-3 shadow-[0_30px_80px_-30px_rgba(20,20,40,0.25)] backdrop-blur">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { t: "Tooling", v: "Active", n: "DFM review complete · 4 vendors quoted", c: "from-rose-200 to-amber-200" },
              { t: "Production run #A-2410", v: "On track", n: "12,400 / 18,000 units · 2.1% scrap", c: "from-sky-200 to-emerald-200" },
              { t: "QA · CMM batch", v: "0.984 Cpk", n: "All critical dims within tolerance", c: "from-violet-200 to-sky-200" },
            ].map((card) => (
              <div key={card.t} className="overflow-hidden rounded-2xl bg-white">
                <div className={`h-28 bg-gradient-to-br ${card.c}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--ink)]">{card.t}</p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      {card.v}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{card.n}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--ink)] py-24 text-white md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, oklch(0.7 0.18 30 / 0.5), transparent 60%), radial-gradient(50% 50% at 80% 70%, oklch(0.6 0.18 220 / 0.5), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-end">
        <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Let's build your next&nbsp;product.
        </h2>
        <div className="md:pb-3">
          <p className="text-lg text-white/70">
            Tell us what you're making. We'll come back within 24 hours with a tooling estimate,
            a sourcing plan and a production timeline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--ink)]">
              Start a project →
            </a>
            <a href="#" className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium hover:bg-white/10">
              Talk to engineering
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

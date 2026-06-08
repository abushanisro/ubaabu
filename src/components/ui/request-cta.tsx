export default function RequestCTA() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 md:px-12">

      {/* Desktop */}
      <div className="relative overflow-hidden rounded-2xl hidden md:block">
        <img
          alt=""
          aria-hidden="true"
          className="w-full h-auto block"
          src="/assets/cards/requestcard.svg"
        />
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-[55%] pr-14 pl-6">
            <h2 className="text-[2.2rem] font-bold tracking-tight text-white leading-[1.15]">
              The AI platform for India's critical manufacturing.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/60 max-w-sm">
              Up to speed in days, not months. No credit card required. Or book a custom demo with the Emithran team.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
              >
                Request a Demo
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.10]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative overflow-hidden rounded-2xl md:hidden" style={{ aspectRatio: '9 / 16' }}>
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/cards/requestcardmobile.svg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white leading-[1.2]">
            The AI platform for India's critical manufacturing.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/60">
            Up to speed in days, not months. No credit card required. Or book a custom demo with the Emithran team.
          </p>
          <div className="mt-6 flex flex-col w-full gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Request a Demo
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.10]"
            >
              Get a demo
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

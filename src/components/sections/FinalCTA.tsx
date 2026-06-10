'use client'

export default function FinalCTA() {
  function openChat() {
    if (typeof window !== 'undefined' && (window as any).chatlingSDK) {
      (window as any).chatlingSDK.open()
    }
  }
  return (
    <section id="demo" className="bg-white py-4 md:py-14">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        {/* ── Desktop card (md+) ── */}
        <div className="relative overflow-hidden rounded-2xl hidden md:block">
          <img
            src="/assets/cards/requestcard.svg"
            alt=""
            aria-hidden
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="w-[55%] pr-14 pl-6">
              <h2 className="text-[2.2rem] font-bold tracking-tight text-white leading-[1.15]">
                The AI platform for India's critical manufacturing.
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60 max-w-sm">
                Up to speed in days, not months. No credit card required.
                Or book a custom demo with the Emithran team.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="/request-demo"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
                >
                  Request a Demo
                </a>
                <a
                  href="/contact?source=homepage-cta&cta=contact-us"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.10]"
                >
                  Contact Us
                </a>
                <button
                  onClick={openChat}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#2dd4bf]/40 px-5 py-2 text-sm font-semibold text-[#2dd4bf] transition-colors hover:bg-[#2dd4bf]/10"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile card (< md) - 9:16 aspect ratio ── */}
        <div className="relative overflow-hidden rounded-2xl md:hidden" style={{ aspectRatio: '9 / 16' }}>
          <img
            src="/assets/cards/requestcardmobile.svg"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white leading-[1.2]">
              The AI platform for India's critical manufacturing.
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-white/60">
              Up to speed in days, not months. No credit card required.
              Or book a custom demo with the Emithran team.
            </p>
            <div className="mt-6 flex flex-col w-full gap-3">
              <a
                href="/request-demo"
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
              >
                Request a Demo
              </a>
              <a
                href="/contact?source=homepage-cta&cta=get-a-demo"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.10]"
              >
                Get a demo
              </a>
              <button
                onClick={openChat}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#2dd4bf]/40 px-5 py-2.5 text-sm font-semibold text-[#2dd4bf] transition-colors hover:bg-[#2dd4bf]/10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Ask AI
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

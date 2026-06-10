import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Page not found | Emithran',
}

// ── Hover arrow ────────────────────────────────────────────────────────────
function HoverArrow() {
  return (
    <svg
      className="inline-block ml-0.5 transition-transform duration-150 group-hover:translate-x-[3px]"
      width="10" height="10" viewBox="0 0 10 10"
      aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"
    >
      <path
        className="opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 origin-left"
        d="M0 5h7"
      />
      <path d="M1 1l4 4-4 4" />
    </svg>
  )
}

// ── Blend-style icons ──────────────────────────────────────────────────────

function IconPricing() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.7 6.38l8.4 8.27A4 4 0 0 1 30.3 17.5V33a3 3 0 0 1-3 3H11.3a3 3 0 0 1-3-3V17.5a4 4 0 0 1 1.2-2.85l8.4-8.27a2 2 0 0 1 2.8 0z" fill="#0d9e8a" fillOpacity=".12"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3 6.38l8.4 8.27A4 4 0 0 1 28.9 17.5V33a3 3 0 0 1-3 3H9.9a3 3 0 0 1-3-3V17.5a4 4 0 0 1 1.2-2.85l8.4-8.27a2 2 0 0 1 2.8 0z" fill="#0d9e8a" fillOpacity=".4"/>
      <circle cx="19.3" cy="16" r="3" fill="#0d9e8a" fillOpacity=".7"/>
      <path d="M14 24h10M14 28h7" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconCaseStudies() {
  return (
    <svg width="34" height="40" viewBox="0 0 34 40" fill="none" aria-hidden="true">
      <rect width="26" height="34" rx="2" fill="#0d9e8a" fillOpacity=".1"/>
      <path d="M30 6a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h18zm0 28H12v2h18v-2zm0-5h-4v2h4v-2zm-6 0H12v2h12v-2zm6-5H12v2h18v-2zm0-5H12v2h18v-2zm0-9h-6v2h6v-2zm-10 0h-8v2h8v-2z" fill="#0d9e8a" fillOpacity=".6"/>
    </svg>
  )
}

function IconFAQ() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.5 21.2C-.78 15.72.56 8.62 5.63 4.68c5.07-3.94 12.28-3.49 16.82 1.05 4.54 4.54 4.99 11.75 1.05 16.82C19.54 27.6 12.45 28.95 6.93 25.66L1.04 27.63c-.41.13-.63-.09-.5-.5L2.5 21.2z" fill="#0d9e8a" fillOpacity=".15"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.23 12.73c4.54-4.54 11.75-4.99 16.81-1.05 5.07 3.94 6.4 11.04 3.12 16.56l1.97 5.89c.13.41-.09.63-.5.5l-5.89-1.97C27.22 35.95 20.12 34.61 16.18 29.54c-3.94-5.07-3.49-12.28 1.05-16.81z" fill="#0d9e8a" fillOpacity=".35"/>
      <path d="M19 15v1a4 4 0 0 1-2 3.46V21h2v-1a6 6 0 0 0 2-4.45V15h-2zm-2 8h2v2h-2v-2z" fill="#0d9e8a"/>
    </svg>
  )
}

function IconEngineering() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M19 26.9V17.5L28 13l9 4.5v9.4c0 1.43-.84 2.74-2.15 3.34L27 34l-8-3.76A3.5 3.5 0 0 1 17 26.9Z" fill="#0d9e8a" fillOpacity=".15" stroke="#0d9e8a" strokeOpacity=".3" strokeWidth="1.5"/>
      <path d="M2 26.9V17.5L11 13l9 4.5v9.4c0 1.43-.84 2.74-2.15 3.34L10 34l-8-3.76A3.5 3.5 0 0 1 0 26.9Z" fill="#0d9e8a" fillOpacity=".3" stroke="#0d9e8a" strokeOpacity=".5" strokeWidth="1.5"/>
    </svg>
  )
}

function IconContact() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="1" y="7" width="32" height="24" rx="3" fill="#0d9e8a" fillOpacity=".12" stroke="#0d9e8a" strokeOpacity=".25" strokeWidth="1.5"/>
      <path d="M1 12l16 11 16-11" stroke="#0d9e8a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ── Recovery cards data ────────────────────────────────────────────────────
const cards = [
  {
    Icon: IconPricing,
    title: 'Pricing',
    body: 'See outcome-based packages with transparent, ROI-driven pricing for manufacturing teams.',
    href: '/pricing',
  },
  {
    Icon: IconCaseStudies,
    title: 'Case Studies',
    body: 'Read how manufacturers in defence, aerospace, and precision engineering use Emithran.',
    href: '/case-studies',
  },
  {
    Icon: IconFAQ,
    title: 'FAQ',
    body: 'Browse frequently asked questions about the Emithran platform, pricing, and integrations.',
    href: '/faq',
  },
  {
    Icon: IconEngineering,
    title: 'Engineering Support',
    body: 'Expert support, implementation partners, and managed services to keep your platform running.',
    href: '/products/engineering-support',
  },
  {
    Icon: IconContact,
    title: 'Contact Us',
    body: 'Talk to our team about your manufacturing use case - we reply within one business day.',
    href: '/contact?source=404&cta=contact-us',
  },
]


// ── Page ──────────────────────────────────────────────────────────────────
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">

      {/* Header */}
      <header className="w-full border-b border-black/[0.07] bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/infographics/logo/logo-white.png" alt="Emithran" className="h-8 w-auto" />
            <span className="font-display text-lg font-semibold tracking-tight text-[#080808]">EMITHRAN</span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-1 text-[13px] font-medium text-[#0d9e8a] hover:opacity-75 transition-opacity"
          >
            Back to home
            <svg className="ml-0.5 group-hover:translate-x-0.5 transition-transform" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 5h7M6 1l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 mx-auto w-full max-w-[1280px] px-6 md:px-12">

        {/* ── Hero copy ── */}
        <section className="relative pt-20 pb-16 md:pb-20 border-b border-black/[0.07] flex justify-center">

          {/* Column guides */}
          <div className="pointer-events-none hidden sm:flex absolute inset-0 justify-between px-0 z-0" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px bg-black/[0.05] h-full" />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9e8a] mb-4">404 Error</p>
            <h1 className="font-display text-[2.6rem] md:text-[3.4rem] font-bold text-[#0f1b2d] leading-[1.1] tracking-tight mb-5">
              Page not found
            </h1>
            <p className="text-[16px] text-[#0f1b2d]/55 leading-relaxed max-w-[480px]">
              We couldn&apos;t find that page. Visit our{' '}
              <Link href="/" className="text-[#0d9e8a] hover:underline underline-offset-2 font-medium">
                homepage
              </Link>
              , or try one of the sections below.
            </p>
          </div>

        </section>

        {/* ── Recovery cards grid ── */}
        <section className="relative py-16 md:py-20">

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-black/[0.07]">
            {cards.map(({ Icon, title, body, href }) => (
              <Link
                key={title}
                href={href}
                className="group relative flex flex-col p-7 md:p-8 border-r border-b border-black/[0.07] hover:bg-[#f8fffe] transition-colors duration-200"
              >
                {/* Teal accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0d9e8a] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                <div className="mb-5 w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Icon />
                </div>

                <h2 className="font-display text-[15px] font-bold text-[#0f1b2d] mb-2 tracking-tight">
                  {title}
                  <span className="inline-block ml-1 whitespace-nowrap">
                    <HoverArrow />
                  </span>
                </h2>
                <p className="text-[13.5px] text-[#0f1b2d]/55 leading-relaxed flex-1">
                  {body}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer bar */}
      <footer className="relative w-full border-t border-black/[0.07] bg-white/80 overflow-hidden">
        {/* Diagonal bands - bottom-left corner */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-[380px] h-[120px]" aria-hidden="true">
          <div
            className="absolute h-[2px] bg-[#0d9e8a]/[0.18]"
            style={{ top: '30px', left: 0, right: 0, transform: 'skewY(-8deg)', transformOrigin: 'left center' }}
          />
          <div
            className="absolute h-[2px] bg-[#0d9e8a]/[0.28]"
            style={{ top: '46px', left: '4%', right: '8%', transform: 'skewY(-8deg) translateY(6px)', transformOrigin: 'left center' }}
          />
          <div
            className="absolute h-[2px]"
            style={{
              top: '62px', left: 0, right: 0,
              transform: 'skewY(-8deg) translateY(6px)',
              transformOrigin: 'left center',
              background: 'linear-gradient(90deg, transparent 0%, #0d9e8a 30%, #2dd4bf 60%, transparent 100%)',
              opacity: 0.35,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-12 h-14 flex items-center justify-between">
          <span className="text-[11px] text-black/30">
            © {new Date().getFullYear()} Emithran Technologies Pvt. Ltd.
          </span>
          <div className="flex items-center gap-4 text-[11px] text-black/30">
            <Link href="/privacy" className="hover:text-black/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-black/60 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

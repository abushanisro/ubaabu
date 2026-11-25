// Server component: the hero's markup is rendered on the server and not hydrated.
// Interactive bits are small client islands (Typewriter, HeroVideo*).
import { Typewriter } from '@/components/ui/typewriter'
import { AnimatedArrow } from '@/components/ui/animated-arrow'
import { HeroVideoProvider, HeroVideoThumbnail, WatchOverviewButton } from './hero/HeroVideo'

const CAPABILITIES = ['BOM Intelligence', 'Should-Cost', 'Supplier Radar', 'Quality & PPAP']

export default function Hero() {
  return (
    <section className="relative bg-white" style={{ minHeight: '100svh' }}>
      {/* hero background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Mobile: the decorative teal wave is drawn as inline SVG instead of a raster
            image. Vector shapes are not LCP candidates, so the H1 / product thumbnail
            becomes the LCP element and paints with the first frame (SEO audit #04:
            the decorative webp was the mobile LCP at ~4 s). */}
        <svg className="absolute inset-0 h-full w-full translate-y-20 lg:hidden" viewBox="0 0 900 1600" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
          <defs>
            <linearGradient id="hero-wave-fill" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#6ee7cf" />
              <stop offset="0.45" stopColor="#14b8a6" />
              <stop offset="1" stopColor="#2a9fb3" />
            </linearGradient>
            <linearGradient id="hero-wave-sheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 1290 C 260 1150 520 1040 700 960 C 790 915 860 850 900 745 L 900 1600 L 0 1600 Z" fill="url(#hero-wave-fill)" />
          <path d="M0 1290 C 260 1150 520 1040 700 960 C 790 915 860 850 900 745 L 900 900 C 700 1010 380 1150 0 1340 Z" fill="url(#hero-wave-sheen)" />
        </svg>
        {/* Desktop artwork (unchanged). On mobile the <img> falls back to a 1×1 data URI and is hidden, so no image is downloaded there. */}
        <picture>
          <source media="(min-width: 1024px)" srcSet="/assets/cards/projectcard.webp" width={1672} height={941} />
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width={1672} height={941} alt="" className="absolute inset-0 hidden h-full w-full object-cover object-center translate-y-20 lg:block" fetchPriority="high" />
        </picture>
      </div>

      <style>{`
        .hds-btn-primary { display:inline-flex; align-items:center; gap:6px; background:linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185)); color:#fff; border:none; border-radius:6px; padding:10px 20px; font-size:14px; font-weight:600; cursor:pointer; text-decoration:none; transition:opacity 0.2s; }
        .hds-btn-primary:hover { opacity:0.85; }
        .hds-btn-primary .arrow-line { transition:transform 0.2s ease; }
        .hds-btn-primary:hover .arrow-line { transform:translateX(2px); }
        .hds-btn-secondary { display:inline-flex; align-items:center; gap:8px; background:transparent; color:oklch(0.55 0.14 182); border:1.5px solid oklch(0.68 0.13 180); border-radius:6px; padding:10px 20px; font-size:14px; font-weight:600; cursor:pointer; text-decoration:none; transition:background 0.2s, color 0.2s; }
        .hds-btn-secondary:hover { background:oklch(0.96 0.04 180); color:oklch(0.45 0.14 185); }
      `}</style>

      <HeroVideoProvider>
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-6 pt-20 pb-8 lg:grid-cols-2 lg:gap-10 lg:pt-28 lg:pb-12">

        {/* ── LEFT: copy ── */}
        <div className="w-full max-w-[560px]">
          {/* H1 names the category and the audience (SEO audit #16). */}
          <h1 className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#0a0a0a] md:text-[40px] lg:text-[50px]">
            End-to-End{' '}
            <span className="text-[#0d9e8a]">Manufacturing</span>{' '}
            Intelligence
            <span className="mt-3 block text-[17px] font-semibold leading-snug tracking-normal text-black/70 md:text-[19px]">
              Should-cost, BOM &amp; supplier intelligence for India’s aerospace &amp; defence OEMs
            </span>
          </h1>
          <p className="mt-3 text-[17px] font-semibold md:text-[19px]" style={{ minHeight: '1.6em' }}>
            <span className="text-black/45">AI for </span>
            <Typewriter
              text={CAPABILITIES}
              speed={55}
              deleteSpeed={35}
              waitTime={1800}
              cursorChar="_"
              cursorClassName="ml-0.5"
              className="text-black/70"
            />
          </p>
     
          <p className="mt-4 text-[15px] leading-relaxed text-[#555]">
            Manage sourcing, costing, planning, quality, benchmarking, and delivery
            at the speed of AI using connected manufacturing and supplier data.
          </p>
          <div className="mt-7 flex items-center gap-3 w-full sm:w-auto">
            <a href="/request-demo" className="hds-btn-primary group flex-1 justify-center sm:flex-none">
              Request Demo
              <AnimatedArrow />
            </a>
            <WatchOverviewButton />
          </div>
        </div>

        {/* ── RIGHT: product mockup + floating panels ── */}
        <div className="relative w-full pb-4 pt-4 lg:pb-20 lg:pt-12">


          {/* Main product card - HeroVideoDialog */}
          <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)]">
            <HeroVideoThumbnail />
          </div>
        </div>
      </div>
      </HeroVideoProvider>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />

      {/* ── Partner logos - fills the bottom gap ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-b border-black/[0.06] bg-white/80 backdrop-blur-sm py-2">
        <style>{`
          @keyframes marquee-p { from { transform: translateX(0) } to { transform: translateX(-25%) } }
          .marquee-p { animation: marquee-p 32s linear infinite; will-change: transform; }
        `}</style>
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 24px, black 80px, black calc(100% - 80px), transparent calc(100% - 24px))',
            WebkitMaskImage: 'linear-gradient(to right, transparent 24px, black 80px, black calc(100% - 80px), transparent calc(100% - 24px))',
          }}
        >
          {(() => {
            const logos = [
              { src: '/assets/trustedby/ashokleyland.webp', alt: 'Ashok Leyland', cls: 'h-14' },
              { src: '/assets/trustedby/TATAPower.webp',    alt: 'TATA Power' },
              { src: '/assets/trustedby/digantara.webp',    alt: 'Digantara' },
              { src: '/assets/trustedby/Pixxel.webp',       alt: 'Pixxel' },
              { src: '/assets/trustedby/RolandBerger.webp', alt: 'Roland Berger' },
              { src: '/assets/trustedby/rainmaker.webp',    alt: 'Rainmaker' },
              { src: '/assets/trustedby/ForusHealth.webp',  alt: 'Forus Health' },
              { src: '/assets/trustedby/Aadya.webp',        alt: 'Aadya' },
              { src: '/assets/trustedby/Tanbo.webp',        alt: 'Tanbo' },
            ]
            const row = [...logos, ...logos, ...logos, ...logos]
            return (
              <div className="marquee-p flex w-max items-center gap-10 md:gap-14">
                {row.map((logo, i) => (
                  <img key={i} src={logo.src} alt={logo.alt} className={`${logo.cls ?? 'h-10'} w-auto object-contain opacity-80`} width={160} height={160} loading="lazy" decoding="async" />
                ))}
              </div>
            )
          })()}
        </div>
      </div>

    </section>
  )
}

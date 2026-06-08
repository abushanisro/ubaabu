'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import { CircularGallery } from '@/components/ui/circular-gallery'

const EASE = [0.16, 1, 0.3, 1] as const

// ── Magnetic button ───────────────────────────────────────────────────────────
function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)
  const sx  = useSpring(x, { stiffness: 280, damping: 28 })
  const sy  = useSpring(y, { stiffness: 280, damping: 28 })
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width  / 2) * 0.28)
        y.set((e.clientY - r.top  - r.height / 2) * 0.28)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

// ── News ticker ───────────────────────────────────────────────────────────────
const NEWS = [
  { label: 'New',        text: 'Should-cost engine covers 72,000+ verified supplier data points across 80+ Indian regions',   href: '/solutions' },
  { label: 'Case Study', text: 'Chassis Ladder Frame — India vs Belgium Should Cost Analysis',                                  href: '/case-studies/chassis-india-belgium' },
  { label: 'Update',     text: 'Design-to-Cost integration now live inside CAD workflows for tier-1 manufacturers',            href: '/solutions' },
  { label: 'Case Study', text: 'DC-DC Converter Teardown & VAVE — cost reduction through design optimisation',                 href: '/case-studies/dc-dc-converter' },
  { label: 'Case Study', text: 'Electronics Teardown, PCB Should Costing & VAVE analysis',                                     href: '/case-studies/electronics-teardown' },
  { label: 'Case Study', text: 'Should Costing for Exhaust System — full BOM breakdown',                                       href: '/case-studies/exhaust-system' },
  { label: 'Insight',    text: 'AI-driven VAVE identifies average −18% cost reduction across active BOMs',                     href: '/case-studies/dc-dc-converter' },
  { label: 'Case Study', text: 'HGV CAB Structure Strategy — Should Cost & Decision Matrix',                                   href: '/case-studies/hgv-cab-strategy' },
  { label: 'Case Study', text: 'Should Costing — HGV Chassis Ladder Frame deep dive',                                          href: '/case-studies/hgv-chassis' },
  { label: 'Case Study', text: '2T LCV Rear Drive Axle — Should Cost Analysis',                                                href: '/case-studies/rear-axle-should-cost' },
  { label: 'Case Study', text: 'Rear View Mirror Assembly — BOM Should Cost breakdown',                                        href: '/case-studies/rear-view-mirror' },
  { label: 'Feature',    text: 'Live supplier capacity tracking now available across 1,000+ verified suppliers',                href: '/solutions' },
]

// ── Platform cards data ───────────────────────────────────────────────────────
const METRICS = [
  { label: 'Avg. cost reduction', value: '−18%', sub: 'across active BOMs'   },
  { label: 'RFQ cycle time',      value: '−62%', sub: 'vs. manual process'   },
]

const SUPPLIERS = [
  { name: 'Precision Parts Ltd.',  score: 94, tag: 'Best match'  },
  { name: 'IndoForge Components',  score: 87, tag: 'Shortlisted' },
  { name: 'StellarCast Works',     score: 81, tag: 'Shortlisted' },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function SolutionsHero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(contentRef, { once: true, margin: '-60px' })

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* ── Hero section (ticker lives inside so blur shows wave) ── */}
      <section
        style={{
          background: '#ffffff',
          minHeight:  '80vh',
          display:    'flex',
          alignItems: 'center',
          position:   'relative',
          overflow:   'hidden',
        }}
      >
        {/* ── Stripe-style news ticker — absolutely on top of wave ── */}
        <style>{`
          @keyframes tickerScroll {
            0%   { transform: translateX(0) }
            100% { transform: translateX(-50%) }
          }
          .ticker-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 14px 28px;
            border-right: 1px solid rgba(0,0,0,0.07);
            min-width: 220px;
            cursor: pointer;
            transition: background 0.2s;
            text-decoration: none;
            position: relative;
            overflow: hidden;
          }
          .ticker-item:hover { background: rgba(255,255,255,0.35); }
          .ticker-item:hover .ticker-arrow-initial { transform: translateX(18px); opacity: 0; }
          .ticker-item:hover .ticker-arrow-hover   { transform: translateX(0);    opacity: 1; }
          .ticker-arrow-initial {
            transition: transform 0.2s ease, opacity 0.2s ease;
            transform: translateX(0); opacity: 1;
          }
          .ticker-arrow-hover {
            position: absolute;
            transition: transform 0.2s ease, opacity 0.2s ease;
            transform: translateX(-18px); opacity: 0;
          }
        `}</style>
        <div
          style={{
            position:             'absolute',
            top:                  0,
            left:                 0,
            right:                0,
            zIndex:               20,
            background:           'rgba(255,255,255,0.55)',
            backdropFilter:       'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderBottom:         '1px solid rgba(0,0,0,0.07)',
            overflow:             'hidden',
          }}
        >
          <div
            style={{
              display:   'flex',
              animation: 'tickerScroll 50s linear infinite',
              width:     'max-content',
            }}
          >
            {[...NEWS, ...NEWS].map((item, i) => (
              <a key={i} href={item.href} className="ticker-item">
                <span style={{
                  fontSize:      '9.5px',
                  fontWeight:    600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color:         '#2dd4bf',
                  marginBottom:  '3px',
                }}>
                  {item.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize:     '12px',
                    fontWeight:   500,
                    color:        'rgba(0,0,0,0.65)',
                    whiteSpace:   'nowrap',
                    maxWidth:     '260px',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.text}
                  </span>
                  <span style={{ position: 'relative', width: 13, height: 10, flexShrink: 0 }}>
                    <svg className="ticker-arrow-initial" width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M11 5L7 9M11 5L7 1M11 5L0 5" stroke="#0d9488" strokeWidth="1.75" strokeLinecap="square"/>
                    </svg>
                    <svg className="ticker-arrow-hover" width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path d="M11 5L7 9M11 5L7 1M11 5L0 5" stroke="#0d9488" strokeWidth="1.75" strokeLinecap="square"/>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* SVG wave — right side animated background */}
        <style>{`
          @keyframes waveDrift {
            0%, 100% { transform: scale(1.04) translateY(0px) translateX(0px) }
            33%       { transform: scale(1.08) translateY(-18px) translateX(-8px) }
            66%       { transform: scale(1.05) translateY(-8px) translateX(4px) }
          }
          .hero-wave-container {
            position: absolute;
            right: -10%;
            top: 0;
            width: 92%;
            height: 110%;
            z-index: 1;
            overflow: hidden;
          }
          @media (max-width: 768px) {
            .hero-wave-container {
              right: -5%;
              top: auto;
              bottom: -5%;
              width: 115%;
              height: 62%;
              opacity: 1;
            }
          }
        `}</style>
        <div aria-hidden className="hero-wave-container">
          <img
            src="/assets/cards/solution/hero.svg"
            alt=""
            style={{
              width:           '100%',
              height:          '100%',
              objectFit:       'cover',
              objectPosition:  'right top',
              animation:       'waveDrift 9s ease-in-out infinite',
              transformOrigin: 'center center',
              display:         'block',
            }}
          />
        </div>

        {/* Gradient overlay — stronger on mobile to keep text readable */}
        <style>{`
          .hero-gradient-overlay {
            background: linear-gradient(to right, #ffffff 35%, rgba(255,255,255,0.60) 58%, rgba(255,255,255,0.05) 82%);
          }
          @media (max-width: 768px) {
            .hero-gradient-overlay {
              background: linear-gradient(to bottom, #ffffff 50%, rgba(255,255,255,0.55) 68%, rgba(255,255,255,0) 100%);
            }
          }
        `}</style>
        <div
          aria-hidden
          className="hero-gradient-overlay"
          style={{
            position:   'absolute',
            inset:      0,
            zIndex:     2,
          }}
        />

        {/* Content grid */}
        <div
          ref={contentRef}
          style={{
            position:  'relative',
            zIndex:    10,
            maxWidth:  '1280px',
            margin:    '0 auto',
            width:     '100%',
            padding:    '0 1.25rem clamp(4rem, 12vw, 6rem)',
            paddingTop: 'calc(clamp(2rem, 4vw, 3.5rem) + 58px)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: headline + CTA ── */}
            <div className="flex flex-col">

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
                className="font-display font-bold leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5.2vw, 4rem)', color: '#0f1b2d' }}
              >
                Build Smarter.{' '}
                <span className="block">Source Faster.</span>
                <span className="block" style={{ color: '#2dd4bf' }}>
                  <AnimatedText
                    text="Deliver Reliably."
                    textClassName="font-bold"
                    underlineColor="rgba(45,212,191,0.45)"
                    underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                    underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                    underlineDuration={1.8}
                  />
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
                className="mt-5 max-w-md leading-relaxed"
                style={{ fontSize: '14.5px', color: 'rgba(0,0,0,0.55)' }}
              >
                Emithran connects design, sourcing, and supply chain intelligence in one platform — giving engineering, procurement, and operations teams the data they need to move faster and spend less.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Magnet>
                  <a
                    href="/request-demo"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-px"
                    style={{
                      background: '#2dd4bf',
                      color:      '#0f1b2d',
                      boxShadow:  '0 4px 24px rgba(45,212,191,0.30)',
                    }}
                  >
                    Request a Demo
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </Magnet>
              </motion.div>


            </div>

            {/* ── Right: circular solution card gallery ── */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.28, ease: EASE }}
              className="block"
              style={{ height: 'clamp(280px, 45vw, 480px)' }}
            >
              <CircularGallery
                radius={240}
                autoRotateSpeed={0.04}
                items={[
                  {
                    label: 'Design Intelligence',
                    sub: 'Live DFM · CAD-integrated cost feedback',
                    photo: { url: '/assets/cards/solution/card/design.png', text: 'Design intelligence card', pos: 'center top' },
                  },
                  {
                    label: 'Supplier Intelligence',
                    sub: 'Rank 1,000+ suppliers in seconds',
                    photo: { url: '/assets/cards/solution/card/supler.png', text: 'Supplier network card', pos: 'center top' },
                  },
                  {
                    label: 'Cost Intelligence',
                    sub: 'Should-cost engine · 72K data points',
                    photo: { url: '/assets/cards/solution/card/cost.png', text: 'Cost intelligence card', pos: 'center top' },
                  },
                  {
                    label: 'Risk Management',
                    sub: 'OTIF heatmap · live disruption alerts',
                    photo: { url: '/assets/cards/solution/card/risk.png', text: 'Risk management card', pos: 'center top' },
                  },
                  {
                    label: 'VAVE',
                    sub: 'AI-driven value engineering',
                    photo: { url: '/assets/cards/solution/card/vave.png', text: 'VAVE card', pos: 'center top' },
                  },
                  {
                    label: 'Order Tracking',
                    sub: 'Real-time project & delivery status',
                    photo: { url: '/assets/cards/solution/card/status.png', text: 'Order tracking card', pos: 'center top' },
                  },
                ]}
              />
            </motion.div>

          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{ height: '100px', background: 'linear-gradient(to bottom, transparent, #ffffff)', zIndex: 3 }}
        />
      </section>
    </div>
  )
}

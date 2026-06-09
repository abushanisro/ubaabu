'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import useEmblaCarousel from 'embla-carousel-react'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const OUTCOMES = [
  {
    category: 'Procurement',
    metric:   '80%',
    label:    'Time Saved',
    before:   '40 hours per RFQ coordinating.',
    after:    '8 hours on strategy.',
    detail:   'RFQ cycle compressed from 40 to 8 hours using Emithran\'s live should-cost engine.',
  },
  {
    category: 'Engineering',
    metric:   '40%',
    label:    'Faster Cycles',
    before:   'Designs thrown back after RFQ.',
    after:    'DFM feedback inside CAD.',
    detail:   'Manufacturability issues caught while designs are still fluid — not after tooling is cut.',
  },
  {
    category: 'Leadership',
    metric:   '99.4%',
    label:    'Accuracy',
    before:   'Forecasts are always wrong.',
    after:    'Live visibility into capacity.',
    detail:   'Real-time supplier capacity tracking across 1,000+ suppliers replaces manual forecasting.',
  },
] as const

// ── Mini SVG charts per card ──────────────────────────────────────────────────

function BarChart() {
  return (
    <svg width="52" height="38" viewBox="0 0 52 38" fill="none" aria-hidden>
      <rect x="2"  y="6"  width="12" height="32" rx="3" fill="rgba(0,0,0,0.06)" />
      <rect x="20" y="6"  width="12" height="32" rx="3" fill="rgba(13,158,138,0.12)" />
      <rect x="2"  y="22" width="12" height="16" rx="3" fill="rgba(0,0,0,0.15)" />
      <rect x="20" y="28" width="12" height="10" rx="3" fill={T} />
      <text x="2"  y="4"  fill="rgba(0,0,0,0.28)" fontSize="6.5" fontFamily="monospace">40h</text>
      <text x="20" y="4"  fill={T}                 fontSize="6.5" fontFamily="monospace">8h</text>
    </svg>
  )
}

function LineChart() {
  return (
    <svg width="56" height="38" viewBox="0 0 56 38" fill="none" aria-hidden>
      <polyline
        points="4,34 18,26 32,17 50,6"
        stroke="rgba(13,158,138,0.18)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="4,34 18,26 32,17 50,6"
        stroke={T}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="6"  r="3.5" fill={T} />
      <circle cx="4"  cy="34" r="2.5" fill="rgba(13,158,138,0.3)" />
    </svg>
  )
}

function ArcChart() {
  const r = 13
  const circumference = 2 * Math.PI * r
  const filled = 0.994 * circumference
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
      <circle cx="19" cy="19" r={r} stroke="rgba(0,0,0,0.07)" strokeWidth="4.5" fill="none" />
      <circle
        cx="19" cy="19" r={r}
        stroke={T}
        strokeWidth="4.5"
        fill="none"
        strokeDasharray={`${filled} ${circumference}`}
        strokeDashoffset={circumference * 0.25}
        strokeLinecap="round"
      />
    </svg>
  )
}

const CHARTS = [BarChart, LineChart, ArcChart]

// ── Carousel card ─────────────────────────────────────────────────────────────

function CarouselCard({
  item,
  index,
  isActive,
}: {
  item: (typeof OUTCOMES)[number]
  index: number
  isActive: boolean
}) {
  const Chart = CHARTS[index]

  return (
    <div
      className="shrink-0 rounded-2xl overflow-hidden select-none w-[calc(100%-1.5rem)] sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
      style={{
        background: 'white',
        border: isActive ? `1px solid rgba(13,158,138,0.28)` : '1px solid rgba(0,0,0,0.07)',
        boxShadow: isActive
          ? '0 12px 48px rgba(13,158,138,0.10), 0 2px 16px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: '3px',
          background: isActive ? `linear-gradient(90deg, ${T}, #2dd4bf)` : 'transparent',
          transition: 'background 0.4s',
        }}
      />

      <div style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>

        {/* Badge + chart */}
        <div className="flex items-start justify-between mb-5">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
            style={{ color: T, background: 'rgba(13,158,138,0.08)' }}
          >
            {item.category}
          </span>
          <Chart />
        </div>

        {/* Big metric */}
        <div className="mb-5">
          <p
            className="font-display font-bold leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 4rem)', color: '#0d1117' }}
          >
            {item.metric}
          </p>
          <p
            style={{ fontSize: '14px', color: 'rgba(0,0,0,0.4)', marginTop: '0.3rem', fontWeight: 500 }}
          >
            {item.label}
          </p>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginBottom: '1.25rem' }} />

        {/* Before */}
        <div className="mb-3.5">
          <p
            className="font-mono uppercase mb-1.5"
            style={{ fontSize: '8.5px', letterSpacing: '0.22em', color: 'rgba(0,0,0,0.28)' }}
          >
            Before
          </p>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)',
              color: 'rgba(0,0,0,0.32)',
              lineHeight: 1.5,
              fontStyle: 'italic',
              fontWeight: 500,
            }}
          >
            &ldquo;{item.before}&rdquo;
          </p>
        </div>

        {/* After */}
        <div
          className="rounded-xl p-4 mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(13,158,138,0.07) 0%, rgba(45,212,191,0.04) 100%)',
            border: `1px solid rgba(13,158,138,0.14)`,
          }}
        >
          <p
            className="font-mono uppercase mb-1.5"
            style={{ fontSize: '8.5px', letterSpacing: '0.22em', color: T }}
          >
            After
          </p>
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)',
              color: '#0d1117',
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            {item.after}
          </p>
        </div>

        {/* Detail */}
        <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.38)', lineHeight: 1.65 }}>
          {item.detail}
        </p>

      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 2200

export default function OutcomeAndWhy() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const [activeIdx, setActiveIdx] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])
  const onPrev   = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const onNext   = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setActiveIdx(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  const canPrev = activeIdx > 0
  const canNext = activeIdx < OUTCOMES.length - 1

  return (
    <>
    <style>{`
      @keyframes scaleXIn { from { transform: scaleX(0) } to { transform: scaleX(1) } }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
    <section
      className="bg-white overflow-hidden"
      style={{
        paddingTop:    'clamp(2rem, 3.5vw, 3rem)',
        paddingBottom: 'clamp(2rem, 3.5vw, 3rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Top: heading + tabs + arrows ── */}
        <div ref={headRef} className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE }}
              className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900"
            >
              Perfect{' '}
              <AnimatedText
                text="Information."
                textClassName="text-gray-900 font-bold"
                underlineColor="oklch(0.68 0.13 180)"
                underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                underlineDuration={1.8}
              />
            </motion.p>

            {/* Tabs + arrows inline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
              className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 w-full md:w-auto"
            >
              {/* Category tabs — mobile only */}
              <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar md:hidden">
                {OUTCOMES.map((item, i) => (
                  <button
                    key={item.category}
                    ref={(el) => { if (el && activeIdx === i) el.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' }) }}
                    onClick={() => scrollTo(i)}
                    className="relative flex flex-col items-start px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shrink-0"
                    style={{
                      background: activeIdx === i ? 'rgba(13,158,138,0.07)' : 'transparent',
                    }}
                  >
                    {/* Animated progress bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden"
                      style={{ background: 'rgba(0,0,0,0.06)' }}
                    >
                      {activeIdx === i && (
                        <div
                          key={activeIdx}
                          className="h-full rounded-full"
                          style={{
                            width: '100%',
                            background: T,
                            transformOrigin: 'left center',
                            animation: `scaleXIn ${AUTOPLAY_MS}ms linear forwards`,
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
                      style={{
                        letterSpacing: '0.02em',
                        color: activeIdx === i ? '#0d1117' : 'rgba(0,0,0,0.35)',
                      }}
                    >
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>

              {/* Arrows — mobile only */}
              <div className="flex gap-2 md:hidden">
                <button
                  onClick={onPrev}
                  disabled={!canPrev}
                  aria-label="Previous"
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: canPrev ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.07)',
                    color:       canPrev ? '#0d1117' : 'rgba(0,0,0,0.2)',
                    background:  'white',
                    cursor:      canPrev ? 'pointer' : 'default',
                    boxShadow:   canPrev ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={onNext}
                  disabled={!canNext}
                  aria-label="Next"
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: canNext ? T : 'rgba(0,0,0,0.07)',
                    color:       canNext ? 'white' : 'rgba(0,0,0,0.2)',
                    background:  canNext ? T : 'white',
                    cursor:      canNext ? 'pointer' : 'default',
                    boxShadow:   canNext ? `0 2px 12px rgba(13,158,138,0.28)` : 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom: embla carousel ── */}
        <div>
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex gap-5 pb-2 w-full">
              {OUTCOMES.map((item, i) => (
                <CarouselCard
                  key={item.category}
                  item={item}
                  index={i}
                  isActive={activeIdx === i}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

const PROBLEMS = [
  {
    num: '01',
    title: 'Design happens in isolation',
    impact: "Engineers don't know if designs are manufacturable or cost-optimal until RFQ stage.",
    workaround: 'Redesigns, delays, frustration',
  },
  {
    num: '02',
    title: 'Selection is guesswork',
    impact: 'No systematic way to evaluate capabilities, quality, or delivery risk.',
    workaround: 'Repeat business with familiar vendors, missed better options',
  },
  {
    num: '03',
    title: 'Manual costing kills speed',
    impact: 'Each RFQ requires days of Excel work, industry benchmarks, and supplier callbacks.',
    workaround: '3–4 week RFQ cycles becoming the norm',
  },
  {
    num: '04',
    title: 'No real-time visibility',
    impact: 'You learn about supply chain problems when they become crises.',
    workaround: 'Fire-fighting instead of forecasting',
  },
] as const

// ── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroAndProblem() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' })

  return (
    <>
      {/* ── Hero section ── */}
      <section
        aria-label="Why Teams Choose Emithran"
        className="relative overflow-hidden"
        style={{
          background: '#080808',
          paddingTop:    'clamp(6rem, 12vw, 10rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.028,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 40% at 18% 65%, rgba(45,212,191,0.055) 0%, transparent 70%)' }}
        />

        <div ref={heroRef} className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

            <div className="lg:col-span-8">
              <div className="overflow-hidden mb-6">
                <motion.p
                  initial={{ y: '110%' }}
                  animate={heroInView ? { y: '0%' } : {}}
                  transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                  className="font-mono text-[11px] tracking-[0.28em] uppercase"
                  style={{ color: T, margin: 0 }}
                >
                  The Manufacturing OS
                </motion.p>
              </div>

              <h1
                className="font-display font-bold uppercase tracking-tighter"
                style={{ fontSize: 'clamp(3.5rem, 8.5vw, 7.2rem)', lineHeight: 0.9, margin: 0 }}
              >
                {([
                  { text: 'Why Teams', color: '#ffffff' },
                  { text: 'Choose',    color: T         },
                  { text: 'Emithran.', color: '#ffffff' },
                ] as const).map(({ text, color }, i) => (
                  <div key={text} className="overflow-hidden">
                    <motion.span
                      initial={{ y: '110%' }}
                      animate={heroInView ? { y: '0%' } : {}}
                      transition={{ duration: 1.05, delay: 0.2 + i * 0.13, ease: EASE }}
                      className="block"
                      style={{ color }}
                    >
                      {text}
                    </motion.span>
                  </div>
                ))}
              </h1>
            </div>

            <motion.div
              className="lg:col-span-4 pb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.55, ease: EASE }}
            >
              <div className="lg:border-l lg:pl-8" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
                <p
                  className="font-display font-medium leading-tight mb-5 text-white"
                  style={{ fontSize: 'clamp(1.05rem, 1.55vw, 1.3rem)' }}
                >
                  The AI platform built for the realities of Indian manufacturing&mdash;not just theory.
                </p>
                <p
                  className="font-mono text-[13px] leading-relaxed mb-10"
                  style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.78 }}
                >
                  Every manufacturing decision leaves money on the table. Supplier selection costs 30% more than it should. Design cycles run weeks longer. Emithran rewires how your entire organization makes decisions together.
                </p>
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase font-bold transition-colors"
                  style={{ background: T, color: '#000000', padding: '15px 28px', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = T }}
                >
                  Request a Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </section>

      {/* ── Hidden Costs section ── */}
      <HiddenCosts />
    </>
  )
}

// ── Hidden Costs ──────────────────────────────────────────────────────────────

const DIVIDER = '1px solid rgba(255,255,255,0.09)'

function ProblemRow({ p, index }: { p: (typeof PROBLEMS)[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-32px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      className="group relative"
      style={{
        borderBottom: DIVIDER,
        paddingTop:    '3rem',
        paddingBottom: '3rem',
      }}
    >
      {/* Teal sweep line on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ background: T }}
      />

      <div className="flex gap-8 md:gap-10 items-start">

        {/* Number — small, monospace, barely there */}
        <span
          className="shrink-0 font-mono transition-colors duration-300 select-none"
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.28)',
            paddingTop: '0.45rem',
            width: '1.75rem',
          }}
        >
          {p.num}
        </span>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className="font-display font-semibold group-hover:translate-x-1 transition-transform duration-500"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.018em',
              color: '#ffffff',
              marginBottom: '1.25rem',
            }}
          >
            {p.title}
          </h3>

          {/* Impact / Workaround */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <p
                className="font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.22em', color: T, marginBottom: '0.45rem' }}
              >
                Impact
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)' }}>
                {p.impact}
              </p>
            </div>
            <div>
              <p
                className="font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.22em', color: T, marginBottom: '0.45rem' }}
              >
                Workaround
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)' }}>
                {p.workaround}
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

function HiddenCosts() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        background:    '#0c0c0c',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop:     '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: editorial sticky block ── */}
          <div className="relative">
            <div className="sticky top-32">
              <div ref={headRef}>

                {/* Eyebrow */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={headInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="font-mono uppercase"
                  style={{
                    fontSize: '9px',
                    letterSpacing: '0.28em',
                    color: T,
                    marginBottom: '2.75rem',
                  }}
                >
                  The problem space
                </motion.p>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={headInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                  className="tracking-tight"
                  style={{ fontFamily: 'var(--font-sora), Sora, ui-sans-serif, sans-serif', fontWeight: 700, lineHeight: 1.08, marginBottom: '3rem' }}
                >
                  <span
                    className="block"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                      color: 'rgba(255,255,255,0.85)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    THE HIDDEN
                  </span>
                  <span
                    className="block"
                    style={{
                      fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                      color: T,
                    }}
                  >
                    COSTS
                  </span>
                </motion.h2>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={headInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                  style={{
                    borderLeft: `2px solid ${T}`,
                    paddingLeft: '1.4rem',
                    maxWidth: '22rem',
                  }}
                >
                  <p
                    className="font-display"
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.68,
                      color: 'rgba(255,255,255,0.68)' }}
                  >
                    "You're running a 21st-century business on&nbsp;1990s tools."
                  </p>
                </motion.div>

              </div>
            </div>
          </div>

          {/* ── Right: problem rows ── */}
          <div style={{ borderTop: DIVIDER }}>
            {PROBLEMS.map((p, i) => (
              <ProblemRow key={p.num} p={p} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

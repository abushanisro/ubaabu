'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'
import HeroWave from './HeroWave'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const PROBLEMS = [
  {
    num: '01',
    title: 'Design happens in isolation',
    impact: "Engineers don't know if designs are manufacturable or cost-optimal until RFQ stage.",
    workaround: 'Redesigns, delays, frustration',
  }
  ,
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

// ── Pixel dissolve overlay ────────────────────────────────────────────────────

// ── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroAndProblem() {
  const heroRef        = useRef<HTMLDivElement>(null)
  const heroInView     = useInView(heroRef, { once: true, margin: '-60px' })
  const heroSectionRef = useRef<HTMLElement>(null)

  return (
    <>
      {/* ── Hero section ── */}
      <section
        ref={heroSectionRef}
        aria-label="Why Teams Choose Emithran"
        className="relative overflow-hidden bg-white"
      >
        {/* Animated ribbon background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <HeroWave className="absolute inset-0 h-full w-full" />
        </div>


        <div
          ref={heroRef}
          className="relative mx-auto max-w-[1200px] px-6 flex flex-col justify-center"
          style={{ paddingTop: 'clamp(4.5rem, 9vw, 7rem)', paddingBottom: 'clamp(3rem, 5vw, 4.5rem)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: headline + CTAs ── */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="text-[2.4rem] font-bold leading-[1.1] tracking-tight text-[#0f1b2d] md:text-[3rem] lg:text-[3.6rem]"
              >
                Design.{' '}
                <span className="text-[#2dd4bf]">Source.</span>{' '}
                Track.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
                className="mt-5 max-w-md text-[15px] leading-relaxed text-[#0f1b2d]/55"
              >
                Emithran is the AI platform built for Indian manufacturers — cutting design costs, compressing sourcing cycles, and giving you real-time supply chain visibility in one workspace.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2dd4bf] px-6 py-2.5 text-sm font-semibold text-[#0f1b2d] transition-all hover:-translate-y-px hover:bg-[#2dd4bf]/90"
                >
                  Request a Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-2.5 text-sm font-semibold text-[#0f1b2d] transition-all hover:border-[#0d9488]/50 hover:bg-black/[0.03]"
                >
                  See Case Studies
                </a>
              </motion.div>

              {/* Secondary callout card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                className="mt-8 inline-flex flex-col gap-1 rounded-2xl border border-black/[0.08] bg-[#f3f7f9] px-5 py-4"
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#2dd4bf]">For Manufacturing Teams</span>
                <p className="max-w-xs text-[13px] leading-snug text-[#0f1b2d]/55">
                  From design-to-cost to supplier tracking — built for OEMs, tier-1 and tier-2 manufacturers across India.
                </p>
                <a href="/solutions" className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium text-[#2dd4bf] hover:underline">
                  Explore solutions
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </motion.div>
            </div>

            {/* ── Right: floating platform preview card ── */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="hidden lg:flex flex-col gap-3"
            >
              {/* Top metric cards row */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Avg. cost reduction', value: '18%', sub: 'across active BOMs' },
                  { label: 'RFQ cycle time', value: '−62%', sub: 'vs. manual process' },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl border bg-white p-5" style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: 11, color: 'rgba(15,27,45,0.5)' }}>{m.label}</p>
                    <p className="mt-1 text-2xl font-bold" style={{ color: '#0d9488' }}>{m.value}</p>
                    <p style={{ fontSize: 11, color: 'rgba(15,27,45,0.45)' }}>{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Main platform preview card */}
              <div className="rounded-2xl border bg-white p-5" style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.06)' }}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold uppercase tracking-wider" style={{ fontSize: 11, color: 'rgba(15,27,45,0.5)' }}>Supplier Radar</span>
                  <span className="rounded-full px-2 py-0.5 font-medium" style={{ fontSize: 10, color: '#2dd4bf', background: 'rgba(45,212,191,0.12)' }}>Live</span>
                </div>
                {[
                  { name: 'Precision Parts Ltd.', score: 94, tag: 'Best match' },
                  { name: 'IndoForge Components', score: 87, tag: 'Shortlisted' },
                  { name: 'StellarCast Works',   score: 81, tag: 'Shortlisted' },
                ].map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                    <div>
                      <p className="font-medium" style={{ fontSize: 12, color: 'rgba(15,27,45,0.85)' }}>{s.name}</p>
                      <p style={{ fontSize: 10, color: 'rgba(15,27,45,0.45)' }}>{s.tag}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 overflow-hidden rounded-full" style={{ background: 'rgba(0,0,0,0.07)' }}>
                        <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: '#0d9488' }} />
                      </div>
                      <span className="w-7 text-right font-mono" style={{ fontSize: 11, color: '#0d9488' }}>{s.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom cost card */}
              <div className="rounded-2xl border bg-white px-5 py-4" style={{ borderColor: 'rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: 11, color: 'rgba(15,27,45,0.5)' }}>Should-cost estimate</p>
                    <p className="mt-0.5 text-xl font-bold" style={{ color: '#0f1b2d' }}>₹12.4L <span className="text-sm font-normal" style={{ color: 'rgba(15,27,45,0.45)' }}>/ assembly</span></p>
                  </div>
                  <span className="rounded-full px-3 py-1 font-semibold" style={{ fontSize: 11, color: '#10b981', background: 'rgba(16,185,129,0.12)' }}>−18% vs. quote</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Hidden Costs section ── */}
      <HiddenCosts />
    </>
  )
}

// ── Hidden Costs ──────────────────────────────────────────────────────────────

const DIVIDER = '1px solid rgba(0,0,0,0.08)'

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
        paddingTop:    '2rem',
        paddingBottom: '2rem',
      }}
    >
      {/* Teal sweep line on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ background: T }}
      />

      <div className="flex gap-8 md:gap-10 items-start">

        <span
          className="shrink-0 font-mono transition-colors duration-300 select-none"
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(0,0,0,0.25)',
            paddingTop: '0.45rem',
            width: '1.75rem',
          }}
        >
          {p.num}
        </span>

        <div className="flex-1 min-w-0">
          <h3
            className="font-display font-semibold group-hover:translate-x-1 transition-transform duration-500"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.018em',
              color: '#0d1117',
              marginBottom: '1.25rem',
            }}
          >
            {p.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <p
                className="font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.22em', color: T, marginBottom: '0.45rem' }}
              >
                Impact
              </p>
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(0,0,0,0.55)' }}>
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
              <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(0,0,0,0.55)' }}>
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
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section
      ref={sectionRef}
      style={{
        background:    '#fafafa',
        paddingTop:    'clamp(2rem, 4vw, 3.5rem)',
        paddingBottom: '0.5rem',
        borderTop:     '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: editorial sticky block ── */}
          <div className="relative">
            <div className="sticky top-32">
              <div ref={headRef}>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={headInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                  className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-5"
                >
                  The Hidden{' '}
                  <AnimatedText
                    text="Costs."
                    textClassName="text-gray-900 font-bold"
                    underlineColor="oklch(0.68 0.13 180)"
                    underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                    underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                    underlineDuration={1.8}
                  />
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={headInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                  style={{
                    borderLeft: `2px solid ${T}`,
                    paddingLeft: '1.4rem',
                    maxWidth: '22rem',
                    marginBottom: '2.5rem',
                  }}
                >
                  <p
                    className="font-display"
                    style={{ fontSize: '1.05rem', lineHeight: 1.68, color: 'rgba(0,0,0,0.6)' }}
                  >
                    "You're running a 21st-century business on&nbsp;1990s tools."
                  </p>
                </motion.div>

                {/* Parallax image */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={headInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
                  style={{ y: imgY }}
                  className="overflow-hidden rounded-2xl"
                >
                  <img
                    src="/assets/cards/why-emithran/hiddencost.png"
                    alt="Hidden manufacturing costs — quality vs cost"
                    className="object-cover w-full rounded-2xl block"
                    style={{ height: '420px', objectPosition: 'center' }}
                  />

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

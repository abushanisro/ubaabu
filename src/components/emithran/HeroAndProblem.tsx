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
          style={{ paddingTop: 'clamp(6rem, 11vw, 9rem)', paddingBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
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

            </div>

            {/* ── Right: dashboard preview images ── */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="hidden lg:flex items-center justify-center relative"
              style={{ perspective: '900px', paddingRight: '1.5rem' }}
            >
              <div
                style={{
                  transform: 'rotateX(8deg) rotateY(-18deg) skewY(1deg)',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  position: 'relative',
                  width: '100%',
                  maxWidth: 420,
                  paddingBottom: '30px',
                }}
              >
                {/* Image 1 — top */}
                <div
                  className="relative rounded-2xl overflow-hidden border"
                  style={{
                    borderColor: 'rgba(13,148,136,0.2)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(13,148,136,0.1)',
                    zIndex: 1,
                    marginBottom: '-40px',
                  }}
                >
                  <img
                    src="/videos/card/ChatGPT Image Jun 7, 2026, 04_37_08 AM.png"
                    alt="Emithran platform overview"
                    className="w-full h-auto block"
                  />
                </div>

                {/* Image 2 — below */}
                <div
                  className="relative rounded-2xl overflow-hidden border"
                  style={{
                    borderColor: 'rgba(0,0,0,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    zIndex: 0,
                    marginLeft: '24px',
                    marginTop: '-100px',
                  }}
                >
                  <img
                    src="/videos/card/ChatGPT Image Jun 7, 2026, 04_35_49 AM.png"
                    alt="Emithran dashboard"
                    className="w-full h-auto block"
                  />
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

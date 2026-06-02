'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

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

// ── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroAndProblem() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' })

  return (
    <>
      {/* ── Hero section ── */}
      <section
        aria-label="Why Teams Choose Emithran"
        className="relative overflow-hidden bg-white"
        style={{
          paddingTop:    'clamp(6rem, 12vw, 10rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        {/* Dot grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.7,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 40% at 18% 65%, rgba(13,158,138,0.06) 0%, transparent 70%)' }}
        />

        <div ref={heroRef} className="relative max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

            <div className="lg:col-span-8">
              {/* Chip label */}
              <div className="overflow-hidden mb-6">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={heroInView ? { y: '0%' } : {}}
                  transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
                  className="chip-light inline-block"
                >
                  The Manufacturing OS
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.6rem] font-bold leading-[1.25] tracking-tight text-gray-900"
              >
                Why teams{' '}
                <AnimatedText
                  text="choose Emithran."
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                <span className="font-normal text-gray-400">
                  The AI platform built for the realities of Indian manufacturing—not just theory.
                </span>
              </motion.p>
            </div>

            <motion.div
              className="lg:col-span-4 pb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.55, ease: EASE }}
            >
              <div className="lg:border-l lg:pl-8" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <p
                  className="text-[13px] leading-relaxed mb-8"
                  style={{ color: 'rgba(0,0,0,0.55)', lineHeight: 1.78 }}
                >
                  Every manufacturing decision leaves money on the table. Supplier selection costs 30% more than it should. Design cycles run weeks longer. Emithran rewires how your entire organization makes decisions together.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#demo"
                    className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))',
                      textDecoration: 'none',
                    }}
                  >
                    Request a Demo
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="/case-studies"
                    className="inline-flex items-center gap-2 rounded-md border border-black/15 px-5 py-2.5 text-sm font-semibold text-[#0d1117] hover:bg-black/[0.04] transition-colors"
                    style={{ textDecoration: 'none' }}
                  >
                    See Case Studies
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
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
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        background:    '#fafafa',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop:     '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: editorial sticky block ── */}
          <div className="relative">
            <div className="sticky top-32">
              <div ref={headRef}>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={headInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="chip-light inline-block mb-10"
                >
                  The Problem Space
                </motion.span>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={headInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
                  className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900 mb-12"
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
                  }}
                >
                  <p
                    className="font-display"
                    style={{ fontSize: '1.05rem', lineHeight: 1.68, color: 'rgba(0,0,0,0.6)' }}
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

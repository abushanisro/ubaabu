'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPARISON = [
  { label: 'Supplier quote',       value: '₹13,200', width: '88%',     bg: '#ffffff', delay: 0.35 },
  { label: 'Emithran should-cost', value: '₹11,200', width: '74.67%',  bg: T,         delay: 0.5  },
]

const DRIVERS = [
  { label: 'Material',  pct: '38%', h: '76%' },
  { label: 'Process',   pct: '27%', h: '54%' },
  { label: 'Margin',    pct: '22%', h: '44%' },
  { label: 'Logistics', pct: '13%', h: '26%' },
]

const STATS = [
  { value: '−80%',  label: 'RFQ eval time'         },
  { value: '99%',   label: 'Validation confidence' },
  { value: '₹5.0L', label: 'Savings / RFQ'         },
  { value: '0.0',   label: 'Vendor bias'            },
]

// Sparkline (viewBox "0 0 100 50") — last 12 RFQ savings
const SPARK =
  'M0,16.32 L9.09,19.68 L18.18,10 L27.27,20.53 L36.36,17.16 ' +
  'L45.45,22.63 L54.55,12.95 L63.64,24.74 L72.73,19.68 ' +
  'L81.82,26.84 L90.91,23.05 L100,28.95'
const SPARK_FILL = `${SPARK} L100,50 L0,50 Z`

// ── Component ─────────────────────────────────────────────────────────────────
export default function CostSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="cost"
      className="relative"
      style={{
        background:      '#070707',
        paddingTop:      'clamp(4rem, 8vw, 7rem)',
        paddingBottom:   'clamp(5rem, 10vw, 9rem)',
        borderTop:       '1px solid rgba(255,255,255,0.05)',
        scrollMarginTop: '160px',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">

          {/* ── LEFT: Sticky editorial ─────────────────────────────── */}
          <div className="md:col-span-5">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <div className="text-[11px] uppercase tracking-[0.3em]" style={{ color: T }}>
                  03 · Cost intelligence
                </div>

                <h2
                  className="em-text-gradient mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
                >
                  Negotiate with data, not instinct.
                </h2>

                <div className="mt-8 space-y-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      You get an RFQ. Is the quote fair? You don't know. Negotiation runs on
                      gut feel rather than benchmark.
                    </p>
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(45,212,191,0.8)' }}
                    >
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                      Live should-cost models trained on your supply chain — instant variance,
                      transparent drivers, supplier-neutral evidence.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Visuals ─────────────────────────────────────── */}
          <div className="md:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="em-glow-border em-glass overflow-hidden rounded-2xl p-6"
            >
              {/* Card header */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>Should-cost model · Part #A2310</span>
                <span className="em-teal-text">Quote +18% above should-cost</span>
              </div>

              {/* Horizontal comparison bars */}
              <div className="mt-6 space-y-5">
                {COMPARISON.map(({ label, value, width, bg, delay }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/70">{label}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full shadow-[0_0_20px_currentColor]"
                        style={{ background: bg }}
                        initial={{ width: 0 }}
                        animate={inView ? { width } : { width: 0 }}
                        transition={{ duration: 0.9, delay, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost variance drivers */}
              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Cost variance drivers
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {DRIVERS.map(({ label, pct, h }, i) => (
                    <div key={label}>
                      <div className="flex h-32 items-end overflow-hidden rounded-md bg-white/5">
                        <motion.div
                          className="w-full bg-gradient-to-t from-[var(--teal)]/30 to-[var(--teal)]"
                          style={{ height: h, transformOrigin: 'bottom' }}
                          initial={{ scaleY: 0 }}
                          animate={inView ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.75, delay: 0.62 + i * 0.1, ease: EASE }}
                        />
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-white/60">
                        <span>{label}</span>
                        <span>{pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sparkline: quote vs should-cost */}
              <div className="em-glass mt-8 rounded-xl p-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/40">
                  <span>Quote vs Should-cost · last 12 RFQs</span>
                  <span className="em-teal-text">−₹2.3 Cr saved</span>
                </div>
                <svg viewBox="0 0 100 50" className="mt-3 h-24 w-full">
                  <defs>
                    <linearGradient id="em-sg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%"   stopColor="rgb(45 212 191)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="rgb(45 212 191)" stopOpacity="0"   />
                    </linearGradient>
                  </defs>
                  {/* Filled area — fades in with card */}
                  <motion.path
                    d={SPARK_FILL}
                    fill="url(#em-sg)"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.85 }}
                  />
                  {/* Draw-on stroke line */}
                  <motion.path
                    d={SPARK}
                    fill="none"
                    stroke="rgb(45 212 191)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.68, ease: [0.4, 0, 0.2, 1] }}
                  />
                  {/* Pulsing endpoint dot — appears after line finishes drawing */}
                  {inView && (
                    <circle cx={100} cy={28.95} r="2" fill="rgb(45 212 191)" opacity="0">
                      <animate attributeName="opacity" values="0;0.9" dur="0.3s" begin="2.3s" fill="freeze" />
                      <animate attributeName="r"       values="2;4.5;2" dur="2.2s" begin="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.2s" begin="2.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                </svg>
              </div>
            </motion.div>

            {/* Stats + quote */}
            <div className="mt-10">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.38 + i * 0.08, ease: EASE }}
                    className="em-glass em-glow-border em-hover-lift rounded-xl p-4"
                  >
                    <div className="em-teal-text text-2xl font-semibold">{value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.figure
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
                className="em-glass mt-5 rounded-xl p-5"
              >
                <blockquote className="text-pretty text-sm leading-relaxed text-white/85">
                  "We finally negotiate from data. The should-cost model paid for the platform
                  in the first quarter alone."
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  — Defense contractor · 5,000+ part types annually
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

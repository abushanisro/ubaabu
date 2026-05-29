'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

// ── Data ──────────────────────────────────────────────────────────────────────
type StepState = 'done' | 'current' | 'pending'

const TIMELINE: { num: number; label: string; state: StepState }[] = [
  { num: 1, label: 'Sourced',    state: 'done'    },
  { num: 2, label: 'Tooling',    state: 'done'    },
  { num: 3, label: 'FAI',        state: 'done'    },
  { num: 4, label: 'Production', state: 'current' },
  { num: 5, label: 'QC',         state: 'pending' },
  { num: 6, label: 'Dispatch',   state: 'pending' },
]

const METRICS = [
  { label: 'Parts on track',  value: '184/192',       pct: '96%' },
  { label: 'Quality yield',   value: '99.2%',          pct: '99%' },
  { label: 'Budget consumed', value: '₹3.1Cr / ₹4Cr', pct: '78%' },
]

const ALERTS = [
  { color: 'rgb(252,211,77)', text: 'Supplier 17 utilization at 96%' },
  { color: T,                  text: 'QC batch #224 yield 99.8%'      },
  { color: T,                  text: 'Logistics ETA pulled in 2 days' },
]

const STATS = [
  { value: '100%', label: 'Project visibility' },
  { value: '+22%', label: 'On-time delivery'   },
  { value: '−85%', label: 'Surprises'          },
  { value: '−40%', label: 'Coordination'       },
]

// Step circle style per state
const stepStyle: Record<StepState, React.CSSProperties> = {
  done:    { background: T,                             color: '#000' },
  current: { border: `1px solid ${T}`,                 color: '#fff' },
  pending: { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' },
}

// Framer-motion: stagger timeline nodes
const stepContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const stepItem = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1,  transition: { duration: 0.38 } },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TrackingSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="tracking"
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
                  06 · Live project intelligence
                </div>

                <h2
                  className="em-text-gradient mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
                >
                  The status update, automated.
                </h2>

                <div className="mt-8 space-y-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      Project status depends on emails, spreadsheets and the loudest stakeholder.
                      By the time it's reported, it's stale.
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
                      Live project intelligence unifies supplier, quality and delivery signals
                      into a single source of truth.
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
              className="em-glow-border em-glass overflow-hidden rounded-2xl"
            >
              {/* Window chrome */}
              <div
                className="flex items-center justify-between border-b border-white/5 px-5 py-3
                           text-[10px] uppercase tracking-[0.18em] text-white/40"
              >
                <span>Project · NX-Engine-Mount · 12,400 units</span>
                <motion.span
                  className="em-teal-text"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ● healthy · 2 watch
                </motion.span>
              </div>

              {/* Timeline */}
              <div className="relative px-6 py-8">
                {/* Background track */}
                <div className="absolute left-6 right-6 top-1/2 h-px bg-white/10" />
                {/* Animated progress fill */}
                <motion.div
                  className="absolute left-6 top-1/2 h-px"
                  style={{ background: T, boxShadow: `0 0 18px ${T}` }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: '62%' } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.52, ease: EASE }}
                />
                {/* Step nodes */}
                <motion.div
                  className="relative grid grid-cols-6 gap-2"
                  variants={stepContainer}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {TIMELINE.map(({ num, label, state }) => (
                    <motion.div
                      key={num}
                      variants={stepItem}
                      className="flex flex-col items-center"
                    >
                      <div
                        className="relative grid h-7 w-7 place-items-center rounded-full
                                   text-[10px] font-semibold"
                        style={stepStyle[state]}
                      >
                        {state === 'current' && (
                          <span
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'rgba(45,212,191,0.4)',
                              animation:  'em-ping-ring 2s ease-out infinite',
                            }}
                          />
                        )}
                        {num}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Metric cards */}
              <div className="grid gap-3 border-t border-white/5 p-5 md:grid-cols-3">
                {METRICS.map(({ label, value, pct }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.72 + i * 0.09, ease: EASE }}
                    className="em-glass rounded-xl p-4"
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {label}
                    </div>
                    <div className="mt-1 text-lg font-semibold">{value}</div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="em-shimmer h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: pct } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.88 + i * 0.1, ease: EASE }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live alerts */}
              <div className="border-t border-white/5 p-5">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Live alerts
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  {ALERTS.map(({ color, text }, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.02 + i * 0.08, ease: EASE }}
                      className="flex items-center gap-3 rounded-lg border border-white/5
                                 bg-white/[0.02] px-3 py-2"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_10px_currentColor]"
                        style={{ background: color, color }}
                      />
                      <span className="text-white/80">{text}</span>
                    </motion.div>
                  ))}
                </div>
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
                  "50 projects, one screen. Our weekly review went from three hours to
                  thirty minutes."
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  — Automotive Tier-1 supplier · 50+ concurrent projects
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

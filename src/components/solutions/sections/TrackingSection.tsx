'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

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
  { color: 'rgb(202,130,0)',  text: 'Supplier 17 utilization at 96%' },
  { color: T,                  text: 'QC batch #224 yield 99.8%'      },
  { color: T,                  text: 'Logistics ETA pulled in 2 days' },
]

const STATS = [
  { value: '100%', label: 'Project visibility' },
  { value: '+22%', label: 'On-time delivery'   },
  { value: '−85%', label: 'Surprises'          },
  { value: '−40%', label: 'Coordination'       },
]

const stepStyle: Record<StepState, React.CSSProperties> = {
  done:    { background: T,                              color: '#fff' },
  current: { border: `1px solid ${T}`,                  color: '#fff' },
  pending: { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' },
}

const stepContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const stepItem = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1,  transition: { duration: 0.38 } },
}

export default function TrackingSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="tracking"
      className="relative"
      style={{
        background:      '#fafafa',
        paddingTop:      'clamp(4rem, 8vw, 7rem)',
        paddingBottom:   'clamp(5rem, 10vw, 9rem)',
        borderTop:       '1px solid rgba(0,0,0,0.06)',
        scrollMarginTop: '160px',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-12 md:grid-cols-12">

          {/* ── LEFT: Sticky editorial ── */}
          <div className="md:col-span-5">
            <div className="sticky top-40">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: T }}>
                  06 · Live project intelligence
                </div>
                <p className="mt-4 text-balance text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900">
                  The status update,{' '}
                  <AnimatedText
                    text="automated."
                    textClassName="text-gray-900 font-bold"
                    underlineColor="oklch(0.68 0.13 180)"
                    underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                    underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                    underlineDuration={1.8}
                  />
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/60">
                      Project status depends on emails, spreadsheets and the loudest stakeholder.
                      By the time it's reported, it's stale.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: T }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/75">
                      Live project intelligence unifies supplier, quality and delivery signals
                      into a single source of truth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Visuals ── */}
          <div className="md:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="overflow-hidden rounded-2xl"
              style={{
                background: 'rgba(13,17,23,0.97)',
                border: `1px solid rgba(13,158,138,0.2)`,
                boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
              }}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3
                             text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>Project · NX-Engine-Mount · 12,400 units</span>
                <motion.span
                  style={{ color: T }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ● healthy · 2 watch
                </motion.span>
              </div>

              {/* Timeline */}
              <div className="relative px-6 py-8">
                <div className="absolute left-6 right-6 top-1/2 h-px bg-white/10" />
                <motion.div
                  className="absolute left-6 top-1/2 h-px"
                  style={{ background: T, boxShadow: `0 0 18px ${T}` }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: '62%' } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.52, ease: EASE }}
                />
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
                              background: 'rgba(13,158,138,0.4)',
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
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</div>
                    <div className="mt-1 text-lg font-semibold text-white">{value}</div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: T }}
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
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">Live alerts</div>
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
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
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
                    className="rounded-xl border border-black/8 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="font-display text-2xl font-semibold" style={{ color: T }}>{value}</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.figure
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
                className="mt-5 rounded-xl border border-black/8 bg-white p-5"
              >
                <blockquote className="font-display text-pretty text-sm leading-relaxed text-black/70">
                  "50 projects, one screen. Our weekly review went from three hours to
                  thirty minutes."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
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

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Boxes, Target } from 'lucide-react'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

// ── Data ──────────────────────────────────────────────────────────────────────

// Dashed lines radiating from center hub (SVG viewBox "0 0 100 80")
const SVG_LINES = [
  { x2: 18, y2: 28, opacity: 0.47,  delay: 0   },
  { x2: 76, y2: 22, opacity: 0.455, delay: 0.1 },
  { x2: 30, y2: 70, opacity: 0.44,  delay: 0.2 },
  { x2: 70, y2: 76, opacity: 0.43,  delay: 0.3 },
  { x2: 55, y2: 18, opacity: 0.415, delay: 0.4 },
  { x2: 12, y2: 55, opacity: 0.4,   delay: 0.5 },
  { x2: 88, y2: 52, opacity: 0.395, delay: 0.6 },
  { x2: 50, y2: 92, opacity: 0.385, delay: 0.7 },
  { x2: 38, y2: 40, opacity: 0.36,  delay: 0.8 },
  { x2: 62, y2: 60, opacity: 0.34,  delay: 0.9 },
]

// Named teal supplier nodes
const TEAL_NODES = [
  { left: '18%', top: '37.4%', name: 'Astra Precision', score: 94 },
  { left: '76%', top: '32.6%', name: 'Helix Forge',     score: 91 },
  { left: '30%', top: '71%',   name: 'NovaCast',         score: 88 },
  { left: '70%', top: '75.8%', name: 'MetricWorks',      score: 86 },
]

// Unnamed dim nodes
const DIM_NODES = [
  { left: '55%', top: '29.4%' },
  { left: '12%', top: '59%'   },
  { left: '88%', top: '56.6%' },
  { left: '50%', top: '88.6%' },
  { left: '38%', top: '47%'   },
  { left: '62%', top: '63%'   },
]

const RANKING = [
  { name: 'Astra Precision', score: 94 },
  { name: 'Helix Forge',     score: 91 },
  { name: 'NovaCast',         score: 88 },
  { name: 'MetricWorks',      score: 86 },
]

const STATS = [
  { value: '−75%', label: 'Evaluation time'    },
  { value: '+22%', label: 'Quality consistency' },
  { value: '300%', label: 'New suppliers'       },
  { value: '+18%', label: 'RFQ quality'         },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function SupplierSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="supplier"
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
                  02 · Supplier intelligence
                </div>

                <h2
                  className="em-text-gradient mt-4 text-balance font-semibold leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
                >
                  Find the right supplier — not just the familiar one.
                </h2>

                <div className="mt-8 space-y-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      You know 200 suppliers. You evaluate 50. You quote 3–5. The process is
                      manual, biased and slow. Better suppliers exist — you just don't know them.
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
                      Continuous, systematic supplier intelligence that learns your requirements
                      and ranks 1,000+ suppliers in seconds.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: Visuals ─────────────────────────────────────── */}
          <div className="md:col-span-7">

            {/* Network visualization card */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="em-glow-border em-glass relative h-[520px] overflow-hidden rounded-2xl"
            >
              {/* Window chrome */}
              <div
                className="flex items-center justify-between border-b border-white/5 px-5 py-3
                           text-[10px] uppercase tracking-[0.18em] text-white/40"
              >
                <span>RFQ-4821 · CNC bracket · qty 12,000</span>
                <span className="em-teal-text">● matching 1,284 suppliers</span>
              </div>

              {/* Dashed radial lines */}
              <svg viewBox="0 0 100 80" className="absolute inset-0 mt-10 h-full w-full">
                {SVG_LINES.map(({ x2, y2, opacity, delay }, i) => (
                  <line
                    key={i}
                    x1="50" y1="42"
                    x2={x2} y2={y2}
                    stroke="rgb(45 212 191)"
                    strokeOpacity={opacity}
                    strokeWidth="0.2"
                    strokeDasharray="3 2"
                    style={inView ? {
                      animation: `em-dash 2.4s ${delay}s linear forwards`,
                      strokeDashoffset: 100,
                    } : { strokeDashoffset: 100 }}
                  />
                ))}

                {/* Data-flow particles — travel from hub to each supplier after lines draw */}
                {inView && SVG_LINES.map(({ x2, y2 }, i) => (
                  <circle key={`fp-${i}`} r="1.3" fill={T}>
                    <animateMotion
                      dur="1.9s"
                      begin={`${1.8 + i * 0.26}s`}
                      repeatCount="indefinite"
                      path={`M50,42 L${x2},${y2}`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.85;0.85;0"
                      keyTimes="0;0.12;0.76;1"
                      dur="1.9s"
                      begin={`${1.8 + i * 0.26}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </svg>

              {/* Center hub */}
              <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="em-glass em-glow-border flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]">
                    <Boxes className="em-teal-text h-3.5 w-3.5" aria-hidden />
                    Your RFQ
                  </div>
                  {/* Ambient glow */}
                  <span
                    className="em-pulse absolute left-1/2 top-1/2 -z-10 h-16 w-16
                               -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                    style={{ background: `rgba(45,212,191,0.4)` }}
                  />
                </div>
              </div>

              {/* Named teal supplier nodes */}
              {TEAL_NODES.map(({ left, top, name, score }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: EASE }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top }}
                >
                  <div className="group relative">
                    {/* Node dot — glow pulse with staggered phase per supplier */}
                    <motion.div
                      className="h-3 w-3 rounded-full"
                      style={{ background: T }}
                      animate={{ boxShadow: [`0 0 8px ${T}`, `0 0 22px ${T}cc`, `0 0 8px ${T}`] }}
                      transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.55 }}
                    />
                    {/* Hover tooltip */}
                    <div
                      className="em-glass pointer-events-none absolute left-4 top-1/2 z-10
                                 -translate-y-1/2 whitespace-nowrap rounded-md px-2 py-1
                                 text-[10px] opacity-0 transition group-hover:opacity-100"
                    >
                      {name} · {score}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Unnamed dim nodes */}
              {DIM_NODES.map(({ left, top }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.07 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top }}
                >
                  <div className="h-3 w-3 rounded-full bg-white/70" />
                </motion.div>
              ))}

              {/* Ranking sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.9, ease: EASE }}
                className="absolute right-4 top-14 w-[210px] space-y-1.5"
              >
                {RANKING.map(({ name, score }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.95 + i * 0.08, ease: EASE }}
                    className="em-glass flex items-center justify-between rounded-md px-2.5 py-1.5 text-[11px]"
                  >
                    <span className="truncate">{name} · {score}</span>
                    <Target className="em-teal-text h-3 w-3 shrink-0" aria-hidden />
                  </motion.div>
                ))}
              </motion.div>

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
                  "Before Emithran, each buyer maintained separate supplier lists. Now we have
                  one intelligent system with standardized pricing and better supplier scores."
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  — ₹500Cr+ engineering firm · 5 procurement officers
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

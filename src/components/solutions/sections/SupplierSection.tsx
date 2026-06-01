'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Boxes, Target } from 'lucide-react'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

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

const TEAL_NODES = [
  { left: '18%', top: '37.4%', name: 'Astra Precision', score: 94 },
  { left: '76%', top: '32.6%', name: 'Helix Forge',     score: 91 },
  { left: '30%', top: '71%',   name: 'NovaCast',         score: 88 },
  { left: '70%', top: '75.8%', name: 'MetricWorks',      score: 86 },
]

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

export default function SupplierSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="supplier"
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
                  02 · Supplier intelligence
                </div>
                <p className="mt-4 text-balance text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900">
                  Find the{' '}
                  <AnimatedText
                    text="right supplier"
                    textClassName="text-gray-900 font-bold"
                    underlineColor="oklch(0.68 0.13 180)"
                    underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                    underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                    underlineDuration={1.8}
                  />
                  {' '}— not just the familiar one.
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/60">
                      You know 200 suppliers. You evaluate 50. You quote 3–5. The process is
                      manual, biased and slow. Better suppliers exist — you just don't know them.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: T }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/75">
                      Continuous, systematic supplier intelligence that learns your requirements
                      and ranks 1,000+ suppliers in seconds.
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
              className="relative h-[520px] overflow-hidden rounded-2xl"
              style={{
                background: 'rgba(13,17,23,0.97)',
                border: `1px solid rgba(13,158,138,0.2)`,
                boxShadow: '0 24px 60px rgba(0,0,0,0.12)',
              }}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3
                             text-[10px] uppercase tracking-[0.18em] text-white/40">
                <span>RFQ-4821 · CNC bracket · qty 12,000</span>
                <span style={{ color: T }}>● matching 1,284 suppliers</span>
              </div>

              <svg viewBox="0 0 100 80" className="absolute inset-0 mt-10 h-full w-full">
                {SVG_LINES.map(({ x2, y2, opacity, delay }, i) => (
                  <line
                    key={i}
                    x1="50" y1="42"
                    x2={x2} y2={y2}
                    stroke={T}
                    strokeOpacity={opacity}
                    strokeWidth="0.2"
                    strokeDasharray="3 2"
                    style={inView ? {
                      animation: `em-dash 2.4s ${delay}s linear forwards`,
                      strokeDashoffset: 100,
                    } : { strokeDashoffset: 100 }}
                  />
                ))}
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
                  <div
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-white"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: `1px solid rgba(13,158,138,0.4)`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Boxes className="h-3.5 w-3.5" style={{ color: T }} aria-hidden />
                    Your RFQ
                  </div>
                  <span
                    className="absolute left-1/2 top-1/2 -z-10 h-16 w-16
                               -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                    style={{ background: `rgba(13,158,138,0.3)` }}
                  />
                </div>
              </div>

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
                    <motion.div
                      className="h-3 w-3 rounded-full"
                      style={{ background: T }}
                      animate={{ boxShadow: [`0 0 8px ${T}`, `0 0 22px ${T}cc`, `0 0 8px ${T}`] }}
                      transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.55 }}
                    />
                    <div
                      className="pointer-events-none absolute left-4 top-1/2 z-10
                                 -translate-y-1/2 whitespace-nowrap rounded-md px-2 py-1
                                 text-[10px] text-white opacity-0 transition group-hover:opacity-100"
                      style={{ background: 'rgba(13,17,23,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {name} · {score}
                    </div>
                  </div>
                </motion.div>
              ))}

              {DIM_NODES.map(({ left, top }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.07 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top }}
                >
                  <div className="h-3 w-3 rounded-full bg-white/50" />
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
                    className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-[11px] text-white"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="truncate">{name} · {score}</span>
                    <Target className="h-3 w-3 shrink-0" style={{ color: T }} aria-hidden />
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
                  "Before Emithran, each buyer maintained separate supplier lists. Now we have
                  one intelligent system with standardized pricing and better supplier scores."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
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

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
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src="/assets/cards/solution/card/supler.png"
                alt="Supplier network"
                className="w-full"
              />
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

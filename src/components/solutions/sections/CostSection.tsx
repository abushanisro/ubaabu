'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const COMPARISON = [
  { label: 'Supplier quote',       value: '$159',    width: '88%',     bg: '#0d1117', delay: 0.35 },
  { label: 'Emithran should-cost', value: '$135',    width: '74.67%',  bg: T,         delay: 0.5  },
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
  { value: '$6K',   label: 'Savings / RFQ'         },
  { value: '0.0',   label: 'Vendor bias'            },
]

const SPARK =
  'M0,16.32 L9.09,19.68 L18.18,10 L27.27,20.53 L36.36,17.16 ' +
  'L45.45,22.63 L54.55,12.95 L63.64,24.74 L72.73,19.68 ' +
  'L81.82,26.84 L90.91,23.05 L100,28.95'
const SPARK_FILL = `${SPARK} L100,50 L0,50 Z`

export default function CostSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="cost"
      className="relative bg-white"
      style={{
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
                  03 · Cost intelligence
                </div>
                <p className="mt-4 text-balance text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900">
                  Negotiate with{' '}
                  <AnimatedText
                    text="data,"
                    textClassName="text-gray-900 font-bold"
                    underlineColor="oklch(0.68 0.13 180)"
                    underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                    underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                    underlineDuration={1.8}
                  />
                  {' '}not instinct.
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                      The problem
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/60">
                      You get an RFQ. Is the quote fair? You don't know. Negotiation runs on
                      gut feel rather than benchmark.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: T }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/75">
                      Live should-cost models trained on your supply chain - instant variance,
                      transparent drivers, supplier-neutral evidence.
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
                src="/assets/cards/solution/card/cost.png"
                alt="Cost intelligence card"
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
                className="mt-5 rounded-xl border border-black/8 bg-[#fafafa] p-5"
              >
                <blockquote className="font-display text-pretty text-sm leading-relaxed text-black/70">
                  "We finally negotiate from data. The should-cost model paid for the platform
                  in the first quarter alone."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
                  - Defense contractor · 5,000+ part types annually
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

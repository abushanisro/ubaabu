'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const STATS = [
  { value: '−40%',  label: 'Design cycle time' },
  { value: '−85%',  label: 'Cost surprises'    },
  { value: '−3.0w', label: 'Lead time'         },
  { value: '99%',   label: 'First-pass DFM'    },
]

const ANNOTATIONS = [
  {
    pos:     { top: '18%', left: '8%' },
    border:  'rgba(252,211,77,0.5)',
    color:   'rgb(202,158,30)',
    label:   'Tolerance H7',
    body:    '40% costlier with Indian suppliers — optimize?',
    delay:   0.55,
    floatY:  -8,
    floatDur: 4.2,
    floatDelay: 0.9,
  },
  {
    pos:     { top: '55%', right: '6%' },
    border:  `rgba(13,158,138,0.6)`,
    color:   T,
    label:   'Material Ti-6Al-4V',
    body:    '3-week lead time. 2 alternatives ≤7 days.',
    delay:   0.72,
    floatY:  -10,
    floatDur: 5.6,
    floatDelay: 1.6,
  },
  {
    pos:     { bottom: '12%', left: '12%' },
    border:  'rgba(13,158,138,0.4)',
    color:   '#0d7a6a',
    label:   'Should-cost',
    body:    '₹4,820 / unit · benchmark across 72K data points',
    delay:   0.88,
    floatY:  -7,
    floatDur: 4.9,
    floatDelay: 1.2,
  },
]

export default function DesignSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="design"
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
                  01 · Design intelligence
                </div>
                <p className="mt-4 text-balance text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900">
                  Design with the{' '}
                  <AnimatedText
                    text="supply chain built in."
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
                      Design teams decide without supply chain input. Cost and manufacturability
                      surprises emerge after design lock. Every redesign costs time and money.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: T }}>
                      Emithran approach
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-black/75">
                      Embed manufacturing and supplier intelligence directly into the design
                      process — real-time, in the CAD.
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
                src="/assets/cards/solution/card/design.png"
                alt="Design intelligence card"
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
                  "Our design team used to learn about manufacturing constraints from rejection
                  emails. Now they design with them built in. Saves us 15 days per product cycle."
                </blockquote>
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
                  — Aerospace component manufacturer
                </figcaption>
              </motion.figure>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

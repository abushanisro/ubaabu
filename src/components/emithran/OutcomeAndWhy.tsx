'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
const EASE = [0.16, 1, 0.3, 1] as const

const OUTCOMES = [
  {
    category: 'Procurement',
    metric:   '80% Time Saved',
    before:   '"40 hours per RFQ coordinating."',
    after:    '"8 hours on strategy."',
  },
  {
    category: 'Engineering',
    metric:   '40% Faster Cycles',
    before:   '"Designs thrown back after RFQ."',
    after:    '"DFM feedback inside CAD."',
  },
  {
    category: 'Leadership',
    metric:   '99.4% Accuracy',
    before:   '"Forecasts are always wrong."',
    after:    '"Live visibility into capacity."',
  },
] as const

function OutcomeRow({
  item,
  index,
}: {
  item: (typeof OUTCOMES)[number]
  index: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-0 pb-16"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
    >
      {/* ── Left: category + metric ── */}
      <div className="lg:w-1/4">
        <h3
          className="font-display font-bold uppercase"
          style={{ fontSize: '1.5rem', letterSpacing: '0.08em', color: '#0d1117' }}
        >
          {item.category}
        </h3>
        <p
          className="font-display font-bold"
          style={{ color: T, marginTop: '1rem', fontSize: '1.25rem' }}
        >
          {item.metric}
        </p>
      </div>

      {/* ── Right: before / after ── */}
      <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Before */}
        <div className="relative rounded-xl border border-black/8 bg-white p-6" style={{ paddingLeft: '1.5rem' }}>
          <p
            className="font-mono uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.22em',
              color: 'rgba(0,0,0,0.35)',
              marginBottom: '1rem',
            }}
          >
            Before
          </p>
          <p
            className="font-display font-medium tracking-tight"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.6rem)',
              color: 'rgba(0,0,0,0.35)',
              lineHeight: 1.3,
            }}
          >
            {item.before}
          </p>
        </div>

        {/* After */}
        <div
          className="relative rounded-xl p-6"
          style={{
            background: 'linear-gradient(135deg, oklch(0.68 0.13 180 / 0.08), oklch(0.55 0.16 185 / 0.05))',
            border: `1px solid ${T}33`,
          }}
        >
          <p
            className="font-mono uppercase"
            style={{
              fontSize: '9px',
              letterSpacing: '0.22em',
              color: T,
              marginBottom: '1rem',
            }}
          >
            After
          </p>
          <p
            className="font-display font-medium tracking-tight"
            style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.6rem)',
              color: '#0d1117',
              lineHeight: 1.3,
            }}
          >
            {item.after}
          </p>
        </div>

      </div>
    </motion.div>
  )
}

export default function OutcomeAndWhy() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      className="bg-white"
      style={{
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Heading ── */}
        <div ref={headRef} style={{ marginBottom: '6rem' }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="chip-light inline-block mb-6"
          >
            Outcomes
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900"
          >
            Perfect{' '}
            <AnimatedText
              text="Information."
              textClassName="text-gray-900 font-bold"
              underlineColor="oklch(0.68 0.13 180)"
              underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
              underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
              underlineDuration={1.8}
            />
          </motion.p>
        </div>

        {/* ── Outcome rows ── */}
        <div className="space-y-16">
          {OUTCOMES.map((item, i) => (
            <OutcomeRow key={item.category} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

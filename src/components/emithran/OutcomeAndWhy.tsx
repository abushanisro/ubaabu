'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
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
      style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
    >
      {/* ── Left: category + metric ── */}
      <div className="lg:w-1/4">
        <h3
          className="font-display font-bold uppercase"
          style={{ fontSize: '1.5rem', letterSpacing: '0.08em', color: '#ffffff' }}
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
        <div className="relative" style={{ paddingLeft: '1.25rem' }}>
          <div
            className="absolute top-0 left-0 w-[3px] h-full"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          />
          <p
            className="font-display font-bold uppercase"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '1rem',
            }}
          >
            Before
          </p>
          <p
            className="font-display font-medium tracking-tight"
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.875rem)',
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.25,
            }}
          >
            {item.before}
          </p>
        </div>

        {/* After */}
        <div className="relative" style={{ paddingLeft: '1.25rem' }}>
          <div
            className="absolute top-0 left-0 w-[3px] h-full"
            style={{ background: T }}
          />
          <p
            className="font-display font-bold uppercase"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: T,
              marginBottom: '1rem',
            }}
          >
            After
          </p>
          <p
            className="font-display font-medium tracking-tight"
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.875rem)',
              color: '#ffffff',
              lineHeight: 1.25,
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
      style={{
        background: '#080808',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-24">

        {/* ── Heading ── */}
        <div ref={headRef} style={{ marginBottom: '6rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="font-display font-bold tracking-tighter uppercase"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 0.9, color: '#ffffff' }}
          >
            Perfect
            <br />
            <span style={{ color: T }}>Information.</span>
          </motion.h2>
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

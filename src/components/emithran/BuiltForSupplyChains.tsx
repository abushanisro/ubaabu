'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

const INDUSTRIES = [
  {
    name: 'Aerospace & Defense OEMs',
    desc: 'Certified tracking, AS9100D compliance automation, predictive capacity.',
  },
  {
    name: 'Large Engineering Companies',
    desc: 'Unified supplier intelligence, benchmarking, cross-project optimization.',
  },
  {
    name: 'Deep-Tech Startups',
    desc: 'Automated DFM analysis, rapid supplier vetting, cost simulation.',
  },
] as const

function IndustryRow({
  item,
  index,
  isLast,
}: {
  item: (typeof INDUSTRIES)[number]
  index: number
  isLast: boolean
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="group flex flex-col md:flex-row md:items-center md:justify-between md:gap-12 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.03)] -mx-6 px-6 lg:-mx-10 lg:px-10"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.09)',
        borderBottom: isLast ? '1px solid rgba(255,255,255,0.09)' : 'none',
        paddingTop: '2.25rem',
        paddingBottom: '2.25rem',
        gap: '1rem',
      }}
    >
      <h3
        className="font-display font-bold text-white group-hover:text-[#2dd4bf] transition-colors duration-200"
        style={{
          fontSize: '1.25rem',
          letterSpacing: '-0.02em',
          flex: '0 0 auto',
          maxWidth: '26rem',
        }}
      >
        {item.name}
      </h3>

      <p
        className="text-white/40 group-hover:text-white/70 transition-colors duration-200"
        style={{
          fontSize: '15px',
          lineHeight: 1.72,
          maxWidth: '34rem',
        }}
      >
        {item.desc}
      </p>
    </motion.div>
  )
}

export default function BuiltForSupplyChains() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        background: '#0c0c0c',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Heading ── */}
        <div ref={headRef} style={{ marginBottom: '4rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="font-display font-bold tracking-tighter uppercase"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.92, color: '#ffffff' }}
          >
            Built for{' '}
            <span style={{ color: T }}>Complex</span>
            <br />
            Supply Chains
          </motion.h2>
        </div>

        {/* ── Industry rows ── */}
        <div>
          {INDUSTRIES.map((item, i) => (
            <IndustryRow
              key={item.name}
              item={item}
              index={i}
              isLast={i === INDUSTRIES.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

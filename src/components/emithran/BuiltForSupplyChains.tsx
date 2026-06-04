'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
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
      className="group flex flex-col md:flex-row md:items-center md:justify-between md:gap-12 hover:bg-black/[0.02] -mx-6 px-6 transition-colors duration-200"
      style={{
        borderTop: '1px solid rgba(0,0,0,0.08)',
        borderBottom: isLast ? '1px solid rgba(0,0,0,0.08)' : 'none',
        paddingTop: '2.25rem',
        paddingBottom: '2.25rem',
      }}
    >
      <h3
        className="font-display font-bold group-hover:text-[#0d9e8a] transition-colors duration-200"
        style={{
          fontSize: '1.25rem',
          letterSpacing: '-0.02em',
          color: '#0d1117',
          flex: '0 0 auto',
          maxWidth: '26rem',
        }}
      >
        {item.name}
      </h3>

      <p
        className="text-black/45 group-hover:text-black/65 transition-colors duration-200"
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
        background: '#fafafa',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Heading ── */}
        <div ref={headRef} style={{ marginBottom: '4rem' }}>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900"
          >
            Built for{' '}
            <AnimatedText
              text="Complex Supply Chains."
              textClassName="text-gray-900 font-bold"
              underlineColor="oklch(0.68 0.13 180)"
              underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
              underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
              underlineDuration={1.8}
            />
          </motion.p>
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

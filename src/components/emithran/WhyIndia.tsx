'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

const REASONS = [
  {
    num:   '01',
    title: 'India-Native Supply Chain Data',
    body:  'Traditional platforms train on Western manufacturing systems. Emithran learns from 80+ Indian manufacturing regions.',
  },
  {
    num:   '02',
    title: 'VAVE + AI Integration',
    body:  'Value Analysis/Value Engineering built into the core system.',
  },
  {
    num:   '03',
    title: 'Supplier Ecosystem First',
    body:  'A two-sided intelligence ecosystem for OEMs and suppliers.',
  },
  {
    num:   '04',
    title: 'Regulatory Reality',
    body:  'AS9100D, GST, export norms, geopolitical supply chain risks built into recommendations.',
  },
] as const

function ReasonCard({ item, index }: { item: (typeof REASONS)[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="relative"
    >
      <p
        className="font-mono"
        style={{ color: T, fontSize: '13px', letterSpacing: '0.18em', marginBottom: '1rem' }}
      >
        {item.num}
      </p>
      <h3
        className="font-display font-bold"
        style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}
      >
        {item.title}
      </h3>
      <p
        className="font-display leading-relaxed"
        style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
      >
        {item.body}
      </p>
    </motion.div>
  )
}

export default function WhyIndia() {
  const headRef    = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const quoteRef   = useRef<HTMLDivElement>(null)
  const quoteInView = useInView(quoteRef, { once: true, margin: '-40px' })

  return (
    <section
      style={{
        background: '#0c0c0c',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* ── Left: sticky heading ── */}
          <div ref={headRef} className="relative">
            <div className="sticky" style={{ top: '8rem' }}>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE }}
                className="font-display font-bold tracking-tighter uppercase"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  lineHeight: 0.9,
                  color: '#ffffff',
                }}
              >
                Why Built
                <br />
                For <span style={{ color: T }}>India</span>
                <br />
                Changes
                <br />
                Everything.
              </motion.h2>
            </div>
          </div>

          {/* ── Right: reason cards + quote ── */}
          <div className="space-y-16">
            {REASONS.map((item, i) => (
              <ReasonCard key={item.num} item={item} index={i} />
            ))}

            {/* Closing quote */}
            <motion.div
              ref={quoteRef}
              initial={{ opacity: 0 }}
              animate={quoteInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                paddingTop: '4rem',
                marginTop: '4rem',
                borderTop: '1px solid rgba(255,255,255,0.20)',
              }}
            >
              <p
                className="font-display font-medium leading-relaxed"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  color: 'rgba(255,255,255,0.78)',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;Emithran is built by people who&rsquo;ve managed procurement crises in Indian manufacturing. We know where the real problems are.&rdquo;
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

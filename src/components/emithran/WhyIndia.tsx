'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
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
      className="relative rounded-2xl border border-black/8 bg-white p-7 shadow-sm"
    >
      <p
        className="font-mono"
        style={{ color: T, fontSize: '13px', letterSpacing: '0.18em', marginBottom: '1rem' }}
      >
        {item.num}
      </p>
      <h3
        className="font-display font-bold"
        style={{ fontSize: '1.5rem', color: '#0d1117', marginBottom: '0.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}
      >
        {item.title}
      </h3>
      <p
        className="leading-relaxed"
        style={{ fontSize: '15px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}
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
        background: '#fafafa',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Left: sticky heading ── */}
          <div ref={headRef} className="relative">
            <div className="sticky" style={{ top: '8rem' }}>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE }}
                className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.25] tracking-tight text-gray-900"
              >
                Why built for{' '}
                <AnimatedText
                  text="India"
                  textClassName="text-gray-900 font-bold"
                  underlineColor="oklch(0.68 0.13 180)"
                  underlinePath="M 0,10 Q 75,2 150,10 Q 225,18 300,10"
                  underlineHoverPath="M 0,10 Q 75,18 150,10 Q 225,2 300,10"
                  underlineDuration={1.8}
                />{' '}
                changes everything.
              </motion.p>

              {/* Quote */}
              <motion.div
                ref={quoteRef}
                initial={{ opacity: 0 }}
                animate={quoteInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: EASE }}
                style={{
                  paddingTop: '3rem',
                  marginTop: '3rem',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <p
                  className="font-display font-medium leading-relaxed"
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                    color: 'rgba(0,0,0,0.6)',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;Emithran is built by people who&rsquo;ve managed procurement crises in Indian manufacturing. We know where the real problems are.&rdquo;
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Right: reason cards ── */}
          <div className="space-y-5">
            {REASONS.map((item, i) => (
              <ReasonCard key={item.num} item={item} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

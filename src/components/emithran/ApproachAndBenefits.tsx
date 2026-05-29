'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const T    = '#2dd4bf'
const EASE = [0.16, 1, 0.3, 1] as const

const PILLARS = [
  {
    roman: 'I',
    title: 'Live Cost Intelligence',
    body:  'Real-time should-cost models powered by 72,000+ supplier data points across 80+ Indian manufacturing regions. Know what a part should cost before you send an RFQ. Baseline negotiations with data, not hope.',
  },
  {
    roman: 'II',
    title: 'Design-to-Supply Integration',
    body:  'DFM feedback while designs are still fluid. Supplier capability mapping built directly into CAD workflows. See manufacturability issues and cost optimization opportunities in days, not weeks.',
  },
  {
    roman: 'III',
    title: 'Supplier Ecosystem Intelligence',
    body:  'Continuous evaluation of 1,000+ suppliers across quality, capacity, delivery, and capability metrics. Real-time supplier shortlist matching for every part.',
  },
] as const

// ── Pillar card ───────────────────────────────────────────────────────────────

function PillarCard({ item, index }: { item: (typeof PILLARS)[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="relative group"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Background roman numeral */}
      <div
        className="absolute -top-10 -left-3 font-display font-bold pointer-events-none select-none leading-none transition-colors duration-500"
        style={{
          fontSize: '6rem',
          color: hov ? `rgba(45,212,191,0.08)` : 'rgba(255,255,255,0.04)',
        }}
      >
        {item.roman}
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-2xl mb-5 relative z-10 transition-colors duration-300"
        style={{ color: hov ? T : '#ffffff', letterSpacing: '-0.02em' }}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        className="relative z-10 leading-relaxed"
        style={{ fontSize: '15px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.75 }}
      >
        {item.body}
      </p>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function ApproachAndBenefits() {
  const headerRef    = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const ctaRef       = useRef<HTMLDivElement>(null)
  const ctaInView    = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        background: '#080808',
        paddingTop:    'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="font-display font-bold tracking-tighter uppercase"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 0.92, color: '#ffffff' }}
          >
            Intelligence at <br />
            Every Decision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            style={{
              fontSize: '1.1rem',
              maxWidth: '22rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.65,
              flexShrink: 0,
            }}
          >
            A unified architecture replacing fragmented manual processes.
          </motion.p>
        </div>

        {/* ── Three pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 pt-4">
          {PILLARS.map((item, i) => (
            <PillarCard key={item.roman} item={item} index={i} />
          ))}
        </div>

      </div>

      {/* ── Impact / CTA block — contained teal box ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 24 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col md:flex-row items-center justify-between gap-12"
        style={{
          background: T,
          color: '#080808',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem)',
          borderRadius: '1rem',
        }}
      >
        <p
          className="font-display font-medium leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
            maxWidth: '52rem',
            color: '#080808',
          }}
        >
          &ldquo;Teams using Emithran cut RFQ cycles by 40%, improve BOM accuracy to 99.4%, and identify &#8377;1.2Cr+ in annual savings.&rdquo;
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96" height="96"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 opacity-25"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </motion.div>
      </div>
    </section>
  )
}

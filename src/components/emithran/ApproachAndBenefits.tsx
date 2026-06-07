'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

const T    = '#0d9e8a'
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
      className="relative group rounded-2xl border border-black/8 bg-white p-8 shadow-sm"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Background roman numeral — increased opacity */}
      <div
        className="absolute -top-6 -left-2 font-display font-bold pointer-events-none select-none leading-none transition-colors duration-500"
        style={{
          fontSize: '5rem',
          color: hov ? `rgba(13,158,138,0.32)` : 'rgba(13,158,138,0.18)',
        }}
      >
        {index + 1}
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-2xl mb-5 relative z-10 transition-colors duration-300"
        style={{ color: hov ? T : '#0d1117', letterSpacing: '-0.02em' }}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        className="relative z-10 leading-relaxed"
        style={{ fontSize: '15px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.75 }}
      >
        {item.body}
      </p>
    </motion.div>
  )
}

// ── Testimonial Carousel ──────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: '"We cut our RFQ cycle from 40 hours to 8. Emithran\'s should-cost engine changed how we negotiate."',
    role: 'Head of Procurement',
    company: 'Aerospace OEM',
    metric: '80% time saved',
    accent: 'rgba(45,212,191,0.22)',
  },
  {
    quote: '"DFM feedback inside our CAD workflow means we catch issues before they become expensive late-stage revisions."',
    role: 'Design Lead',
    company: 'Tier-1 Manufacturer',
    metric: '40% faster cycles',
    accent: 'rgba(13,158,138,0.20)',
  },
  {
    quote: '"For the first time I have live visibility into supplier capacity. No more fire-fighting at deadlines."',
    role: 'VP Operations',
    company: 'Deep-Tech Startup',
    metric: '99.4% accuracy',
    accent: 'rgba(45,212,191,0.18)',
  },
]

function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (animating || idx === active) return
    setAnimating(true)
    setTimeout(() => {
      setActive(idx)
      setAnimating(false)
    }, 220)
  }, [active, animating])

  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const t = TESTIMONIALS[active]

  return (
    <div className="relative z-10">
      {/* Slide area */}
      <div
        style={{
          padding: 'clamp(2rem, 4vw, 3rem)',
          minHeight: 220,
          transition: 'opacity 0.22s ease',
          opacity: animating ? 0 : 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Quote mark */}
        <svg aria-hidden className="mb-5 shrink-0" width="28" height="20" viewBox="0 0 32 24" fill="none" style={{ opacity: 0.5 }}>
          <path d="M0 24V14.4C0 6.4 4.267 1.6 12.8 0l1.6 2.4C10.133 3.6 8 6.533 8 10.4H13.6V24H0ZM18.4 24V14.4C18.4 6.4 22.667 1.6 31.2 0l1.6 2.4C28.533 3.6 26.4 6.533 26.4 10.4H32V24H18.4Z" fill="white"/>
        </svg>

        <p
          className="font-display font-medium"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75 }}
        >
          {t.quote}
        </p>

        <div className="mt-6">
          <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{t.role}</p>
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="flex items-center justify-center gap-2 px-6 pb-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1rem' }}
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === active ? 'white' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
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
      className="bg-white"
      style={{
        paddingTop:    'clamp(2rem, 3.5vw, 3rem)',
        paddingBottom: 'clamp(2rem, 3.5vw, 3rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="mb-10 pb-8"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-xl md:text-2xl lg:text-[2.2rem] font-bold leading-[1.4] tracking-tight w-full"
          >
            <span className="text-gray-900">Intelligence at every decision.{' '}</span>
            <span className="font-normal text-gray-400">A unified architecture replacing fragmented manual processes.</span>
          </motion.h2>
        </div>

        {/* ── Three pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pt-2">
          {PILLARS.map((item, i) => (
            <PillarCard key={item.roman} item={item} index={i} />
          ))}
        </div>

      </div>

      {/* ── Single testimonial card with all 3 inside ── */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 24 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-[1280px] mx-auto px-6"
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 55%, #0d9488 100%)' }}
        >
          {/* Teal radial glow — stronger, centred */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.15), transparent 65%)' }}
          />
          {/* Bottom teal wash */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,0,0,0.12), transparent 70%)' }}
          />

          {/* Testimonial Carousel */}
          <TestimonialCarousel />
        </div>
      </motion.div>
    </section>
  )
}

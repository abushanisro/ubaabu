'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

export default function ProductsHero() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-label="Products Hero"
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight:           '120vh',
        paddingTop:          '64px',
        backgroundImage:     'url("/assets/cards/product-card/hero.svg")',
        backgroundSize:      '100% auto',
        backgroundPosition:  'top center',
        backgroundRepeat:    'no-repeat',
      }}
    >

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full" style={{ paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="max-w-xl">

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
            className="font-bold leading-[1.15] tracking-tight text-gray-900 mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
          >
            Product modules, designed to work together.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
            className="mb-10 leading-relaxed"
            style={{ fontSize: '15.5px', color: 'rgba(0,0,0,0.52)', maxWidth: '36rem' }}
          >
            Start with one module, scale to your full value chain. Every module connects to every other — creating a seamless flow of intelligence across design, sourcing, and supply chain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            <button
              className="h-11 px-6 rounded-full text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 group"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))', boxShadow: '0 4px 20px rgba(13,148,136,0.30)' }}
            >
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="h-11 px-6 rounded-full bg-white border border-black/15 text-[#0d1117] font-semibold text-sm hover:bg-black/[0.04] transition-colors flex items-center gap-2">
              <Play className="w-3.5 h-3.5" />
              Watch Overview
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

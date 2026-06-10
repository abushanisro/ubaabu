'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'

const EASE = [0.16, 1, 0.3, 1] as const

export default function ProductsHero() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      ref={ref}
      aria-label="Products Hero"
      className="relative flex items-center overflow-hidden"
      style={{ paddingTop: '64px', background: '#ffffff' }}
    >
      {/* hero.svg background */}
      <img
        aria-hidden
        src="/assets/cards/product-card/hero.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />


      {/* White overlay - softens bg so text is readable while SVG stays visible */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1, background: 'rgba(255,255,255,0.52)' }}
      />

      {/* Content */}
      <div
        className="relative w-full max-w-[1280px] mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center"
        style={{ zIndex: 2, paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}
      >
        {/* ── Left: copy ── */}
        <div className="w-full lg:max-w-xl text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
            className="font-bold leading-[1.15] tracking-tight text-gray-900 mb-5"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.2rem)' }}
          >
            The One-Stop Solution for OEMs.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
            className="mb-8 leading-relaxed mx-auto lg:mx-0"
            style={{ fontSize: '15px', color: 'rgba(0,0,0,0.52)', maxWidth: '36rem' }}
          >
            Should-cost, BOM intelligence, supplier evaluation, and delivery tracking in a single platform. Everything your procurement and engineering teams need to source faster and cost smarter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <button
              className="h-11 px-6 rounded-full text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 group"
              style={{
                background: 'linear-gradient(135deg, #2dd4bf, #0d9e8a)',
                boxShadow: '0 4px 24px rgba(45,212,191,0.35)',
              }}
            >
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => setVideoOpen(true)}
              className="h-11 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.12)', color: '#0d1117' }}
            >
              <Play className="w-3.5 h-3.5" />
              Watch Overview
            </button>
          </motion.div>
        </div>

        {/* ── Right: muted autoplay preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
          className="relative w-full"
        >
          <div
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: '1rem',
              boxShadow: '0 16px 48px rgba(13,148,136,0.16), 0 4px 20px rgba(0,0,0,0.10)',
              border: '1px solid rgba(45,212,191,0.2)',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
              src="/videos/emuski.mp4"
            />
          </div>
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(45,212,191,0.22) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
        </motion.div>
      </div>

      {/* HeroVideoDialog modal - same as home page */}
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="/videos/emuski.mp4"
        thumbnailSrc="/assets/hero-page/3d-drawing.png"
        thumbnailAlt=""
        isOpen={videoOpen}
        onOpenChange={setVideoOpen}
        className="absolute size-0 overflow-hidden"
      />
    </section>
  )
}

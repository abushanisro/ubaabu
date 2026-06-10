import Link from 'next/link'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

interface BlogCTAProps {
  headline?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function BlogCTA({
  headline = 'See Emithran in action with your own part data.',
  body = 'Get a live demo with a real component from your supply chain - should-cost, supplier intelligence, and BOM validation in 30 minutes.',
  ctaLabel = 'Book a demo',
  ctaHref = '/contact?source=blog-cta&cta=book-a-demo',
}: BlogCTAProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col-reverse sm:flex-row items-center justify-between gap-8 px-8 py-10 sm:px-12"
      style={{
        background: 'linear-gradient(135deg, #0f1b2d 0%, #0a2a26 55%, #0f1b2d 100%)',
      }}
    >
      {/* Left - text + CTA */}
      <div className="flex-1 max-w-xl">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#2dd4bf' }}>
          Platform demo
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-snug tracking-tight mb-3" style={{ color: '#ffffff' }}>
          {headline}
        </h2>
        <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {body}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-150 group"
            style={{ background: '#2dd4bf', color: '#0f1b2d' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0d9e8a'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2dd4bf'; (e.currentTarget as HTMLElement).style.color = '#0f1b2d' }}
          >
            {ctaLabel}
            <AnimatedArrow />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-150"
            style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.18)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.1)' }}
          >
            Explore resources
          </Link>
        </div>
      </div>

      {/* Right - illustration */}
      <div
        className="w-full sm:w-64 md:w-72 shrink-0 rounded-xl overflow-hidden"
        style={{ maxHeight: 200, opacity: 0.88 }}
      >
        <img
          src="/assets/hero-page/3d-drawing.png"
          alt="Engineering blueprint"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.85) contrast(1.1)' }}
        />
      </div>
    </div>
  )
}

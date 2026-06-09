'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { POSTS, type BlogCategory, type BlogPost } from './blogData'
import { GlobeCdn } from '@/components/ui/cobe-globe-cdn'
import BlogCTA from '@/components/ui/blog-cta'
import RequestCTA from '@/components/ui/request-cta'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

const CATEGORIES: BlogCategory[] = ['All', 'Corporate', 'Engineering', 'Industry', 'Product']

const CATEGORY_STYLES: Record<Exclude<BlogCategory, 'All'>, { bg: string; text: string; dot: string }> = {
  Corporate:   { bg: '#0f1b2d',           text: '#ffffff',  dot: '#2dd4bf' },
  Engineering: { bg: 'rgba(13,148,136,0.12)', text: '#0d9488', dot: '#0d9488' },
  Industry:    { bg: 'rgba(15,27,45,0.07)',   text: '#0f1b2d', dot: '#0f1b2d' },
  Product:     { bg: 'rgba(45,212,191,0.15)', text: '#0d9488', dot: '#2dd4bf' },
}

function CategoryPill({ category }: { category: Exclude<BlogCategory, 'All'> }) {
  const s = CATEGORY_STYLES[category]
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-widest"
      style={{ color: s.text === '#ffffff' ? '#0d9488' : s.text }}>
      {category}
    </span>
  )
}

const AUTHOR_PHOTOS: Record<string, string> = {
  'Abushan': '/assets/infographics/logo/abushan.png',
  'Singaravelan S.': '/assets/infographics/logo/sinigi.png',
}

function AuthorRow({ author, date, readTime }: { author: BlogPost['author']; date: string; readTime: string }) {
  const photo = AUTHOR_PHOTOS[author.name]
  const initials = author.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="flex items-center gap-2.5">
      {photo ? (
        <img src={photo} alt={author.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
      ) : (
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)' }}>
          {initials}
        </div>
      )}
      <div className="flex items-center gap-1.5 text-[12px] text-black/50">
        <span className="font-semibold text-[#0f1b2d]">{author.name}</span>
        <span className="text-[#2dd4bf]">·</span>
        <span>{date}</span>
        <span className="text-[#2dd4bf]">·</span>
        <span>{readTime}</span>
      </div>
    </div>
  )
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <div className="relative rounded-2xl border border-black/10 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <div className="grid lg:grid-cols-2">

        {/* Left — content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <CategoryPill category={post.category} />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-[#0f1b2d]">
            {post.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-black/60 max-w-lg">
            {post.excerpt}
          </p>
          <div className="mt-6">
            <AuthorRow author={post.author} date={post.date} readTime={post.readTime} />
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
          >
            Read more <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Right — interactive COBE globe */}
        <div className="relative hidden lg:flex items-center justify-center min-h-[320px] overflow-hidden">
          <GlobeCdn className="w-full h-full absolute inset-0 z-10" speed={0.003} />
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl bg-white p-6 transition-all duration-200"
      style={{
        border: '1px solid rgba(13,148,136,0.12)',
        boxShadow: '0 1px 4px rgba(13,148,136,0.06)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(13,148,136,0.14)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,212,191,0.4)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(13,148,136,0.06)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,148,136,0.12)'
      }}
    >
      {/* Teal top accent bar */}
      <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #0d9488, #2dd4bf)' }} />

      <CategoryPill category={post.category} />

      <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-[#0f1b2d] group-hover:text-[#0d9488] transition-colors duration-200">
        {post.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-black/50 flex-1 line-clamp-3">
        {post.excerpt}
      </p>

      <div className="mt-5 pt-4 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(13,148,136,0.1)' }}>
        <AuthorRow author={post.author} date={post.date} readTime={post.readTime} />
        <span className="text-[#0d9488] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
      </div>
    </Link>
  )
}

const CASE_STUDIES = [
  {
    title: "India vs Belgium: 38% Landed Cost Saving on HGV Chassis Rails",
    date: "June 2, 2026",
    body: "By benchmarking India roll forming against Belgium manufacturing, Emithran identified a 38% total landed cost advantage including full DDP logistics from Chennai to Scotland.",
    bg: '#f0fdf9',
    border: 'rgba(13,148,136,0.15)',
    tag: 'Automotive',
    href: '/case-studies/chassis-india-belgium',
  },
  {
    title: "Should-Cost Deep Dive: Automotive Exhaust Assembly at Tier-1 Scale",
    date: "May 28, 2026",
    body: "A full should-cost model for a complex exhaust assembly revealed 19% procurement leakage and enabled a data-driven renegotiation with Tier-1 stamping suppliers in Stuttgart.",
    bg: '#0f1b2d',
    border: 'rgba(45,212,191,0.2)',
    tag: 'Automotive',
    href: '/case-studies/exhaust-system',
    dark: true,
  },
  {
    title: "HGV Chassis Ladder Frame: BOM Costing Across 3 Geographies",
    date: "May 20, 2026",
    body: "Multi-geography cost benchmarking for a heavy goods vehicle chassis frame — comparing India, Germany, and Turkey fabrication costs with full landed cost visibility.",
    bg: '#ccfbf1',
    border: 'rgba(13,148,136,0.2)',
    tag: 'Automotive',
    href: '/case-studies/hgv-chassis',
  },
  {
    title: "Aerospace DC-DC Converter: VAVE Analysis Saves 22% per Unit",
    date: "May 12, 2026",
    body: "Value analysis of an aviation-grade DC-DC converter identified 14 substitution opportunities in passive components, delivering 22% unit cost reduction without changing form factor.",
    bg: '#e6faf7',
    border: 'rgba(13,148,136,0.15)',
    tag: 'Aerospace',
    href: '/case-studies/dc-dc-converter',
  },
  {
    title: "Competitive Electronics Teardown: Reverse BOM for Defence Subsystem",
    date: "April 30, 2026",
    body: "A complete teardown and reverse BOM of a competing defence subsystem gave procurement intelligence that directly informed the sourcing strategy for the next generation program.",
    bg: '#0d9488',
    border: 'rgba(255,255,255,0.15)',
    tag: 'Defence',
    href: '/case-studies/electronics-teardown',
    dark: true,
  },
  {
    title: "Rear Axle Should-Cost: Breaking Down a £480 Casting-Machined Assembly",
    date: "March 22, 2026",
    body: "A granular should-cost analysis of a rear axle housing — from raw casting price to machining cycle time — identified a £68/unit overcharge from a Tier-1 supplier.",
    bg: '#f0fdf9',
    border: 'rgba(13,148,136,0.15)',
    tag: 'Automotive',
    href: '/case-studies/rear-axle-should-cost',
  },
]

function CaseStudyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const CARD_W = 260 + 16 // card width + gap

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const interval = setInterval(() => {
      if (pausedRef.current) return
      const maxScroll = track.scrollWidth - track.clientWidth
      if (track.scrollLeft >= maxScroll - 2) {
        track.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        track.scrollBy({ left: CARD_W, behavior: 'smooth' })
      }
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full overflow-hidden py-16" style={{ background: '#fafffe' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-8 flex items-end justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#0d9488' }}>
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#0f1b2d' }}>
            Recent highlights
          </h2>
        </div>
        {/* Prev / Next */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => trackRef.current?.scrollBy({ left: -CARD_W, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ border: '1px solid rgba(13,148,136,0.25)', background: '#fff', color: '#0d9488' }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
              <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => trackRef.current?.scrollBy({ left: CARD_W, behavior: 'smooth' })}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ border: '1px solid rgba(13,148,136,0.25)', background: '#fff', color: '#0d9488' }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
              <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          paddingLeft: 'max(24px, calc((100vw - 1280px) / 2 + 40px))',
          paddingRight: 40,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
        }}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        {CASE_STUDIES.map((cs, i) => (
          <article
            key={i}
            className="flex-none flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
            style={{
              width: 260,
              minHeight: 240,
              background: cs.bg,
              border: `1px solid ${cs.border}`,
              boxShadow: '0 2px 12px rgba(13,148,136,0.07)',
            }}
          >
            <span
              className="self-start text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-4"
              style={{
                background: cs.dark ? 'rgba(45,212,191,0.15)' : 'rgba(13,148,136,0.1)',
                color: cs.dark ? '#2dd4bf' : '#0d9488',
              }}
            >
              {cs.tag}
            </span>

            <header className="flex-1">
              <h3 className="text-[15px] font-bold leading-snug mb-3" style={{ color: cs.dark ? '#ffffff' : '#0f1b2d' }}>
                {cs.title}
              </h3>
              <p className="text-[12.5px] leading-relaxed line-clamp-3" style={{ color: cs.dark ? 'rgba(255,255,255,0.6)' : 'rgba(15,27,45,0.55)' }}>
                {cs.body}
              </p>
            </header>

            <footer className="mt-5 flex items-center justify-between">
              <time className="text-[11px]" style={{ color: cs.dark ? 'rgba(255,255,255,0.4)' : 'rgba(15,27,45,0.4)' }}>
                {cs.date}
              </time>
              <Link
                href={cs.href}
                className="inline-flex items-center gap-1 text-[12px] font-semibold group transition-colors duration-150"
                style={{ color: cs.dark ? '#2dd4bf' : '#0d9488' }}
              >
                Learn more
                <AnimatedArrow />
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

// Unique SVG illustrations per post (right-side image card)
const POST_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  'bom-accuracy-tier1-suppliers': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#f0fdf9" rx="12" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="24" y={24 + i*32} width="180" height="18" rx="3" fill={i === 2 ? '#fecaca' : '#ccfbf1'} />
          <rect x="212" y={24 + i*32} width="48" height="18" rx="3" fill={i === 2 ? '#ef4444' : '#0d9488'} opacity={i === 2 ? 1 : 0.7} />
          {i === 2 && <text x="236" y={37 + i*32} fontSize="9" fill="#fff" textAnchor="middle" fontWeight="bold">ERROR</text>}
          {i !== 2 && <text x="236" y={37 + i*32} fontSize="9" fill="#fff" textAnchor="middle">✓</text>}
        </g>
      ))}
      <text x="24" y="192" fontSize="10" fill="#0d9488" fontWeight="600">BOM Validation · 99.4% accuracy</text>
    </svg>
  ),
  'supplier-radar-defence-manufacturing': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#0f1b2d" rx="12" />
      {[80,60,40].map((r,i) => <circle key={i} cx="160" cy="100" r={r} fill="none" stroke="rgba(45,212,191,0.2)" strokeWidth="1" />)}
      {[[160,40],[210,75],[190,140],[120,145],[95,80]].map(([x,y],i) => (
        <g key={i}><circle cx={x} cy={y} r="5" fill="#2dd4bf" opacity="0.9" />
        <line x1="160" y1="100" x2={x} y2={y} stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" /></g>
      ))}
      <circle cx="160" cy="100" r="8" fill="#0d9488" />
      <text x="160" y="192" fontSize="10" fill="#2dd4bf" textAnchor="middle" fontWeight="600">Supplier Radar · Real-time network</text>
    </svg>
  ),
  'emithran-series-a-announcement': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#f0fdf9" rx="12" />
      {[40,75,110,145].map((x,i) => {
        const h = [60,95,70,110][i]
        return <rect key={i} x={x} y={170-h} width="36" height={h} rx="4" fill={i===3?'#0d9488':'#ccfbf1'} stroke="rgba(13,148,136,0.3)" strokeWidth="1" />
      })}
      <polyline points="40,130 76,95 112,115 148,60" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="160" y="192" fontSize="10" fill="#0d9488" textAnchor="middle" fontWeight="600">Series A · Manufacturing Intelligence</text>
    </svg>
  ),
  'vave-cost-reduction-aerospace': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#f0fdf9" rx="12" />
      <circle cx="160" cy="90" r="55" fill="none" stroke="rgba(13,148,136,0.15)" strokeWidth="1" />
      <path d="M160,35 A55,55 0 0,1 215,90" fill="none" stroke="#0d9488" strokeWidth="10" strokeLinecap="round" opacity="0.3" />
      <path d="M160,35 A55,55 0 0,1 202,118" fill="none" stroke="#0d9488" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
      <text x="160" y="86" fontSize="22" fontWeight="800" fill="#0f1b2d" textAnchor="middle">−18%</text>
      <text x="160" y="102" fontSize="9" fill="#0d9488" textAnchor="middle">cost reduction</text>
      <text x="160" y="192" fontSize="10" fill="#0d9488" textAnchor="middle" fontWeight="600">VAVE Studio · Value Engineering</text>
    </svg>
  ),
  'otif-logistics-intelligence': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#0f1b2d" rx="12" />
      <polyline points="24,150 80,120 136,130 192,80 248,70 296,50" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="24,155 80,145 136,148 192,135 248,130 296,128" fill="none" stroke="rgba(45,212,191,0.3)" strokeWidth="1.5" strokeDasharray="5 3" />
      {[[192,80],[248,70],[296,50]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="4" fill="#2dd4bf" />)}
      <text x="24" y="192" fontSize="10" fill="#2dd4bf" fontWeight="600">OTIF Rate · 98.6% on-time in-full</text>
    </svg>
  ),
  'precision-manufacturing-india-global': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#f0fdf9" rx="12" />
      {[[60,100,'Chennai'],[160,70,'Stuttgart'],[260,90,'Detroit']].map(([x,y,label],i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="7" fill="#0d9488" opacity="0.85" />
          <text x={x as number} y={(y as number)+18} fontSize="8" fill="#0f1b2d" textAnchor="middle" fontWeight="600">{label as string}</text>
        </g>
      ))}
      <path d="M60,100 Q110,50 160,70" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      <path d="M160,70 Q210,50 260,90" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      <text x="160" y="192" fontSize="10" fill="#0d9488" textAnchor="middle" fontWeight="600">Global Supply Chain · Emithran Network</text>
    </svg>
  ),
  'launch-tracker-rfq-cycle': (
    <svg viewBox="0 0 320 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#f0fdf9" rx="12" />
      {['RFQ','Design','Proto','Launch'].map((label, i) => (
        <g key={i}>
          <rect x={24 + i*72} y="70" width="52" height="52" rx="8" fill={i===3?'#0d9488':'#ccfbf1'} stroke="rgba(13,148,136,0.3)" strokeWidth="1" />
          <text x={50 + i*72} y="100" fontSize="9" fill={i===3?'#fff':'#0d9488'} textAnchor="middle" fontWeight="600">{label}</text>
          {i < 3 && <path d={`M${76+i*72},96 L${96+i*72},96`} stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" markerEnd="url(#arr)" />}
        </g>
      ))}
      <text x="160" y="192" fontSize="10" fill="#0d9488" textAnchor="middle" fontWeight="600">Launch Tracker · 40% faster RFQ cycle</text>
    </svg>
  ),
}

function LatestPostItem({ post }: { post: BlogPost }) {
  const photo = AUTHOR_PHOTOS[post.author.name]
  const initials = post.author.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)
  const illustration = POST_ILLUSTRATIONS[post.slug]

  return (
    <article className="flex flex-col gap-0" style={{ borderLeft: '3px solid #0d9488', paddingLeft: 24 }}>
      {/* Top row: category | date + author */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#0d9488' }}>
          {post.category}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[12px]" style={{ color: 'rgba(15,27,45,0.45)' }}>{post.date}</span>
          <div className="flex items-center gap-2">
            {photo ? (
              <img src={photo} alt={post.author.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                style={{ background: 'linear-gradient(135deg,#0d9488,#2dd4bf)' }}>
                {initials}
              </div>
            )}
            <div className="text-[12px] font-semibold" style={{ color: '#0f1b2d' }}>{post.author.name}</div>
          </div>
        </div>
      </div>

      {/* Two-col: text left, image right */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4 hover:text-[#0d9488] transition-colors"
              style={{ color: '#0f1b2d' }}>
              {post.title}
            </h2>
          </Link>
          <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'rgba(15,27,45,0.55)' }}>
            {post.excerpt}
          </p>
          <Link href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold group transition-colors"
            style={{ color: '#0d9488' }}>
            Read more
            <AnimatedArrow />
          </Link>
        </div>

        {/* Illustration */}
        {illustration && (
          <div className="rounded-xl overflow-hidden" style={{ height: 200 }}>
            {illustration}
          </div>
        )}
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [active, setActive] = useState<BlogCategory>('All')

  const featured = POSTS.find(p => p.featured)!
  const filtered = POSTS.filter(p => !p.featured && (active === 'All' || p.category === active))

  return (
    <main className="min-h-screen" style={{ background: '#fff' }}>

      {/* Hero — blog.svg full section background */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/assets/blog/blog.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Content on top */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-12">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-black/40 mb-4">
              <span>Emithran</span>
              <span>›</span>
              <span className="text-black/70 font-medium">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0f1b2d]">Blog</h1>
          </div>

          {/* Featured post */}
          <FeaturedCard post={featured} />
        </div>
      </div>

      {/* Latest posts — Stripe editorial style */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 flex flex-col gap-14"
        style={{ borderBottom: '1px solid rgba(13,148,136,0.1)' }}>
        {POSTS.filter(p => !p.featured).slice(0, 3).map(post => (
          <LatestPostItem key={post.slug} post={post} />
        ))}
      </div>

      {/* CTA banner */}
      <div className="py-10">
        <BlogCTA ctaHref="/contact?source=blog-listing&cta=book-a-demo" />
      </div>

      {/* Category filters + post grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-0">
        <div className="flex flex-wrap gap-2 mt-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150"
              style={{
                background: active === cat ? '#0d9488' : 'rgba(13,148,136,0.07)',
                color:      active === cat ? '#ffffff'  : '#0d9488',
                border:     active === cat ? '1px solid #0d9488' : '1px solid rgba(13,148,136,0.2)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 mb-16">
          {filtered.length > 0
            ? filtered.map(post => <PostCard key={post.slug} post={post} />)
            : (
              <p className="col-span-3 py-16 text-center text-black/40 text-sm">
                No posts in this category yet.
              </p>
            )}
        </div>
      </div>

      {/* Case Studies carousel */}
      <CaseStudyCarousel />

      {/* Request CTA — bottom */}
      <div className="py-10">
        <RequestCTA />
      </div>
    </main>
  )
}

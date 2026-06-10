'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CASE_STUDIES, type CaseStudyIndustry, type CaseStudy } from './caseStudyData'
import { POSTS } from '@/components/blog/blogData'
import type { MapMarker } from '@/components/ui/maplibre-hero-map'
import BlogCTA from '@/components/ui/blog-cta'
import RequestCTA from '@/components/ui/request-cta'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

const MaplibreHeroMap = dynamic(
  () => import('@/components/ui/maplibre-hero-map'),
  { ssr: false }
)

const INDUSTRIES: CaseStudyIndustry[] = ['All', 'Automotive', 'Aerospace', 'Defence', 'Electronics']

const INDUSTRY_TEXT: Record<Exclude<CaseStudyIndustry, 'All'>, string> = {
  Automotive:  '#0d9488',
  Aerospace:   '#0f1b2d',
  Defence:     '#0f1b2d',
  Electronics: '#0d9488',
}

function IndustryLabel({ industry }: { industry: Exclude<CaseStudyIndustry, 'All'> }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-widest"
      style={{ color: INDUSTRY_TEXT[industry] }}>
      {industry}
    </span>
  )
}

function AuthorRow({ author, date, readTime }: { author: CaseStudy['author']; date: string; readTime: string }) {
  const initials = author.name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="flex items-center gap-2.5">
      {author.avatar ? (
        <img src={author.avatar} alt={author.name}
          className="w-7 h-7 rounded-full object-cover shrink-0"
          style={{ border: '1.5px solid rgba(13,148,136,0.25)' }} />
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

const ALL_MARKERS: MapMarker[] = CASE_STUDIES.map(cs => ({
  lat: cs.coordinates[1],
  lng: cs.coordinates[0],
  title: cs.title,
  slug: cs.slug,
}))

function FeaturedCard({ post }: { post: CaseStudy }) {
  return (
    <div className="relative rounded-2xl border border-black/10 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(16px)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
      <div className="grid lg:grid-cols-2">

        {/* Left - content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <IndustryLabel industry={post.industry} />
            {post.metric && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(45,212,191,0.15)', color: '#0d9488' }}>
                {post.metric}
              </span>
            )}
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-[#0f1b2d]">
            {post.title}
          </h2>
          <p className="mt-1.5 text-[12px] text-black/40 font-medium">{post.location}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-black/60 max-w-lg">
            {post.excerpt}
          </p>
          <div className="mt-6">
            <AuthorRow author={post.author} date={post.date} readTime={post.readTime} />
          </div>
          <Link
            href={`/case-studies/${post.slug}`}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
          >
            Read case study <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Right - interactive MapLibre map */}
        <div className="relative hidden lg:block min-h-[320px] overflow-hidden">
          <MaplibreHeroMap
            markers={ALL_MARKERS}
            className="w-full h-full absolute inset-0"
          />
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: CaseStudy }) {
  return (
    <Link href={`/case-studies/${post.slug}`}
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
      <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #0d9488, #2dd4bf)' }} />

      <div className="flex items-center gap-2 mb-1">
        <IndustryLabel industry={post.industry} />
        {post.metric && (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: 'rgba(45,212,191,0.12)', color: '#0d9488' }}>
            {post.metric}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-[#0f1b2d] group-hover:text-[#0d9488] transition-colors duration-200">
        {post.title}
      </h3>
      <p className="mt-1 text-[11px] text-black/35 font-medium">{post.location}</p>
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

const CASE_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  'exhaust-system': (
    <img src="/assets/casestudy/case5.png" alt="Automotive exhaust assembly" className="w-full h-full object-cover" />
  ),
  'hgv-chassis': (
    <img src="/assets/casestudy/truck.png" alt="HGV chassis ladder frame" className="w-full h-full object-cover" />
  ),
  'dc-dc-converter': (
    <img src="/assets/casestudy/case3.png" alt="Aerospace DC-DC converter" className="w-full h-full object-cover" />
  ),
}

function LatestCaseStudyItem({ post }: { post: CaseStudy }) {
  const initials = post.author.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)
  const illustration = CASE_ILLUSTRATIONS[post.slug]

  return (
    <article className="flex flex-col gap-0" style={{ borderLeft: '3px solid #0d9488', paddingLeft: 24 }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#0d9488' }}>
          {post.industry}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[12px]" style={{ color: 'rgba(15,27,45,0.45)' }}>{post.date}</span>
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.name}
                className="w-7 h-7 rounded-full object-cover shrink-0"
                style={{ border: '1.5px solid rgba(13,148,136,0.25)' }} />
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

      <div className="flex gap-8 items-start">
        <div className="flex-1 min-w-0">
          <Link href={`/case-studies/${post.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-2 hover:text-[#0d9488] transition-colors"
              style={{ color: '#0f1b2d' }}>
              {post.title}
            </h2>
          </Link>
          {post.metric && (
            <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full mb-3"
              style={{ background: 'rgba(45,212,191,0.12)', color: '#0d9488' }}>
              {post.metric}
            </span>
          )}
          <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'rgba(15,27,45,0.55)' }}>
            {post.excerpt}
          </p>
          <Link href={`/case-studies/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold group transition-colors"
            style={{ color: '#0d9488' }}>
            Read case study
            <AnimatedArrow />
          </Link>
        </div>

        {illustration && (
          <div className="rounded-xl overflow-hidden aspect-square w-full max-w-[220px]">
            {illustration}
          </div>
        )}
      </div>
    </article>
  )
}

const BLOG_CARD_COLORS: Record<string, { bg: string; border: string; dark?: boolean }> = {
  Corporate:   { bg: '#0f1b2d', border: 'rgba(45,212,191,0.2)',  dark: true  },
  Engineering: { bg: '#f0fdf9', border: 'rgba(13,148,136,0.15)'              },
  Industry:    { bg: '#e6faf7', border: 'rgba(13,148,136,0.15)'              },
  Product:     { bg: '#ccfbf1', border: 'rgba(13,148,136,0.2)'               },
}

function CaseStudyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const CARD_W = 260 + 16

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
            Blog
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#0f1b2d' }}>
            Recent blogs
          </h2>
        </div>
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
        {POSTS.map((post) => {
          const colors = BLOG_CARD_COLORS[post.category] ?? BLOG_CARD_COLORS['Engineering']
          return (
            <article
              key={post.slug}
              className="flex-none flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{
                width: 260,
                minHeight: 240,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                boxShadow: '0 2px 12px rgba(13,148,136,0.07)',
              }}
            >
              <span
                className="self-start text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-4"
                style={{
                  background: colors.dark ? 'rgba(45,212,191,0.15)' : 'rgba(13,148,136,0.1)',
                  color: colors.dark ? '#2dd4bf' : '#0d9488',
                }}
              >
                {post.category}
              </span>

              <header className="flex-1">
                <h3 className="text-[15px] font-bold leading-snug mb-3"
                  style={{ color: colors.dark ? '#ffffff' : '#0f1b2d' }}>
                  {post.title}
                </h3>
                <p className="text-[12.5px] leading-relaxed line-clamp-3"
                  style={{ color: colors.dark ? 'rgba(255,255,255,0.6)' : 'rgba(15,27,45,0.55)' }}>
                  {post.excerpt}
                </p>
              </header>

              <footer className="mt-5 flex items-center justify-between">
                <time className="text-[11px]"
                  style={{ color: colors.dark ? 'rgba(255,255,255,0.4)' : 'rgba(15,27,45,0.4)' }}>
                  {post.date}
                </time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold group transition-colors duration-150"
                  style={{ color: colors.dark ? '#2dd4bf' : '#0d9488' }}
                >
                  Read more
                  <AnimatedArrow />
                </Link>
              </footer>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function CaseStudyPage() {
  const [active, setActive] = useState<CaseStudyIndustry>('All')

  const featured = CASE_STUDIES.find(cs => cs.featured)!
  const filtered = CASE_STUDIES.filter(cs => !cs.featured && (active === 'All' || cs.industry === active))

  const activeIndustries = INDUSTRIES.filter(ind =>
    ind === 'All' || CASE_STUDIES.some(cs => cs.industry === ind)
  )

  return (
    <main className="min-h-screen" style={{ background: '#fff' }}>

      {/* Hero - blog.svg full section background */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/assets/blog/blog.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-12">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-black/40 mb-4">
              <span>Emithran</span>
              <span>›</span>
              <span className="text-black/70 font-medium">Case Studies</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0f1b2d]">Case Studies</h1>
          </div>
          <FeaturedCard post={featured} />
        </div>
      </div>

      {/* Latest case studies - editorial style */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 flex flex-col gap-14"
        style={{ borderBottom: '1px solid rgba(13,148,136,0.1)' }}>
        {CASE_STUDIES.filter(cs => !cs.featured).slice(0, 3).map(cs => (
          <LatestCaseStudyItem key={cs.slug} post={cs} />
        ))}
      </div>

      {/* CTA banner */}
      <div className="py-10">
        <BlogCTA ctaHref="/contact?source=case-studies&cta=book-a-demo" />
      </div>

      {/* Industry filters + grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-0">
        <div className="flex flex-wrap gap-2 mt-10">
          {activeIndustries.map(ind => (
            <button
              key={ind}
              onClick={() => setActive(ind)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150"
              style={{
                background: active === ind ? '#0d9488' : 'rgba(13,148,136,0.07)',
                color:      active === ind ? '#ffffff'  : '#0d9488',
                border:     active === ind ? '1px solid #0d9488' : '1px solid rgba(13,148,136,0.2)',
              }}
            >
              {ind}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 mb-16">
          {filtered.length > 0
            ? filtered.map(cs => <PostCard key={cs.slug} post={cs} />)
            : (
              <p className="col-span-3 py-16 text-center text-black/40 text-sm">
                No case studies in this category yet.
              </p>
            )}
        </div>
      </div>

      {/* Case studies carousel */}
      <CaseStudyCarousel />

      {/* Request CTA - bottom */}
      <div className="py-10">
        <RequestCTA />
      </div>
    </main>
  )
}

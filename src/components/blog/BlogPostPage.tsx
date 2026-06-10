'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  MessageCircle, Facebook, Twitter, Linkedin, Link2, Check,
  ArrowUpRight, BookOpen, User, TrendingUp, ExternalLink, Clock,
  Gauge, Network, Truck, Sparkles, Share2,
} from 'lucide-react'
import { track } from '@/lib/analytics'
import { POSTS, type BlogPost, type BlogCategory } from './blogData'
import type { BlogPostContent } from './blogContent'
import { AnimatedArrow } from '@/components/ui/animated-arrow'

const CATEGORY_STYLES: Record<Exclude<BlogCategory, 'All'>, { bg: string; text: string }> = {
  Corporate:   { bg: 'rgba(45,212,191,0.16)',  text: '#0d9488' },
  Engineering: { bg: 'rgba(13,148,136,0.12)',  text: '#0d9488' },
  Industry:    { bg: 'rgba(15,27,45,0.07)',    text: '#0f1b2d' },
  Product:     { bg: 'rgba(45,212,191,0.16)',  text: '#0d9488' },
}

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  'bom-accuracy-tier1-suppliers': Gauge,
  'supplier-radar-defence-manufacturing': Network,
  'emithran-series-a-announcement': Sparkles,
  'vave-cost-reduction-aerospace': TrendingUp,
  'otif-logistics-intelligence': Truck,
  'precision-manufacturing-india-global': Network,
  'launch-tracker-rfq-cycle': Gauge,
  'should-cost-analysis-supplier-negotiation': TrendingUp,
}

function Thumbnail({ slug, className = '' }: { slug: string; className?: string }) {
  const Icon = ICONS[slug] ?? Sparkles
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0f1b2d 0%, #0a2a26 100%)' }}
    >
      <div className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(rgba(45,212,191,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.18) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }} />
      <Icon className="relative w-7 h-7" style={{ color: '#2dd4bf' }} />
    </div>
  )
}

const AUTHOR_PHOTOS: Record<string, string> = {
  'Abushan': '/assets/infographics/logo/abushan.png',
  'Singaravelan S.': '/assets/infographics/logo/sinigi.png',
}

function AuthorAvatar({ name, size = 9 }: { name: string; size?: number }) {
  const photo = AUTHOR_PHOTOS[name]
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  const px = size * 4
  if (photo) {
    return <img src={photo} alt={name} className="rounded-full object-cover shrink-0" style={{ width: px, height: px }} />
  }
  return (
    <div
      className="rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
      style={{ background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)', width: px, height: px }}
    >
      {initials}
    </div>
  )
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero({ post, heroImage }: { post: BlogPost; heroImage: string }) {
  const [hovered, setHovered] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [heroCopied, setHeroCopied] = useState(false)
  const pageUrl = `${SITEURL}/blog/${post.slug}`

  function handleHeroShare(platform: string) {
    window.open(buildShareUrl(platform, pageUrl, post.title), '_blank', 'noopener,noreferrer,width=640,height=500')
    track.shareArticle(platform, post.slug, post.title)
    setShareOpen(false)
  }

  function handleHeroCopy() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setHeroCopied(true)
      track.shareArticle('copy_link', post.slug, post.title)
      setTimeout(() => { setHeroCopied(false); setShareOpen(false) }, 1800)
    })
  }

  return (
    <div
      className="relative w-full h-[420px] sm:h-[440px] md:h-[480px] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShareOpen(false) }}
    >
      <img
        src={heroImage}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(15,27,45,0.94) 0%, rgba(15,27,45,0.72) 42%, rgba(15,27,45,0.32) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(15,27,45,0.5) 0%, transparent 45%)' }} />

      {/* Hero share button — fades in on hover */}
      <div
        className="absolute top-5 right-5 sm:top-6 sm:right-8 z-20 transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => setShareOpen(prev => !prev)}
            aria-label="Share this article"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-semibold transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#fff',
            }}
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>

          {/* Dropdown */}
          {shareOpen && (
            <div
              className="absolute top-11 right-0 z-30 flex flex-col gap-0.5 p-1.5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                minWidth: 160,
                border: '1px solid rgba(13,148,136,0.12)',
              }}
            >
              {SHARE_PLATFORMS.map(({ label, icon: Icon, hoverBg }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleHeroShare(label)}
                  className="flex items-center gap-2.5 h-9 px-3 rounded-lg text-[13px] font-medium w-full text-left transition-colors"
                  style={{ color: '#0f1b2d' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = hoverBg
                    el.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'transparent'
                    el.style.color = '#0f1b2d'
                  }}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleHeroCopy}
                className="flex items-center gap-2.5 h-9 px-3 rounded-lg text-[13px] font-medium w-full text-left transition-colors"
                style={{ color: heroCopied ? '#0d9488' : '#0f1b2d' }}
                onMouseEnter={e => { if (!heroCopied) (e.currentTarget as HTMLElement).style.background = 'rgba(13,148,136,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {heroCopied ? <Check className="w-4 h-4 shrink-0" /> : <Link2 className="w-4 h-4 shrink-0" />}
                {heroCopied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-10 sm:pb-12">
        <div className="flex items-center gap-2 text-[13px] text-white/45 mb-5">
          <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
        </div>

        <span
          className="self-start inline-block text-[10px] font-bold uppercase tracking-widest mb-4"
          style={{ color: '#2dd4bf' }}
        >
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold leading-[1.18] tracking-tight text-white max-w-3xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <AuthorAvatar name={post.author.name} />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-white/55">
            <span className="font-semibold text-white/85">{post.author.name}</span>
            <span style={{ color: '#2dd4bf' }}>·</span>
            <span>{post.date}</span>
            <span style={{ color: '#2dd4bf' }}>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- Share bar -------------------------------- */

const SITEURL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emithran.emuski.com'

function buildShareUrl(platform: string, pageUrl: string, title: string) {
  const u = encodeURIComponent(pageUrl)
  const t = encodeURIComponent(title)
  switch (platform) {
    case 'WhatsApp': return `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + pageUrl)}`
    case 'Facebook': return `https://www.facebook.com/sharer/sharer.php?u=${u}`
    case 'Twitter':  return `https://twitter.com/intent/tweet?text=${t}&url=${u}&via=EmithranHQ`
    case 'LinkedIn': return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`
    default: return pageUrl
  }
}

const SHARE_PLATFORMS = [
  { label: 'WhatsApp', icon: MessageCircle, hoverBg: '#25D366' },
  { label: 'Facebook', icon: Facebook,      hoverBg: '#1877F2' },
  { label: 'Twitter',  icon: Twitter,       hoverBg: '#000000' },
  { label: 'LinkedIn', icon: Linkedin,      hoverBg: '#0A66C2' },
]

function ShareBar({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false)
  const pageUrl = `${SITEURL}/blog/${post.slug}`

  function handleShare(platform: string) {
    const url = buildShareUrl(platform, pageUrl, post.title)
    window.open(url, '_blank', 'noopener,noreferrer,width=640,height=500')
    track.shareArticle(platform, post.slug, post.title)
  }

  function handleCopy() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true)
      track.shareArticle('copy_link', post.slug, post.title)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mb-8 pb-6" style={{ borderBottom: '1px solid rgba(13,148,136,0.12)' }}>
      {/* Title card preview strip */}
      <div className="flex items-center gap-3 mb-4 p-3 rounded-xl"
        style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.12)' }}>
        <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: '#0d9488' }} />
        <p className="text-[13px] font-semibold leading-snug line-clamp-2" style={{ color: '#0f1b2d' }}>
          {post.title}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: 'rgba(15,27,45,0.4)' }}>
          Share this article:
        </span>
        <div className="flex items-center flex-wrap gap-2">
          {SHARE_PLATFORMS.map(({ label, icon: Icon, hoverBg }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleShare(label)}
              aria-label={`Share on ${label}`}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
              style={{ border: '1px solid rgba(13,148,136,0.2)', color: '#0d9488', background: 'rgba(13,148,136,0.05)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = hoverBg
                el.style.color = '#fff'
                el.style.borderColor = hoverBg
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(13,148,136,0.05)'
                el.style.color = '#0d9488'
                el.style.borderColor = 'rgba(13,148,136,0.2)'
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}

          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy link"
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
            style={{
              border: copied ? '1px solid #0d9488' : '1px solid rgba(15,27,45,0.14)',
              color: copied ? '#0d9488' : 'rgba(15,27,45,0.55)',
              background: copied ? 'rgba(13,148,136,0.08)' : '#fff',
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------ Talk-to-us card ----------------------------- */

function TalkToExpertsCard() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center text-center gap-6 py-14 px-6"
      style={{ background: '#000' }}
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl leading-tight">
        Want to See This on Your Own Parts?
      </h3>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-200"
        style={{ background: '#2dd4bf', color: '#0f1b2d' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5eead4' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2dd4bf' }}
      >
        Request a Demo
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

/* ----------------------------- Related articles ----------------------------- */

function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="mt-12 sm:mt-16">
      <div className="flex items-center gap-3 mb-7 sm:mb-8">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)' }}>
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#0f1b2d' }}>Related Articles</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {posts.map(post => {
          const cat = CATEGORY_STYLES[post.category]
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
              style={{ border: '1px solid rgba(13,148,136,0.12)', boxShadow: '0 1px 4px rgba(13,148,136,0.06)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(13,148,136,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,212,191,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(13,148,136,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,148,136,0.12)' }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <span className="self-start inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2.5"
                  style={{ background: cat.bg, color: cat.text }}>
                  {post.category}
                </span>
                <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2 leading-snug transition-colors"
                  style={{ color: '#0f1b2d' }}>
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed" style={{ color: 'rgba(15,27,45,0.5)' }}>
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(13,148,136,0.1)' }}>
                  <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(15,27,45,0.4)' }}>
                    <Clock className="w-3 h-3" />{post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#0d9488' }}>
                    Read more
                    <AnimatedArrow />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/* -------------------------------- Author bio -------------------------------- */

function AuthorBio({ post, bio }: { post: BlogPost; bio: string }) {
  const photo = AUTHOR_PHOTOS[post.author.name]
  return (
    <div className="mt-10 sm:mt-12 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl"
      style={{ background: 'linear-gradient(135deg, rgba(15,27,45,0.03) 0%, rgba(15,27,45,0.0) 100%)', border: '1px solid rgba(13,148,136,0.12)' }}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {photo ? (
          <img src={photo} alt={post.author.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-[#0d9488]/20" />
        ) : (
          <div className="p-3 rounded-full flex-shrink-0" style={{ background: 'rgba(13,148,136,0.1)' }}>
            <User className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#0d9488' }} />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: '#0f1b2d' }}>About the Author</h3>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}
            dangerouslySetInnerHTML={{ __html: bio }} />
          <div className="mt-3 flex items-center gap-2 text-[12.5px]" style={{ color: 'rgba(15,27,45,0.45)' }}>
            <span>{post.author.role}</span>
            <span style={{ color: '#2dd4bf' }}>·</span>
            <span>Emithran</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- Newsletter signup ---------------------------- */

function NewsletterSignup() {
  return (
    <div
      className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start gap-6 sm:gap-10 p-6 sm:p-8 rounded-xl"
      style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}
    >
      <div className="w-full sm:w-56 shrink-0">
        <h5 className="text-lg sm:text-xl font-bold leading-snug" style={{ color: '#0f1b2d' }}>
          Subscribe to learn more about Manufacturing Intelligence
        </h5>
      </div>
      <div className="flex-1 w-full">
        <form className="flex flex-col sm:flex-row gap-2.5" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 h-12 px-5 rounded-full text-sm focus:outline-none"
            style={{
              border: '1px solid rgba(13,148,136,0.25)',
              background: '#fff',
              color: '#0f1b2d',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          />
          <button
            type="submit"
            className="h-12 px-7 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200"
            style={{ background: '#0f1b2d', color: '#fff' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0d9488' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0f1b2d' }}
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(15,27,45,0.45)' }}>
          By clicking "Subscribe" you agree to Emithran's{' '}
          <Link href="/privacy" className="underline hover:opacity-70">Privacy Policy</Link>
          {' '}and consent to Emithran using your contact data for newsletter purposes.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------ Table of contents --------------------------- */

function TableOfContents({ contentRef }: { contentRef: React.RefObject<HTMLDivElement | null> }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const navRef = useRef<HTMLElement>(null)

  // Extract headings, assign IDs, track active via scroll
  useEffect(() => {
    const root = contentRef.current
    if (!root) return
    const headings = Array.from(root.querySelectorAll('h2, h3')) as HTMLElement[]
    const seen = new Set<string>()
    const list = headings.map(heading => {
      const base = (heading.textContent ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      let id = base
      let suffix = 1
      while (seen.has(id)) id = `${base}-${suffix++}`
      seen.add(id)
      heading.id = id
      return { id, text: heading.textContent ?? '', level: heading.tagName === 'H3' ? 3 : 2 }
    })
    setItems(list)
    if (list.length > 0) setActiveId(list[0].id)

    const onScroll = () => {
      // The last heading whose top edge has crossed the 108px mark
      // (just below the sticky navbar) is the currently-active section.
      let current = list[0]?.id ?? ''
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= 108) current = h.id
      }
      setActiveId(current)
    }

    // Use capture so this fires regardless of which element is scrolling
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    onScroll()
    return () => document.removeEventListener('scroll', onScroll, { capture: true })
  }, [contentRef])

  // Scroll the TOC nav so the active link stays visible inside the scrollable box.
  // We use getBoundingClientRect so the position is always relative to the nav
  // viewport, regardless of offsetParent ancestry.
  useEffect(() => {
    const nav = navRef.current
    if (!nav || !activeId) return
    const activeEl = nav.querySelector(`[data-toc="${activeId}"]`) as HTMLElement | null
    if (!activeEl) return
    const navRect = nav.getBoundingClientRect()
    const elRect  = activeEl.getBoundingClientRect()
    // Position of the element relative to the nav's inner scroll area
    const elTop    = elRect.top  - navRect.top  + nav.scrollTop
    const elBottom = elRect.bottom - navRect.top + nav.scrollTop
    if (elTop < nav.scrollTop) {
      nav.scrollTo({ top: elTop, behavior: 'smooth' })
    } else if (elBottom > nav.scrollTop + nav.clientHeight) {
      nav.scrollTo({ top: elBottom - nav.clientHeight, behavior: 'smooth' })
    }
  }, [activeId])

  if (items.length === 0) return null

  return (
    <div className="rounded-xl bg-white overflow-hidden" style={{ border: '1px solid rgba(13,148,136,0.15)' }}>
      <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(13,148,136,0.1)' }}>
        <h3 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#0f1b2d' }}>
          Table of Contents
        </h3>
      </div>
      <nav ref={navRef} className="overflow-y-auto relative" style={{ maxHeight: '210px' }}>
        {items.map((item, i) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              data-toc={item.id}
              href={`#${item.id}`}
              className="flex items-start text-[12px] py-2.5 leading-snug transition-all duration-150 line-clamp-2"
              style={{
                paddingLeft: item.level === 3 ? '24px' : '16px',
                paddingRight: '12px',
                borderLeft: isActive ? '3px solid #2dd4bf' : '3px solid transparent',
                borderBottom: i < items.length - 1 ? '1px solid rgba(13,148,136,0.07)' : 'none',
                color: isActive ? '#0d9488' : 'rgba(15,27,45,0.58)',
                fontWeight: isActive ? 600 : 400,
                background: isActive ? 'rgba(45,212,191,0.05)' : 'transparent',
              }}
            >
              {item.text}
            </a>
          )
        })}
      </nav>
    </div>
  )
}

/* ----------------------------------- Aside ---------------------------------- */

function Sidebar({ contentRef }: { contentRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-24 space-y-6">

        {/* Table of contents */}
        <TableOfContents contentRef={contentRef} />

        {/* Talk to us */}
        <div className="p-5 rounded-xl"
          style={{ background: '#000', border: '1px solid rgba(45,212,191,0.2)' }}>
          <h3 className="font-bold text-base mb-2 text-white">Have a part in mind?</h3>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Talk to our team about should-cost analysis, supplier intelligence, or BOM automation for your parts.
          </p>
          <Link href="/contact?source=blog&cta=talk-to-our-team-sidebar"
            className="flex items-center justify-center gap-2 w-full rounded-lg text-sm font-semibold py-3 px-4 transition-all duration-200"
            style={{ background: '#2dd4bf', color: '#0f1b2d' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5eead4' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2dd4bf' }}
          >
            <MessageCircle className="w-4 h-4" />
            Talk to Our Team
          </Link>
        </div>

        {/* Quick links */}
        <div className="p-5 rounded-xl" style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.12)' }}>
          <h3 className="font-bold text-base mb-3" style={{ color: '#0f1b2d' }}>Quick Links</h3>
          <div className="space-y-1.5">
            {[
              { label: 'Request a Demo', href: '/contact?source=blog&cta=request-a-demo-sidebar' },
              { label: 'Explore the Platform', href: '/products' },
              { label: 'Read Case Studies', href: '/case-studies' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-2 w-full rounded-md px-3 h-9 text-sm font-medium transition-colors"
                style={{ color: 'rgba(15,27,45,0.65)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,148,136,0.08)'; (e.currentTarget as HTMLElement).style.color = '#0d9488' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(15,27,45,0.65)' }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ----------------------------------- Page ----------------------------------- */

export default function BlogPostPage({ post, content }: { post: BlogPost; content: BlogPostContent }) {
  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 3)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <main style={{ background: '#fff' }}>
      <Hero post={post} heroImage={content.heroImage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          <article className="lg:col-span-9 max-w-full overflow-hidden">
            <ShareBar post={post} />

            <div ref={contentRef} className="blog-content mb-12" dangerouslySetInnerHTML={{ __html: content.content }} />
          </article>

          <Sidebar contentRef={contentRef} />
        </div>
      </div>

      <TalkToExpertsCard />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <RelatedArticles posts={related} />

        <AuthorBio post={post} bio={content.authorBio} />

        <NewsletterSignup />
      </div>
    </main>
  )
}

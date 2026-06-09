'use client'

import Link from 'next/link'
import {
  MessageCircle, Facebook, Twitter, Linkedin,
  ArrowUpRight, BookOpen, User, TrendingUp, ExternalLink, Clock,
  Gauge, Network, Truck, Sparkles,
} from 'lucide-react'
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
  const cat = CATEGORY_STYLES[post.category]
  return (
    <div className="relative w-full h-[420px] sm:h-[440px] md:h-[480px] overflow-hidden">
      <img
        src={heroImage}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg, rgba(15,27,45,0.94) 0%, rgba(15,27,45,0.72) 42%, rgba(15,27,45,0.32) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(15,27,45,0.5) 0%, transparent 45%)' }} />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-10 sm:pb-12">
        <div className="flex items-center gap-2 text-[13px] text-white/45 mb-5">
          <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
        </div>

        <span
          className="self-start inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
          style={{ background: 'rgba(45,212,191,0.16)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.3)' }}
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

const SHARE_BUTTONS = [
  { label: 'WhatsApp', icon: MessageCircle, hover: '#25D366' },
  { label: 'Facebook', icon: Facebook,      hover: '#1877F2' },
  { label: 'Twitter',  icon: Twitter,       hover: '#0EA5E9' },
  { label: 'LinkedIn', icon: Linkedin,      hover: '#0A66C2' },
]

function ShareBar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 pb-6"
      style={{ borderBottom: '1px solid rgba(13,148,136,0.12)' }}>
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap" style={{ color: 'rgba(15,27,45,0.5)' }}>
        Share this article:
      </span>
      <div className="flex items-center flex-wrap gap-2">
        {SHARE_BUTTONS.map(({ label, icon: Icon, hover }) => (
          <button
            key={label}
            type="button"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
            style={{ border: '1px solid rgba(15,27,45,0.12)', color: '#0f1b2d', background: '#fff' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = hover; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = hover }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#0f1b2d'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,27,45,0.12)' }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------ Talk-to-us card ----------------------------- */

function TalkToExpertsCard() {
  return (
    <div className="p-5 sm:p-6 md:p-8 mb-10 sm:mb-12 rounded-xl sm:rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(45,212,191,0.1) 0%, rgba(13,148,136,0.06) 100%)',
        border: '2px solid rgba(45,212,191,0.25)',
      }}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 rounded-full flex-shrink-0" style={{ background: 'rgba(13,148,136,0.12)' }}>
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#0d9488' }} />
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: '#0f1b2d' }}>
            Want to See This on Your Own Parts?
          </h3>
          <p className="text-sm sm:text-base mb-5 leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
            <strong style={{ color: '#0d9488' }}>Get a live demo</strong> of Emithran's Should-Cost Engine with a real component from your supply chain — should-cost, supplier intelligence, and BOM validation in 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact?source=blog&cta=request-a-demo"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 w-full sm:w-auto"
              style={{ background: '#0d9488', color: '#fff' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0f766e' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0d9488' }}
            >
              Request a Demo
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?source=blog&cta=talk-to-our-team"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-sm sm:text-base font-semibold transition-colors duration-200 w-full sm:w-auto"
              style={{ border: '1px solid #0d9488', color: '#0d9488', background: 'transparent' }}
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>
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
              <Thumbnail slug={post.slug} className="aspect-video w-full group-hover:scale-105 transition-transform duration-500" />
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

/* ----------------------------------- Aside ---------------------------------- */

function Sidebar({ post, popular }: { post: BlogPost; popular: BlogPost[] }) {
  return (
    <aside className="hidden lg:block lg:col-span-4">
      <div className="sticky top-24 space-y-6">

        {/* Talk to us */}
        <div className="p-5 rounded-xl"
          style={{ background: 'linear-gradient(135deg, #0f1b2d 0%, #0a2a26 100%)', border: '1px solid rgba(45,212,191,0.2)' }}>
          <h3 className="font-bold text-base mb-2 text-white">Have a part in mind? 💬</h3>
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

        {/* Popular articles */}
        <div className="p-5 rounded-xl bg-white" style={{ border: '1px solid rgba(13,148,136,0.12)' }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4" style={{ color: '#0d9488' }} />
            <h3 className="font-bold text-base" style={{ color: '#0f1b2d' }}>Popular Articles</h3>
          </div>
          <div className="space-y-3">
            {popular.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className={`group flex gap-3 ${i !== popular.length - 1 ? 'pb-3' : ''}`}
                style={i !== popular.length - 1 ? { borderBottom: '1px solid rgba(13,148,136,0.1)' } : undefined}
              >
                <Thumbnail slug={p.slug} className="w-14 h-14 rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs line-clamp-2 mb-1 leading-tight transition-colors"
                    style={{ color: '#0f1b2d' }}>
                    {p.title}
                  </h4>
                  <span className="text-xs" style={{ color: 'rgba(15,27,45,0.4)' }}>{p.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
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
  const popular = POSTS.filter(p => p.slug !== post.slug).slice(3, 6)

  return (
    <main style={{ background: '#fff' }}>
      <Hero post={post} heroImage={content.heroImage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          <article className="lg:col-span-8 max-w-full overflow-hidden">
            <ShareBar />

            <div className="blog-content mb-12" dangerouslySetInnerHTML={{ __html: content.content }} />

            <TalkToExpertsCard />

            <RelatedArticles posts={related} />

            <AuthorBio post={post} bio={content.authorBio} />
          </article>

          <Sidebar post={post} popular={popular} />
        </div>
      </div>
    </main>
  )
}

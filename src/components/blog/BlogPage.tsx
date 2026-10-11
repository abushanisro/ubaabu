'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { POSTS, type BlogCategory, type BlogPost } from './blogData'
import { blogFontVars } from './wiredFonts'
import './wired.css'

const CATEGORIES: BlogCategory[] = ['All', 'Corporate', 'Engineering', 'Industry', 'Product']

const RULE = '1px solid #e2e2e2'

function Byline({ post, className = '' }: { post: BlogPost; className?: string }) {
  return (
    <p className={`wired-mono text-[11px] font-medium text-black ${className}`}>
      By {post.author.name}
    </p>
  )
}

function Kicker({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`wired-mono text-[11px] font-medium text-black mb-2 ${className}`}>{children}</p>
}

/** Black label hanging off a black rule, e.g. "Today's Picks". */
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1.5px solid #000' }}>
      <h2 className="wired-mono inline-block bg-black text-white text-[12px] font-semibold px-3 py-1.5">{children}</h2>
    </div>
  )
}

/* ------------------------------- Lead story ------------------------------- */

function LeadStory({ post }: { post: BlogPost }) {
  return (
    <article className="text-center">
      <Kicker className="mb-4">{post.category}</Kicker>
      <Link href={`/blog/${post.slug}`} className="block wired-link">
        <h2 className="wired-display text-black text-[34px] sm:text-[42px] xl:text-[50px] leading-[1.02] max-w-[640px] mx-auto">
          {post.title}
        </h2>
      </Link>
      <p className="wired-serif mt-5 mx-auto max-w-[620px] text-[16px] sm:text-[17px] leading-[1.6] text-[#333]">
        {post.excerpt}
      </p>
      <Byline post={post} className="mt-5" />
      <Link href={`/blog/${post.slug}`} className="relative block mt-7 w-full aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={post.image}
          alt={post.imageAlt ?? post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </Link>
    </article>
  )
}

/* ------------------ Today's picks: image + kicker stories ------------------ */

function ThumbStory({ post, last }: { post: BlogPost; last?: boolean }) {
  return (
    <article className="flex gap-4 py-6" style={{ borderBottom: last ? 'none' : RULE }}>
      <Link href={`/blog/${post.slug}`} className="relative shrink-0 w-[112px] h-[112px] sm:w-[136px] sm:h-[136px] overflow-hidden bg-black">
        <Image src={post.image} alt={post.imageAlt ?? post.title} fill sizes="136px" className="object-cover" />
      </Link>
      <div className="min-w-0">
        <Kicker>{post.category}</Kicker>
        <Link href={`/blog/${post.slug}`} className="wired-link">
          <h3 className="wired-display text-black text-[22px] sm:text-[24px] leading-[1.12]">{post.title}</h3>
        </Link>
        <Byline post={post} className="mt-3" />
      </div>
    </article>
  )
}

/* ---------------- Trending stories: text-only SEO headlines ---------------- */

function TrendingStory({ post, last }: { post: BlogPost; last?: boolean }) {
  return (
    <article className="py-5" style={{ borderBottom: last ? 'none' : RULE }}>
      <Link href={`/blog/${post.slug}`} className="wired-link">
        <h3 className="wired-display text-black text-[22px] sm:text-[24px] leading-[1.15]">{post.title}</h3>
      </Link>
      <Byline post={post} className="mt-3" />
    </article>
  )
}

/* ---------------- Editor's pick: big image + centred copy ---------------- */

function FeatureStory({ post }: { post: BlogPost }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8">
      <Link href={`/blog/${post.slug}`} className="lg:col-span-7 relative block w-full aspect-[16/9] overflow-hidden bg-black">
        <Image src={post.image} alt={post.imageAlt ?? post.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
      </Link>
      <div className="lg:col-span-5 text-center px-2 lg:px-6">
        <Kicker className="mb-4">{post.category}</Kicker>
        <Link href={`/blog/${post.slug}`} className="wired-link">
          <h3 className="wired-display text-black text-[32px] sm:text-[40px] leading-[1.04]">{post.title}</h3>
        </Link>
        <p className="wired-serif mt-5 text-[16px] sm:text-[17px] leading-[1.6] text-[#333]">
          <em>Published {post.date}:</em> {post.excerpt}
        </p>
        <Byline post={post} className="mt-5" />
      </div>
    </article>
  )
}

function RowStory({ post }: { post: BlogPost }) {
  return (
    <article className="flex gap-4 py-6 xl:px-6 xl:first:pl-0 xl:last:pr-0">
      <div className="min-w-0 flex-1">
        <Kicker>{post.category}</Kicker>
        <Link href={`/blog/${post.slug}`} className="wired-link">
          <h3 className="wired-display text-black text-[21px] leading-[1.12]">{post.title}</h3>
        </Link>
        <Byline post={post} className="mt-3" />
      </div>
      <Link href={`/blog/${post.slug}`} className="relative shrink-0 w-[96px] h-[96px] xl:w-[112px] xl:h-[112px] overflow-hidden bg-black">
        <Image src={post.image} alt={post.imageAlt ?? post.title} fill sizes="112px" className="object-cover" />
      </Link>
    </article>
  )
}

/* ------------------------------ Grid card ------------------------------ */

function GridStory({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="relative block w-full aspect-[3/2] overflow-hidden bg-black">
        <Image src={post.image} alt={post.imageAlt ?? post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
      </Link>
      <div className="mt-4">
        <Kicker>{post.category}</Kicker>
        <Link href={`/blog/${post.slug}`} className="wired-link">
          <h3 className="wired-display text-black text-[22px] leading-[1.12]">{post.title}</h3>
        </Link>
        <p className="wired-serif mt-2 text-[15px] leading-[1.55] text-[#555] line-clamp-3">{post.excerpt}</p>
        <Byline post={post} className="mt-3" />
      </div>
    </article>
  )
}

/* ---------------------------------- Page ---------------------------------- */

export default function BlogPage({ trendingSlugs }: { trendingSlugs: string[] }) {
  const [active, setActive] = useState<BlogCategory>('All')

  const posts = POSTS.filter(p => active === 'All' || p.category === active)
  const lead = posts.find(p => p.featured) ?? posts[0]

  // Trending is site-wide (hand-written SEO articles, newest first) and ignores the category filter.
  const trending = trendingSlugs
    .filter(slug => slug !== lead?.slug)
    .slice(0, 6)
    .map(slug => POSTS.find(p => p.slug === slug))
    .filter((p): p is BlogPost => Boolean(p))

  const pool = posts.filter(p => p !== lead && !trending.includes(p))
  const picks = pool.slice(0, 4)
  const feature = pool[4]
  const row = pool.slice(5, 9)
  const latest = pool.slice(9)

  return (
    <main className={`${blogFontVars} min-h-screen bg-white text-black pt-16`}>

      {/* Promo strip */}
      <div className="bg-black text-white">
        <div className="flex items-center justify-center gap-4 h-11 px-4">
          <span className="wired-mono text-[11px] font-semibold">Emithran Insights</span>
          <span className="w-px h-5 bg-white/30" aria-hidden />
          <Link href="/contact?source=blog-listing&cta=book-a-demo" className="wired-mono text-[11px] font-semibold hover:underline">
            Book a demo »
          </Link>
        </div>
      </div>

      {/* Section nav / category filter */}
      <nav aria-label="Blog categories" style={{ borderBottom: RULE }}>
        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 flex items-center gap-6 sm:gap-8 h-14 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <h1 className="wired-display text-[26px] leading-none shrink-0 pr-2">
            <span className="inline-block bg-black text-white px-2 py-0.5">BLOG</span>
          </h1>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className="wired-mono text-[12px] font-medium whitespace-nowrap h-full transition-colors hover:text-black"
              style={{
                color: active === cat ? '#000' : 'rgba(0,0,0,0.5)',
                boxShadow: active === cat ? 'inset 0 -3px 0 #000' : 'none',
              }}
            >
              {cat === 'All' ? 'Latest' : cat}
            </button>
          ))}
        </div>
      </nav>

      {!lead ? (
        <p className="wired-mono text-center text-[12px] py-32 text-black/50">No stories in this section yet.</p>
      ) : (
        <>
          {/* Front page: Today's Picks (picks + lead) | Trending Stories */}
          <section className="max-w-[1480px] mx-auto px-4 sm:px-8 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12">
              <div className="lg:col-span-9 lg:pr-8 lg:border-r border-[#e2e2e2]">
                <SectionTag>Today&apos;s Picks</SectionTag>
                <div className="grid grid-cols-1 lg:grid-cols-9">
                  <div className="order-2 lg:order-1 lg:col-span-3 lg:pr-8 lg:border-r border-[#e2e2e2]">
                    {picks.map((p, i) => <ThumbStory key={p.slug} post={p} last={i === picks.length - 1} />)}
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-6 pt-8 pb-6 lg:pl-8">
                    <LeadStory post={lead} />
                  </div>
                </div>
              </div>

              {trending.length > 0 && (
                <aside className="lg:col-span-3 lg:pl-8" aria-label="Trending stories">
                  <SectionTag>Trending Stories</SectionTag>
                  <div className="pt-1">
                    {trending.map((p, i) => <TrendingStory key={p.slug} post={p} last={i === trending.length - 1} />)}
                  </div>
                </aside>
              )}
            </div>
          </section>

          {/* Editor's pick */}
          {feature && (
            <section className="max-w-[1480px] mx-auto px-4 sm:px-8 pt-14">
              <SectionTag>Editor&apos;s Pick</SectionTag>
              <FeatureStory post={feature} />
              {row.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 sm:gap-x-8 xl:gap-x-0 xl:divide-x divide-[#e2e2e2]" style={{ borderTop: RULE }}>
                  {row.map(p => <RowStory key={p.slug} post={p} />)}
                </div>
              )}
            </section>
          )}

          {/* Demo band */}
          <section className="bg-black text-white mt-14">
            <div className="max-w-[1480px] mx-auto px-4 sm:px-8 py-14 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="wired-mono text-[11px] font-medium text-white/70 mb-4">Platform demo</p>
                <h2 className="wired-display text-[34px] sm:text-[46px] leading-[1.02]">
                  See Emithran in Action With Your Own Part Data
                </h2>
                <p className="wired-serif mt-4 text-[17px] leading-[1.55] text-white/75 max-w-2xl">
                  Should-cost, supplier intelligence, and BOM validation on a real component from your supply chain, in 30 minutes.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/contact?source=blog-listing&cta=book-a-demo"
                  className="wired-mono inline-block bg-white text-black text-[12px] font-semibold px-7 py-4 hover:bg-[#2dd4bf] transition-colors"
                >
                  Book a demo »
                </Link>
              </div>
            </div>
          </section>

          {/* The latest */}
          {latest.length > 0 && (
            <section className="max-w-[1480px] mx-auto px-4 sm:px-8 pt-16">
              <SectionTag>The Latest</SectionTag>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-8">
                {latest.map(p => <GridStory key={p.slug} post={p} />)}
              </div>
            </section>
          )}

          {/* Case studies */}
          <section className="max-w-[1480px] mx-auto px-4 sm:px-8 pt-16 pb-20">
            <SectionTag>Case Studies</SectionTag>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((cs, i) => (
                <article
                  key={cs.href}
                  className={`py-6 sm:pr-6 ${i % 3 !== 0 ? 'lg:pl-6' : ''} border-[#e2e2e2] ${i % 3 !== 2 ? 'lg:border-r' : ''}`}
                  style={{ borderBottom: RULE }}
                >
                  <Kicker>{cs.tag}</Kicker>
                  <Link href={cs.href} className="wired-link">
                    <h3 className="wired-display text-black text-[22px] leading-[1.12]">{cs.title}</h3>
                  </Link>
                  <p className="wired-serif mt-2 text-[15px] leading-[1.55] text-[#555] line-clamp-3">{cs.body}</p>
                  <p className="wired-mono mt-3 text-[11px] font-medium">{cs.date}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

const CASE_STUDIES = [
  {
    title: 'India vs Belgium: 38% Landed Cost Saving on HGV Chassis Rails',
    date: 'June 2, 2026',
    body: 'By benchmarking India roll forming against Belgium manufacturing, Emithran identified a 38% total landed cost advantage including full DDP logistics from Chennai to Scotland.',
    tag: 'Automotive',
    href: '/case-studies/chassis-india-belgium',
  },
  {
    title: 'Should Costing for Exhaust System: Titanium vs Stainless Steel',
    date: 'May 28, 2026',
    body: 'A should-cost comparison of titanium and stainless steel for a high-performance automotive exhaust assembly at 300 units a year in the UK identified a £1.3m annual saving.',
    tag: 'Automotive',
    href: '/case-studies/exhaust-system',
  },
  {
    title: 'HGV Chassis Ladder Frame: India vs Northern Europe Rail Cost',
    date: 'May 20, 2026',
    body: 'Northern Europe vs India cost comparison across 74 BOM line items for an electric HGV chassis ladder frame, identifying a 38% reduction in manufacturing cost for rails produced in India.',
    tag: 'Automotive',
    href: '/case-studies/hgv-chassis',
  },
  {
    title: 'Aerospace DC-DC Converter: VAVE Analysis Saves 22% per Unit',
    date: 'May 12, 2026',
    body: "Full teardown, component-level should costing and 13 VAVE ideas for an electric two-wheeler OEM's DC-DC converter, including a 39% body cost reduction and a 28% PCBA cost reduction.",
    tag: 'Aerospace',
    href: '/case-studies/dc-dc-converter',
  },
  {
    title: 'Electronics & PCB Should-Cost Teardown: Radar Sensor, EV BTMS and Wire Harness',
    date: 'April 30, 2026',
    body: 'Component-level teardown, bare PCB benchmarking, PCBA should costing and wire harness costing across a radar sensor and an EV BTMS, with a lower-cost PCB technology found at $8.07 against $19.89.',
    tag: 'Electronics',
    href: '/case-studies/electronics-teardown',
  },
  {
    title: 'LCV Rear Axle Should-Cost: $244 per Unit Assembly',
    date: 'March 22, 2026',
    body: 'Full assembly should-cost for a 2-tonne LCV rear drive axle - 51.2 kg, 40,000 units a year, India manufacturing - with the drive head / carrier assembly at 46% as the primary cost driver.',
    tag: 'Automotive',
    href: '/case-studies/rear-axle-should-cost',
  },
]

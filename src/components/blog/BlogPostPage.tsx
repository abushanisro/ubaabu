'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Facebook, Twitter, Linkedin, Link2, Check, X } from 'lucide-react'
import { track } from '@/lib/analytics'
import { POSTS, type BlogPost } from './blogData'
import type { BlogPostContent, BlogPostFAQ } from './blogContent'
import { relatedLinksForBlog } from '@/lib/internalLinks'
import { blogFontVars } from './wiredFonts'
import './wired.css'

const RULE = '1px solid #e2e2e2'

const AUTHOR_PHOTOS: Record<string, string> = {
  'Abushan': '/assets/infographics/logo/abushan.png',
  'Singaravelan S.': '/assets/infographics/logo/sinigi.png',
}

/* -------------------------------- Sharing -------------------------------- */

const SITEURL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

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
  { label: 'WhatsApp', icon: MessageCircle },
  { label: 'Facebook', icon: Facebook },
  { label: 'Twitter',  icon: Twitter },
  { label: 'LinkedIn', icon: Linkedin },
]

function ShareIcons({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false)
  const pageUrl = `${SITEURL}/blog/${post.slug}`

  function handleShare(platform: string) {
    window.open(buildShareUrl(platform, pageUrl, post.title), '_blank', 'noopener,noreferrer,width=640,height=500')
    track.shareArticle(platform, post.slug, post.title)
  }

  function handleCopy() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true)
      track.shareArticle('copy_link', post.slug, post.title)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const btn = 'w-10 h-10 flex items-center justify-center border border-[#d6d6d6] text-black hover:bg-black hover:text-white hover:border-black transition-colors'

  return (
    <div className="flex items-center gap-2">
      {SHARE_PLATFORMS.map(({ label, icon: Icon }) => (
        <button key={label} type="button" onClick={() => handleShare(label)} aria-label={`Share on ${label}`} className={btn}>
          <Icon className="w-4 h-4" />
        </button>
      ))}
      <button type="button" onClick={handleCopy} aria-label="Copy link" className={btn}>
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero({ post, heroImage }: { post: BlogPost; heroImage: string }) {
  return (
    <header style={{ borderBottom: RULE }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1600px] mx-auto">
        {/* Text */}
        <div className="order-2 lg:order-1 flex flex-col justify-center px-4 sm:px-8 lg:pl-[8.5%] lg:pr-12 py-10 lg:py-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
            <span className="wired-mono bg-black text-white text-[11px] font-semibold px-2.5 py-1.5">
              {post.author.name}
            </span>
            <Link href="/blog" className="wired-mono text-[11px] font-medium text-black hover:underline">
              {post.category}
            </Link>
            <time className="wired-mono text-[11px] font-medium text-black">{post.date}</time>
          </div>

          <h1 className="wired-display text-black text-[40px] sm:text-[52px] xl:text-[60px] leading-[1.0] max-w-[620px]">
            {post.title}
          </h1>

          <p className="mt-6 max-w-[540px] text-[18px] sm:text-[20px] leading-[1.5] font-semibold text-[#333]">
            {post.excerpt}
          </p>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 lg:pr-[8.5%]">
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px]">
            <Image src={heroImage} alt={post.imageAlt ?? post.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------ Table of contents --------------------------- */

function TableOfContents({ contentRef }: { contentRef: React.RefObject<HTMLDivElement | null> }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>('')

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

    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    onScroll()
    return () => document.removeEventListener('scroll', onScroll, { capture: true })
  }, [contentRef])

  const sections = items.filter(i => i.level === 2)
  if (sections.length === 0) return null

  return (
    <nav aria-label="In this story">
      <p className="wired-mono text-[11px] font-semibold pb-3" style={{ borderBottom: '1px solid #000' }}>In this story</p>
      <ol>
        {sections.map((item, i) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id} style={{ borderBottom: RULE }}>
              <a
                href={`#${item.id}`}
                className="flex gap-3 py-3 wired-display text-[19px] leading-[1.15] transition-colors"
                style={{ color: isActive ? '#000' : 'rgba(0,0,0,0.45)' }}
              >
                <span className="wired-mono text-[10px] font-medium pt-1.5 shrink-0" style={{ letterSpacing: '0.08em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ------------------------- Related Emithran pages ------------------------- */

function RelatedSolutions({ slug }: { slug: string }) {
  const links = relatedLinksForBlog(slug)
  return (
    <section aria-labelledby="related-emithran-heading" className="mt-14 pt-4" style={{ borderTop: '1px solid #000' }}>
      <h2 id="related-emithran-heading" className="wired-mono text-[11px] font-semibold mb-2">Related on Emithran</h2>
      <ul>
        {links.map(link => (
          <li key={link.href} className="py-4" style={{ borderBottom: RULE }}>
            <Link href={link.href} className="wired-display wired-link text-[24px] leading-[1.1] text-black">{link.label}</Link>
            <p className="wired-serif text-[16px] mt-1 text-[#555]">{link.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------------------------- FAQ ------------------------------------- */

function FAQSection({ faqs }: { faqs: BlogPostFAQ[] }) {
  return (
    <section className="mt-14 pt-4" style={{ borderTop: '1px solid #000' }}>
      <h2 className="wired-mono text-[11px] font-semibold mb-2">Frequently asked questions</h2>
      {faqs.map(faq => (
        <div key={faq.question} className="py-5" style={{ borderBottom: RULE }}>
          <h3 className="wired-display text-[24px] leading-[1.1] text-black mb-2">{faq.question}</h3>
          <p className="wired-serif text-[17px] leading-[1.6] text-[#333]">{faq.answer}</p>
        </div>
      ))}
    </section>
  )
}

/* -------------------------------- Author bio -------------------------------- */

function AuthorBio({ post, bio }: { post: BlogPost; bio: string }) {
  const photo = AUTHOR_PHOTOS[post.author.name]
  return (
    <section className="mt-14 pt-6 flex gap-5" style={{ borderTop: '1px solid #000' }}>
      {photo && (
        <Image src={photo} alt={post.author.name} width={72} height={72} className="w-[72px] h-[72px] object-cover shrink-0 grayscale" />
      )}
      <div>
        <span className="wired-mono inline-block bg-black text-white text-[11px] font-semibold px-2.5 py-1.5 mb-3">
          {post.author.name}
        </span>
        <p className="wired-serif text-[17px] leading-[1.6] text-[#333]" dangerouslySetInnerHTML={{ __html: bio }} />
        <p className="wired-mono mt-3 text-[11px] font-medium text-black/60">
          {post.author.role} · Emithran ·{' '}
          <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer me" className="text-black hover:underline">LinkedIn</a>
          {' '}· Last updated {post.date}
        </p>
      </div>
    </section>
  )
}

/* ----------------------------- Newsletter signup ---------------------------- */

function NewsletterSignup() {
  return (
    <section className="mt-14 p-6 sm:p-8 bg-[#f3f3f3]">
      <p className="wired-mono text-[11px] font-semibold mb-3">Newsletter</p>
      <h2 className="wired-display text-[32px] leading-[1.02] text-black max-w-md">
        Get the Manufacturing Intelligence Briefing
      </h2>
      <form className="mt-5 flex flex-col sm:flex-row gap-0" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          placeholder="Your email"
          aria-label="Your email"
          className="flex-1 h-12 px-4 text-[15px] bg-white border border-black focus:outline-none"
        />
        <button type="submit" className="wired-mono h-12 px-7 bg-black text-white text-[12px] font-semibold hover:bg-[#0d9488] transition-colors">
          Sign up
        </button>
      </form>
      <p className="mt-3 text-[12px] leading-relaxed text-black/55">
        By clicking &quot;Sign up&quot; you agree to Emithran&apos;s{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>
        {' '}and consent to Emithran using your contact data for newsletter purposes.
      </p>
    </section>
  )
}

/* ------------------------------ Talk-to-us band ----------------------------- */

function TalkToExpertsBand() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-14 text-center">
        <p className="wired-mono text-[11px] font-medium text-white/70 mb-4">Have a part in mind?</p>
        <h2 className="wired-display text-[40px] sm:text-[56px] leading-[0.98] max-w-3xl mx-auto">
          Want to See This on Your Own Parts?
        </h2>
        <Link
          href="/contact?source=blog&cta=request-a-demo"
          className="wired-mono inline-block mt-8 bg-white text-black text-[13px] font-semibold px-7 py-4 hover:bg-[#2dd4bf] transition-colors"
        >
          Request a demo »
        </Link>
      </div>
    </section>
  )
}

/* ----------------------------- Related articles ----------------------------- */

function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-8 py-16">
      <h2 className="wired-display text-black text-[40px] sm:text-[48px] leading-none pb-3 mb-8" style={{ borderBottom: '1px solid #000' }}>
        More From Emithran
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {posts.map(p => (
          <article key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="relative block w-full aspect-[3/2] overflow-hidden bg-black">
              <Image src={p.image} alt={p.imageAlt ?? p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </Link>
            <p className="wired-mono mt-4 mb-2 text-[11px] font-medium">{p.category}</p>
            <Link href={`/blog/${p.slug}`} className="wired-link">
              <h3 className="wired-display text-black text-[24px] leading-[1.1]">{p.title}</h3>
            </Link>
            <p className="wired-mono mt-3 text-[11px] font-medium">By {p.author.name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------ Bottom promo bar ----------------------------- */

function PromoBar() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-12 z-40 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-center gap-3 px-10 py-3.5 text-center text-[13px] sm:text-[14px] text-black/80">
        <p>
          Cost, suppliers, and BOMs in one place. <strong className="text-black">Get Emithran today.</strong>{' '}
          <Link href="/contact?source=blog&cta=promo-bar" className="wired-mono font-semibold text-black underline underline-offset-4 text-[12px]">
            Book a demo
          </Link>
        </p>
        <button type="button" onClick={() => setOpen(false)} aria-label="Dismiss" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/60 hover:text-black">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* ----------------------------------- Page ----------------------------------- */

export default function BlogPostPage({ post, content }: { post: BlogPost; content: BlogPostContent }) {
  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 4)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <main className={`${blogFontVars} wired-article bg-white text-black pt-16`}>
      <Hero post={post} heroImage={content.heroImage} />

      {/* Caption / utility row */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[8.5%] py-4 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: RULE }}>
        <p className="wired-mono text-[11px] font-medium text-black/70">
          <Link href="/blog" className="hover:underline">Blog</Link> · {post.category} · {post.readTime}
        </p>
        <ShareIcons post={post} />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[8.5%] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <article className="lg:col-span-8 max-w-[720px] min-w-0">
            <div ref={contentRef} className="blog-content" dangerouslySetInnerHTML={{ __html: content.content }} />

            <RelatedSolutions slug={post.slug} />

            {content.faqs && content.faqs.length > 0 && <FAQSection faqs={content.faqs} />}

            <AuthorBio post={post} bio={content.authorBio} />

            <NewsletterSignup />
          </article>

          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-10">
              <TableOfContents contentRef={contentRef} />
              <div className="bg-black text-white p-6">
                <p className="wired-mono text-[11px] font-semibold text-white/70 mb-3">Talk to our team</p>
                <p className="wired-display text-[26px] leading-[1.05]">
                  Should-cost, supplier intelligence, or BOM automation for your parts.
                </p>
                <Link
                  href="/contact?source=blog&cta=talk-to-our-team-sidebar"
                  className="wired-mono inline-block mt-5 bg-white text-black text-[12px] font-semibold px-5 py-3 hover:bg-[#2dd4bf] transition-colors"
                >
                  Get in touch »
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <TalkToExpertsBand />

      <RelatedArticles posts={related} />

      <PromoBar />
    </main>
  )
}

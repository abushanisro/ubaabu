'use client'

import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { FAQ_CATEGORIES, type FAQItem, type FAQCategory } from './faqData'

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className="shrink-0 transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AccordionItem({ item, open, onToggle }: { item: FAQItem; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        style={{ color: open ? '#0d9488' : '#0f1b2d' }}
      >
        <span className="text-[15px] font-semibold leading-snug group-hover:text-[#0d9488] transition-colors">
          {item.question}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? 600 : 0 }}
      >
        <p className="pb-5 text-[14px] leading-relaxed" style={{ color: 'rgba(15,27,45,0.6)' }}>
          {item.answer}
        </p>
      </div>
    </div>
  )
}

function CategorySection({ cat, openItems, onToggle }: { cat: FAQCategory; openItems: Set<string>; onToggle: (id: string) => void }) {
  return (
    <section id={cat.id} className="scroll-mt-28">
      <h2 className="text-xl font-bold mb-1" style={{ color: '#0f1b2d' }}>{cat.label}</h2>
      <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: 'linear-gradient(90deg,#0d9488,#2dd4bf)' }} />
      <div>
        {cat.items.map(item => (
          <AccordionItem
            key={item.id}
            item={item}
            open={openItems.has(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const searchRef = useRef<HTMLInputElement>(null)

  function toggleItem(id: string) {
    setOpenItems(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return FAQ_CATEGORIES
    const q = search.toLowerCase()
    return FAQ_CATEGORIES
      .map(cat => ({
        ...cat,
        items: cat.items.filter(
          item => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.items.length > 0)
  }, [search])

  const totalCount = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0)

  return (
    <main className="min-h-screen" style={{ background: '#fff' }}>

      {/* ── Hero band ── */}
      <div className="relative overflow-hidden pt-28 pb-14" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fff' }}>

        {/* Decorative diagonal background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1440 380"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer teal diagonal band */}
          <polygon points="0,260 0,380 1440,110 1440,0" fill="rgba(45,212,191,0.11)" />
          {/* Inner teal diagonal band (sharper) */}
          <polygon points="0,310 0,380 1440,155 1440,85" fill="rgba(13,148,136,0.08)" />
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(15,27,45,0.4)' }}>
            <Link href="/" className="hover:text-[#0d9488] transition-colors">Emithran</Link>
            <span>›</span>
            <span style={{ color: 'rgba(15,27,45,0.7)', fontWeight: 500 }}>FAQ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3" style={{ color: '#0f1b2d' }}>
            Frequently asked questions
          </h1>
          <p className="text-[15px] mb-8" style={{ color: 'rgba(15,27,45,0.5)' }}>
            {totalCount} answers across {FAQ_CATEGORIES.length} topics.
          </p>
          <div
            className="flex items-center gap-3 max-w-xl rounded-xl px-4 py-3"
            style={{ border: '1.5px solid rgba(13,148,136,0.25)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(13,148,136,0.07)' }}
          >
            <span style={{ color: 'rgba(15,27,45,0.35)' }}><SearchIcon /></span>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions…"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-black/30"
              style={{ color: '#0f1b2d' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-black/30 hover:text-black/60 transition-colors text-lg leading-none">×</button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body: flex row ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {/* flex-row: aside stretches to full height of main, making sticky work */}
        <div className="flex gap-12 items-stretch">

          {/* Main Q&A */}
          <div className="flex-1 min-w-0 flex flex-col gap-12">
            {filtered.length > 0
              ? filtered.map(cat => (
                <CategorySection key={cat.id} cat={cat} openItems={openItems} onToggle={toggleItem} />
              ))
              : (
                <div className="py-20 text-center">
                  <p className="text-[15px]" style={{ color: 'rgba(15,27,45,0.4)' }}>
                    No results for <strong style={{ color: '#0f1b2d' }}>"{search}"</strong> — try a different term.
                  </p>
                  <button onClick={() => setSearch('')} className="mt-4 text-sm font-semibold" style={{ color: '#0d9488' }}>
                    Clear search
                  </button>
                </div>
              )
            }
          </div>

          {/* Sidebar — Topics only, sticky */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 flex flex-col gap-6">

              {/* Topics */}
              <div className="rounded-xl p-5" style={{ border: '1px solid rgba(0,0,0,0.07)', background: '#fafffe' }}>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#0d9488' }}>
                  Topics
                </h3>
                <ul className="flex flex-col gap-1">
                  {FAQ_CATEGORIES.map(cat => (
                    <li key={cat.id}>
                      <a
                        href={`#${cat.id}`}
                        className="flex items-center justify-between text-[13px] py-1.5 px-2 rounded-lg transition-all duration-150"
                        style={{ color: 'rgba(15,27,45,0.65)' }}
                        onMouseEnter={e => {
                          ;(e.currentTarget as HTMLElement).style.background = 'rgba(13,148,136,0.07)'
                          ;(e.currentTarget as HTMLElement).style.color = '#0d9488'
                        }}
                        onMouseLeave={e => {
                          ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                          ;(e.currentTarget as HTMLElement).style.color = 'rgba(15,27,45,0.65)'
                        }}
                      >
                        <span>{cat.label}</span>
                        <span className="text-[11px] font-semibold tabular-nums" style={{ color: 'rgba(15,27,45,0.3)' }}>
                          {cat.items.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact support */}
              <div className="rounded-xl p-5" style={{ background: '#0f1b2d' }}>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: '#2dd4bf' }}>
                  Contact support
                </p>
                <p className="text-[13px] mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Can't find what you need? Our team replies within one business day.
                </p>
                <a
                  href="mailto:contact@emithran.in"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
                  style={{ color: '#2dd4bf' }}
                >
                  contact@emithran.in
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M0 5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <Link
                    href="/contact"
                    className="block text-center text-[13px] font-semibold py-2 rounded-lg transition-colors"
                    style={{ background: 'rgba(45,212,191,0.12)', color: '#2dd4bf' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.2)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.12)' }}
                  >
                    Open a support ticket
                  </Link>
                </div>
              </div>

              {/* Also useful */}
              <div className="rounded-xl p-5" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(15,27,45,0.4)' }}>
                  Also useful
                </h3>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: 'Blog',         href: '/blog'          },
                    { label: 'Case Studies', href: '/case-studies'  },
                    { label: 'Pricing',      href: '/pricing'       },
                    { label: 'Contact Us',   href: '/contact'       },
                  ].map(l => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="flex items-center gap-1.5 text-[13px] transition-colors"
                        style={{ color: 'rgba(15,27,45,0.55)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0d9488' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(15,27,45,0.55)' }}
                      >
                        <span style={{ color: '#0d9488' }}>→</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ── CTA section ── */}
      <section style={{ background: '#0f1b2d' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

            {/* Contact support */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#2dd4bf' }}>
                Contact support
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: '#ffffff' }}>
                Still have questions?
              </h2>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Our engineering and product team replies within one business day. For enterprise enquiries, we offer same-day response.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:contact@emithran.in"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors"
                  style={{ background: '#0d9488', color: '#fff' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0b8076' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0d9488' }}
                >
                  <svg width="14" height="14" viewBox="0 0 20 16" fill="none">
                    <rect x="1" y="1" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M1 4l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Email us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors"
                  style={{ background: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.18)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.1)' }}
                >
                  Open a support ticket
                </Link>
              </div>
              <p className="mt-5 text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                contact@emithran.in · +91 98765 43210 · Bangalore, India
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Also useful
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Blog',          sub: 'Insights & deep dives',   href: '/blog'         },
                  { label: 'Case Studies',  sub: 'Real outcomes',           href: '/case-studies' },
                  { label: 'Pricing',       sub: 'Plans & add-ons',         href: '/pricing'      },
                  { label: 'Contact',       sub: 'Get in touch',            href: '/contact'      },
                  { label: 'Products',      sub: 'Platform overview',       href: '/products'     },
                  { label: 'Why Emithran?', sub: 'Our approach',            href: '/why-emithran' },
                ].map(l => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="flex flex-col gap-0.5 p-3 rounded-xl transition-all duration-150"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.08)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,212,191,0.2)'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                      }}
                    >
                      <span className="text-[13px] font-semibold" style={{ color: '#fff' }}>{l.label}</span>
                      <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{l.sub}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PILLARS, itemsForPillar, pillarBySlug, type ContentItem } from '@/lib/topics'
import { ogImages } from '@/lib/seo'
import { orgRef, SITE_URL } from '@/lib/schema'

/**
 * Pillar hub pages (SEO audit Nov 2026, issue #05): one per pillar of the topical map.
 * Each hub links to every spoke tagged to the pillar (guides, glossary terms, product
 * pages, comparisons, case studies, templates), so internal authority flows to them.
 */
export function generateStaticParams() {
  return PILLARS.map((p) => ({ slug: p.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = pillarBySlug(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/topics/${p.slug}` },
    openGraph: { images: ogImages, title: `${p.title} | Emithran`, description: p.description, url: `/topics/${p.slug}`, type: 'website', siteName: 'Emithran', locale: 'en_US' },
  }
}

const GROUPS: { kind: ContentItem['kind'][]; heading: string }[] = [
  { kind: ['product'], heading: 'Software and solutions' },
  { kind: ['guide'], heading: 'Guides' },
  { kind: ['glossary'], heading: 'Key terms' },
  { kind: ['comparison'], heading: 'Comparisons' },
  { kind: ['case-study', 'report'], heading: 'Case studies and research' },
  { kind: ['download'], heading: 'Templates and calculators' },
]

export default async function PillarHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = pillarBySlug(slug)
  if (!p) notFound()
  const items = itemsForPillar(p.slug)
  const others = PILLARS.filter((x) => x.slug !== p.slug)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Topics', item: `${SITE_URL}/topics` },
        { '@type': 'ListItem', position: 3, name: p.h1, item: `${SITE_URL}/topics/${p.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: p.h1,
      description: p.description,
      url: `${SITE_URL}/topics/${p.slug}`,
      publisher: orgRef,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((i, idx) => ({ '@type': 'ListItem', position: idx + 1, url: `${SITE_URL}${i.href}`, name: i.title })),
      },
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-white text-[#0f1b2d]">
        <section className="pt-28 pb-12 border-b border-black/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-black/45">
              <Link href="/topics" className="inline-flex min-h-11 items-center hover:text-[#0d9488]">Topics</Link>
              <span>/</span>
              <span className="text-black/70">{p.name}</span>
            </nav>
            <h1 className="mt-4 max-w-4xl text-4xl md:text-5xl font-bold tracking-tight leading-tight">{p.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-black/65">{p.summary}</p>
            <Link href={p.moneyPage.href} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
              {p.moneyPage.label}
            </Link>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            {p.sections.map((s) => (
              <div key={s.heading} className="mt-8 first:mt-0">
                <h2 className="text-2xl font-bold tracking-tight">{s.heading}</h2>
                {s.paragraphs.map((para) => (
                  <p key={para} className="mt-3 text-[15px] leading-relaxed text-black/65">{para}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-black/10 bg-[#f8fafb]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Everything on {p.name.toLowerCase()}</h2>
            {GROUPS.map((g) => {
              const list = items.filter((i) => g.kind.includes(i.kind))
              if (!list.length) return null
              return (
                <div key={g.heading} className="mt-10">
                  <h3 className="text-lg font-bold">{g.heading}</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((i) => (
                      <li key={i.href}>
                        {i.kind === 'download' ? (
                          <a href={i.href} download className="block h-full min-h-11 rounded-xl border border-black/10 bg-white p-4 text-sm font-semibold hover:border-[#0d9488]/40 hover:text-[#0d9488]">{i.title}</a>
                        ) : (
                          <Link href={i.href} className="block h-full min-h-11 rounded-xl border border-black/10 bg-white p-4 hover:border-[#0d9488]/40">
                            <span className="text-sm font-semibold text-[#0f1b2d]">{i.title}</span>
                            {i.description && <span className="mt-1 block text-[13px] leading-relaxed text-black/55 line-clamp-2">{i.description}</span>}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <section className="py-12 border-t border-black/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl font-bold tracking-tight">Other topics</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/topics/${o.slug}`} className="inline-flex min-h-11 items-center rounded-lg border border-black/10 px-4 text-sm font-semibold hover:border-[#0d9488]/40 hover:text-[#0d9488]">{o.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}

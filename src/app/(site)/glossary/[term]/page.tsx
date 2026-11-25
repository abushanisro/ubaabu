import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GLOSSARY_TERMS } from '@/components/seo/seoRoadmapData'
import { EXPANDED_GLOSSARY_SLUGS, GLOSSARY_CONTENT } from '@/components/seo/glossaryContent'
import RelatedReading from '@/components/seo/RelatedReading'
import { metaDescription, ogImages } from '@/lib/seo'
import { orgRef, SITE_URL } from '@/lib/schema'
import { pillarsFor, relatedReading } from '@/lib/topics'

/**
 * Glossary term pages (SEO audit Nov 2026, issue #03). Only expanded terms
 * (400–700 words: definition, formula, worked example, India context, FAQ and 3+
 * contextual links) are rendered and indexed. Every other term is merged into the
 * A–Z page and its old URL permanently redirects to its anchor there.
 */
export function generateStaticParams() {
  return GLOSSARY_TERMS.filter((t) => EXPANDED_GLOSSARY_SLUGS.has(t.slug)).map((t) => ({ term: t.slug }))
}

const SMALL = new Set(['and', 'or', 'of', 'to', 'vs', 'for', 'in', 'the', 'a'])
// Title case for headings and <title>; acronyms (BOM, PPAP, CNC…) keep their case.
const display = (term: string) =>
  term
    .split(' ')
    .map((w, i) => (/[A-Z]/.test(w) || (i > 0 && SMALL.has(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')

function titleFor(term: string): string | { absolute: string } {
  const t = display(term)
  // Keyword first, ≤ 60 characters. The root template appends " | Emithran" (11 chars)
  // when it fits; otherwise the brand is dropped rather than letting Google truncate.
  const candidates = [`What Is ${t}? Definition & Example`, `${t}: Definition & Example`, `${t}: Definition`, t]
  const branded = candidates.find((c) => c.length <= 49)
  if (branded) return branded
  return { absolute: candidates.find((c) => c.length <= 60) ?? t }
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params
  const item = GLOSSARY_TERMS.find((entry) => entry.slug === term)
  if (!item || !EXPANDED_GLOSSARY_SLUGS.has(item.slug)) return {}
  const content = GLOSSARY_CONTENT[item.term]
  const title = titleFor(item.term)
  return {
    title,
    description: metaDescription(content.summary),
    alternates: { canonical: `/glossary/${item.slug}` },
    openGraph: {
      images: ogImages,
      title: typeof title === 'string' ? `${title} | Emithran` : title.absolute,
      description: metaDescription(content.summary),
      url: `/glossary/${item.slug}`,
      type: 'article',
      siteName: 'Emithran',
      locale: 'en_US',
    },
  }
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params
  const item = GLOSSARY_TERMS.find((entry) => entry.slug === term)
  if (!item) notFound()
  if (!EXPANDED_GLOSSARY_SLUGS.has(item.slug)) permanentRedirect(`/glossary#${item.slug}`)
  const c = GLOSSARY_CONTENT[item.term]
  const name = display(item.term)
  const href = `/glossary/${item.slug}`
  const related = relatedReading(href, pillarsFor(item.slug, item.term), 6).filter((r) => !c.links.some((l) => l.href === r.href))

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
        { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}${href}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}${href}#term`,
      name,
      description: c.summary,
      url: `${SITE_URL}${href}`,
      inDefinedTermSet: { '@type': 'DefinedTermSet', '@id': `${SITE_URL}/glossary`, name: 'Emithran manufacturing cost and sourcing glossary' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${name}: definition`,
      url: `${SITE_URL}${href}`,
      about: { '@id': `${SITE_URL}${href}#term` },
      publisher: orgRef,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
        <article className="max-w-3xl mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="text-sm text-black/45">
            <Link href="/glossary" className="inline-flex min-h-11 items-center font-semibold text-[#0d9488]">Glossary</Link>
            <span className="mx-2">/</span>
            <span>{name}</span>
          </nav>
          <h1 className="mt-3 text-[clamp(1.75rem,calc((100vw_-_3rem)/8.9),2.25rem)] md:text-5xl font-bold tracking-tight break-words">{name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-black/70">{c.summary}</p>

          {c.formula && (
            <section className="mt-10 rounded-xl border border-[#0d9488]/20 bg-[#0d9488]/5 p-6" aria-labelledby="formula">
              <h2 id="formula" className="text-xl font-bold tracking-tight">Formula</h2>
              <p className="mt-3 overflow-x-auto font-mono text-[15px] text-[#0f1b2d]">{c.formula.expression}</p>
              <dl className="mt-4 grid gap-2 text-sm">
                {c.formula.variables.map((v) => (
                  <div key={v.symbol} className="grid grid-cols-[minmax(4rem,auto)_1fr] gap-3">
                    <dt className="font-mono font-semibold">{v.symbol}</dt>
                    <dd className="text-black/65">{v.meaning}</dd>
                  </div>
                ))}
              </dl>
              {c.formula.note && <p className="mt-3 text-sm text-black/55">{c.formula.note}</p>}
            </section>
          )}

          {c.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-black/65">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-4 grid gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-black/65">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-10 rounded-xl border border-black/10 p-6">
            <h2 className="text-2xl font-bold tracking-tight">{c.example.title}</h2>
            <ol className="mt-4 grid gap-2 list-decimal pl-5">
              {c.example.steps.map((step) => (
                <li key={step} className="leading-relaxed text-black/65">{step}</li>
              ))}
            </ol>
            <p className="mt-4 font-semibold leading-relaxed">{c.example.result}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight">{name} in India</h2>
            <p className="mt-3 leading-relaxed text-black/65">{c.india}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
            <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
              {c.faqs.map((f) => (
                <div key={f.question} className="py-5">
                  <h3 className="text-base font-bold">{f.question}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/60">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight">Go deeper</h2>
            <ul className="mt-4 grid gap-3">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block min-h-11 rounded-xl border border-black/10 p-4 hover:border-[#0d9488]/40">
                    <span className="font-semibold text-[#0d9488]">{l.label}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-black/60">{l.context}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && <RelatedReading items={related} />}

          <Link href="/request-demo" className="mt-10 inline-flex min-h-11 items-center rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
            Request a Demo
          </Link>
        </article>
      </div>
    </>
  )
}

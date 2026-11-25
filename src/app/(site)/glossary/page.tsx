import Link from 'next/link'
import type { Metadata } from 'next'
import { GLOSSARY_TERMS } from '@/components/seo/seoRoadmapData'
import { EXPANDED_GLOSSARY_SLUGS, GLOSSARY_CONTENT } from '@/components/seo/glossaryContent'
import { pageOpenGraph } from '@/lib/seo'
import { orgRef, SITE_URL } from '@/lib/schema'

const TITLE = 'Manufacturing Cost & Sourcing Glossary (A–Z)'
const DESCRIPTION =
  'A–Z glossary of should-cost, BOM, sourcing, supplier quality and cost engineering terms, with formulas, worked examples and India context for 30 key terms.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/glossary' },
  openGraph: pageOpenGraph('/glossary', `${TITLE} | Emithran`, DESCRIPTION),
}

const display = (term: string) => term.replace(/^\w/, (c) => c.toUpperCase())

/**
 * One A–Z glossary page (SEO audit Nov 2026, issue #03). Every term's definition is
 * on this page; the 30 expanded terms also have their own in-depth page. Thin
 * one-sentence term URLs redirect to their anchor here until they are expanded.
 */
export default function GlossaryPage() {
  const terms = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }))
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))]
  const expanded = terms.filter((t) => EXPANDED_GLOSSARY_SLUGS.has(t.slug))

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/glossary`,
    name: 'Emithran manufacturing cost and sourcing glossary',
    description: DESCRIPTION,
    url: `${SITE_URL}/glossary`,
    inLanguage: 'en',
    publisher: orgRef,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}/glossary#${t.slug}`,
      name: display(t.term),
      description: GLOSSARY_CONTENT[t.term]?.summary ?? t.description,
      url: EXPANDED_GLOSSARY_SLUGS.has(t.slug) ? `${SITE_URL}/glossary/${t.slug}` : `${SITE_URL}/glossary#${t.slug}`,
      inDefinedTermSet: `${SITE_URL}/glossary`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }} />
      <div className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Manufacturing cost and sourcing glossary</h1>
          <p className="mt-4 max-w-3xl text-black/60">
            Plain definitions for cost engineering, BOM management, sourcing, supplier quality and manufacturing analytics teams. The
            terms marked “In depth” have a full page with a formula, a worked example, India context and FAQs.
          </p>

          <section className="mt-10" aria-labelledby="glossary-in-depth">
            <h2 id="glossary-in-depth" className="text-2xl font-bold tracking-tight">In-depth terms</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {expanded.map((t) => (
                <Link key={t.slug} href={`/glossary/${t.slug}`} className="flex min-h-11 items-center rounded-xl border border-black/10 p-4 text-sm font-semibold hover:border-[#0d9488]/40 hover:text-[#0d9488]">
                  {display(t.term)}
                </Link>
              ))}
            </div>
          </section>

          <nav aria-label="Glossary letters" className="mt-12 flex flex-wrap gap-2">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} className="grid h-11 w-11 place-items-center rounded-lg border border-black/10 text-sm font-semibold hover:border-[#0d9488]/40 hover:text-[#0d9488]">
                {l}
              </a>
            ))}
          </nav>

          <section className="mt-8" aria-labelledby="glossary-a-z">
            <h2 id="glossary-a-z" className="text-2xl font-bold tracking-tight">A–Z</h2>
            {letters.map((l) => (
              <div key={l} id={`letter-${l}`} className="mt-8 scroll-mt-28">
                <h3 className="text-xl font-bold text-[#0d9488]">{l}</h3>
                <dl className="mt-3 divide-y divide-black/10 border-y border-black/10">
                  {terms
                    .filter((t) => t.term[0].toUpperCase() === l)
                    .map((t) => {
                      const isExpanded = EXPANDED_GLOSSARY_SLUGS.has(t.slug)
                      return (
                        <div key={t.slug} id={t.slug} className="grid gap-1 py-4 md:grid-cols-[16rem_1fr] md:gap-6 scroll-mt-28">
                          <dt className="text-[15px] font-semibold">
                            {isExpanded ? (
                              <Link href={`/glossary/${t.slug}`} className="hover:text-[#0d9488]">{display(t.term)}</Link>
                            ) : (
                              display(t.term)
                            )}
                            {isExpanded && <span className="ml-2 rounded bg-[#0d9488]/10 px-1.5 py-0.5 text-[11px] font-bold uppercase text-[#0d9488]">In depth</span>}
                          </dt>
                          <dd className="text-sm leading-relaxed text-black/60">
                            {t.description}
                            {t.relatedLinks.length > 0 && (
                              <span className="block mt-1">
                                See:{' '}
                                {t.relatedLinks.map((link, i) => (
                                  <span key={link.href}>
                                    {i > 0 && ', '}
                                    <Link href={link.href} className="text-[#0d9488] underline decoration-[#0d9488]/30 underline-offset-4">{link.label}</Link>
                                  </span>
                                ))}
                              </span>
                            )}
                          </dd>
                        </div>
                      )
                    })}
                </dl>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

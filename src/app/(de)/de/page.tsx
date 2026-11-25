import Link from 'next/link'
import type { Metadata } from 'next'
import { DE_PAGES } from '@/components/seo/seoRoadmapData'
import { DE_HUB } from '@/components/seo/deContent'
import { ProofBlock } from '@/components/seo/ExpansionBlocks'
import { languageAlternates } from '@/lib/hreflang'
import { ogImages } from '@/lib/seo'
import { orgRef, SITE_URL } from '@/lib/schema'

/**
 * Localised German homepage (SEO audit Nov 2026, issues #06/#08): real German copy,
 * German FAQ, lang="de" (via the (de) root layout) and reciprocal hreflang with "/".
 */
export const metadata: Metadata = {
  title: { absolute: DE_HUB.title },
  description: DE_HUB.description,
  alternates: { canonical: '/de', languages: languageAlternates('/de') },
  openGraph: {
    images: ogImages,
    title: DE_HUB.title,
    description: DE_HUB.description,
    url: '/de',
    type: 'website',
    siteName: 'Emithran',
    locale: 'de_DE',
  },
}

export default function GermanHomePage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Deutschland', item: `${SITE_URL}/de` },
    ],
  }
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: DE_HUB.title,
    url: `${SITE_URL}/de`,
    inLanguage: 'de',
    publisher: orgRef,
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: DE_HUB.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, webPage, faq]) }} />
      <div className="min-h-screen bg-white text-[#0f1b2d]">
        <section className="pt-28 pb-12 border-b border-black/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Emithran Deutschland</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight break-words hyphens-auto">{DE_HUB.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60">{DE_HUB.intro}</p>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-black/70">{DE_HUB.summary}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/request-demo" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
                Demo anfragen
              </Link>
              <Link href="/german-manufacturing-cost-pilot" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0d9488]/25 bg-[#0d9488]/5 px-6 py-3 text-sm font-semibold text-[#0d9488]">
                Pilotprojekt Deutschland–Indien (englisch)
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Lösungen auf Deutsch</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {DE_PAGES.map((page) => (
                <Link key={page.slug} href={`/de/${page.slug}`} className="rounded-xl border border-black/10 p-6 hover:border-[#0d9488]/40">
                  <h3 className="text-xl font-bold">{page.title.split('|')[0].trim()}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-black/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Sieben Module, eine Datenbasis</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {DE_HUB.modules.map((m) => (
                <div key={m.heading} className="rounded-xl border border-[#0d9488]/15 bg-[#0d9488]/5 p-5">
                  <h3 className="text-base font-bold">{m.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/65">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {DE_HUB.sections.map((section) => (
          <section key={section.heading} className="py-12 border-t border-black/10">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[15px] leading-relaxed text-black/65">{p}</p>
              ))}
            </div>
          </section>
        ))}

        <ProofBlock data={DE_HUB.proof} lang="de" />

        <section className="py-12 bg-[#f8fafb] border-y border-black/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Häufig gestellte Fragen</h2>
            <div className="grid gap-3">
              {DE_HUB.faqs.map((faq) => (
                <details key={faq.question} className="rounded-xl border border-black/10 bg-white p-5">
                  <summary className="cursor-pointer text-sm font-semibold">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#0f1b2d] text-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{DE_HUB.cta.heading}</h2>
            <p className="mt-4 text-white/60">{DE_HUB.cta.body}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/request-demo" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2dd4bf] px-7 py-3 text-sm font-semibold text-[#0f1b2d]">
                Demo anfragen
              </Link>
              <Link href="/pricing" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-7 py-3 text-sm font-semibold text-white">
                Preise (englisch)
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

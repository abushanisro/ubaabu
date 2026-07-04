import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DE_PAGES } from '@/components/seo/seoRoadmapData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export function generateStaticParams() {
  return DE_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = DE_PAGES.find((item) => item.slug === slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/de/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/de/${page.slug}`,
      type: 'website',
      locale: 'de_DE',
    },
  }
}

export default async function GermanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = DE_PAGES.find((item) => item.slug === slug)
  if (!page) notFound()

  const shortName = page.title.split('|')[0].trim()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Deutschland', item: `${siteUrl}/de` },
      { '@type': 'ListItem', position: 3, name: shortName, item: `${siteUrl}/de/${page.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
        <article className="max-w-4xl mx-auto px-6 lg:px-10">
          <Link href="/de" className="text-sm font-semibold text-[#0d9488]">Deutschland</Link>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">{page.h1}</h1>
          <p className="mt-6 text-lg leading-relaxed text-black/60">{page.intro}</p>

          <div className="mt-12 space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-black/65">{section.body}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-xl border border-[#0d9488]/15 bg-[#0d9488]/5 p-4 text-sm leading-relaxed text-black/65">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight">Häufig gestellte Fragen</h2>
            <div className="mt-4 divide-y divide-black/10">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-5">
                  <h3 className="text-base font-bold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <Link href="/request-demo" className="mt-12 inline-flex rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
            Demo anfragen
          </Link>
        </article>
      </main>
    </>
  )
}

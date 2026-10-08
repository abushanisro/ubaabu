import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GLOSSARY_TERMS } from '@/components/seo/seoRoadmapData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export function generateStaticParams() {
  return GLOSSARY_TERMS.map((term) => ({ term: term.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params
  const item = GLOSSARY_TERMS.find((entry) => entry.slug === term)
  if (!item) return {}

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/glossary/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${siteUrl}/glossary` },
      { '@type': 'ListItem', position: 3, name: item.term, item: `${siteUrl}/glossary/${item.slug}` },
    ],
  }

  const definitionSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: item.term,
    description: item.description,
    url: `${siteUrl}/glossary/${item.slug}`,
    inDefinedTermSet: `${siteUrl}/glossary`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definitionSchema) }} />
      <main className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
        <article className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link href="/glossary" className="text-sm font-semibold text-[#0d9488]">Glossary</Link>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight capitalize">{item.term}</h1>
          <p className="mt-6 text-lg leading-relaxed text-black/60">{item.description}</p>
          {item.relatedLinks.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-bold tracking-tight">See also</h2>
              <ul className="mt-4 grid gap-3">
                {item.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-black/65 underline decoration-black/20 underline-offset-4 hover:text-[#0d9488] hover:decoration-[#0d9488]/40">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link href="/request-demo" className="mt-10 inline-flex rounded-xl bg-[#0d9488] px-6 py-3 text-sm font-semibold text-white">
            Request a Demo
          </Link>
        </article>
      </main>
    </>
  )
}

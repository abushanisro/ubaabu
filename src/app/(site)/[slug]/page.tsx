import { notFound } from 'next/navigation'
import { languageAlternates } from '@/lib/hreflang'
import type { Metadata } from 'next'
import SeoLandingPage from '@/components/seo/SeoLandingPage'
import { SEO_LANDING_PAGES } from '@/components/seo/seoRoadmapData'
import { LANDING_EXPANSIONS } from '@/components/seo/landingContent'
import { metaDescription, stripBrandSuffix } from '@/lib/seo'
import { META_DESCRIPTIONS } from '@/lib/metaDescriptions'
import { ogImages } from '@/lib/seo'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export function generateStaticParams() {
  return SEO_LANDING_PAGES.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = SEO_LANDING_PAGES.find((item) => item.slug === slug)
  if (!page) return {}

  return {
    title: stripBrandSuffix(page.title),
    description: META_DESCRIPTIONS[`/${page.slug}`] ?? metaDescription(page.description),
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`,
      languages: languageAlternates(`/${page.slug}`),
    },
    openGraph: {
      images: ogImages,
      title: page.title,
      description: META_DESCRIPTIONS[`/${page.slug}`] ?? metaDescription(page.description),
      url: `/${page.slug}`,
      type: 'website',
      siteName: 'Emithran',
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = SEO_LANDING_PAGES.find((item) => item.slug === slug)
  if (!page) notFound()

  const shortName = page.title.split('|')[0].trim()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: shortName, item: `${siteUrl}/${page.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...page.faqs, ...(LANDING_EXPANSIONS[page.slug]?.faqs ?? [])].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SeoLandingPage page={page} />
    </>
  )
}

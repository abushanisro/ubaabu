import FAQPage from '@/components/faq/FAQPage'
import { FAQ_CATEGORIES } from '@/components/faq/faqData'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'FAQ — Should-Cost, BOM & Supplier Intelligence',
  description:
    'Answers to common questions about Emithran: should-cost analysis, BOM validation, supplier intelligence, OTIF tracking, pricing, data security, and integration with your existing systems.',
  keywords: [
    'should cost analysis FAQ', 'BOM management questions', 'manufacturing intelligence FAQ',
    'supplier intelligence help', 'Emithran FAQ', 'manufacturing software questions India',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Emithran FAQ - Manufacturing Intelligence Questions Answered',
    description: 'Everything you need to know about Emithran\'s manufacturing intelligence platform.',
    url: '/faq', type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }))
  ),
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FAQPage />
    </>
  )
}

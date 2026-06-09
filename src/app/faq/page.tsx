import FAQPage from '@/components/faq/FAQPage'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'FAQ — Should-Cost Analysis, BOM Management & Supplier Intelligence Answers',
  description:
    'Answers to common questions about Emithran: should-cost analysis, BOM validation, supplier intelligence, OTIF tracking, pricing, data security, and integration with your existing systems.',
  keywords: [
    'should cost analysis FAQ', 'BOM management questions', 'manufacturing intelligence FAQ',
    'supplier intelligence help', 'Emithran FAQ', 'manufacturing software questions India',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Emithran FAQ — Manufacturing Intelligence Questions Answered',
    description: 'Everything you need to know about Emithran\'s manufacturing intelligence platform.',
    url: '/faq', type: 'website',
  },
}

export default function Page() {
  return <FAQPage />
}

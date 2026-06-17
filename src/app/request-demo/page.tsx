import type { Metadata } from 'next'
import RequestDemoPage from '@/components/request-demo/RequestDemoPage'

export const metadata: Metadata = {
  title: 'Request a Demo — Emithran Manufacturing Intelligence',
  description:
    'See how Emithran helps space, defence, and precision manufacturing teams cut costs, manage BOMs, and accelerate sourcing. Book a 30-minute live walkthrough.',
  keywords: [
    'Emithran demo', 'manufacturing intelligence demo', 'should cost software demo',
    'BOM management platform demo', 'book manufacturing software demo India',
  ],
  alternates: { canonical: '/request-demo' },
  openGraph: {
    title: 'Request a Demo — Emithran',
    description: 'Book a 30-minute walkthrough of Emithran\'s manufacturing intelligence platform.',
    url: '/request-demo',
    type: 'website',
  },
}

export default function Page() {
  return <RequestDemoPage />
}

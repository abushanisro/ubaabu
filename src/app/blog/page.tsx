import BlogPage from '@/components/blog/BlogPage'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Blog — Manufacturing Intelligence Insights from Emithran',
  description:
    'Deep-dive articles on should-cost analysis, BOM intelligence, supplier evaluation, VAVE, and AI in manufacturing — written by engineers building the tools.',
  keywords: [
    'manufacturing intelligence blog', 'should cost analysis guide',
    'BOM management insights', 'supplier intelligence articles',
    'defence manufacturing blog India', 'aerospace cost engineering',
    'VAVE analysis guide', 'AI manufacturing insights',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Emithran Blog — Manufacturing Intelligence Insights',
    description: 'Deep-dive articles on should-cost, BOM, supplier intelligence, and AI in manufacturing.',
    url: '/blog', type: 'website',
  },
}

export default function Page() {
  return <BlogPage />
}

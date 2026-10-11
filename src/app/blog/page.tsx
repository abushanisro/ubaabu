import BlogPage from '@/components/blog/BlogPage'
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import { parseDisplayDate } from '@/lib/lastModified'

import type { Metadata } from 'next'
import { ogImages } from '@/lib/seo'
export const metadata: Metadata = {
  title: { absolute: 'Blog - Manufacturing Intelligence Insights from Emithran' },
  description:
    'Deep-dive articles on should-cost analysis, BOM intelligence, supplier evaluation, VAVE, and AI in manufacturing - written by engineers building the tools.',
  keywords: [
    'manufacturing intelligence blog', 'should cost analysis guide',
    'BOM management insights', 'supplier intelligence articles',
    'defence manufacturing blog India', 'aerospace cost engineering',
    'VAVE analysis guide', 'AI manufacturing insights',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    images: ogImages,
    title: 'Emithran Blog - Manufacturing Intelligence Insights',
    description: 'Deep-dive articles on should-cost, BOM, supplier intelligence, and AI in manufacturing.',
    url: '/blog', type: 'website', siteName: 'Emithran',
  },
}

// Trending rail lists only the hand-written (indexable) articles that are already
// published, newest first. Resolved here so article bodies never ship to the client.
const trendingSlugs = POSTS
  .filter(p => BLOG_CONTENT[p.slug] && parseDisplayDate(p.date).getTime() <= Date.now())
  .sort((a, b) => parseDisplayDate(b.date).getTime() - parseDisplayDate(a.date).getTime())
  .map(p => p.slug)

export default function Page() {
  return <BlogPage trendingSlugs={trendingSlugs} />
}

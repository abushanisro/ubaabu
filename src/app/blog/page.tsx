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

// Short teaser for the lead story: the first body paragraph of each article, stripped to plain text.
const teasers: Record<string, string> = {}
for (const [slug, post] of Object.entries(BLOG_CONTENT)) {
  const para = [...post.content.matchAll(/<p(?![^>]*font-size:0\.85rem)[^>]*>([\s\S]*?)<\/p>/g)][0]?.[1]
  if (para) teasers[slug] = para.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

// Structured data for the product demo video embedded in the listing's demo band.
const demoVideoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Emithran Product Demo: Should-Cost, Supplier Intelligence, and BOM Validation',
  description:
    'A tour of Emithran running should-cost analysis, supplier intelligence, and BOM validation on real manufacturing part data.',
  thumbnailUrl: [`${siteUrl}/videos/emithran-should-cost-supplier-intelligence-demo-poster.jpg`],
  contentUrl: `${siteUrl}/videos/emithran-should-cost-supplier-intelligence-demo.mp4`,
  uploadDate: '2026-10-11',
  duration: 'PT1M34S',
  publisher: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(demoVideoJsonLd) }} />
      <BlogPage trendingSlugs={trendingSlugs} teasers={teasers} />
    </>
  )
}

import { notFound } from 'next/navigation'
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import BlogPostPage from '@/components/blog/BlogPostPage'
import type { BlogPost } from '@/components/blog/blogData'
import type { BlogPostContent } from '@/components/blog/blogContent'

function buildRoadmapContent(post: BlogPost): BlogPostContent {
  return {
    heroImage: post.image,
    authorBio: `<strong>${post.author.name}</strong> is part of the Emithran team building manufacturing intelligence workflows for BOM management, should-cost analysis, supplier intelligence, and sourcing teams.`,
    seo: {
      metaTitle: `${post.title} | Emithran Blog`,
      metaDescription: post.excerpt,
      ogTitle: post.title,
      ogDescription: post.excerpt,
      tags: [
        post.title.toLowerCase(),
        'manufacturing intelligence',
        'should cost analysis',
        'supplier intelligence',
        'BOM management',
        'cost engineering',
      ],
    },
    faqs: [
      {
        question: `Why does ${post.title.toLowerCase()} matter?`,
        answer:
          'It matters because manufacturing teams make better sourcing and engineering decisions when cost, BOM, supplier, and risk data are connected instead of spread across disconnected spreadsheets.',
      },
      {
        question: 'How does Emithran support this workflow?',
        answer:
          'Emithran connects BOM validation, should-cost modelling, supplier intelligence, RFQ preparation, and decision tracking in one manufacturing intelligence platform.',
      },
    ],
    content: `
<p style="font-size:1.1rem;color:#374151;line-height:1.8;font-style:italic;border-left:3px solid #0d9e8a;padding-left:1.25rem;margin-bottom:2rem;">${post.excerpt}</p>

<h2>The short version</h2>
<p>Manufacturing decisions are rarely blocked by a lack of effort. They are blocked by fragmented data: BOMs in one place, supplier capability in another, quote history in another, and engineering assumptions inside individual spreadsheets. ${post.title.replace(/"/g, '&quot;')} belongs in the same operating system as should-cost, BOM intelligence, supplier intelligence, and RFQ preparation.</p>

<h2>What teams should evaluate</h2>
<ul>
  <li><strong>Data quality:</strong> whether part, process, supplier, and commercial data can be trusted.</li>
  <li><strong>Decision context:</strong> whether engineering, procurement, quality, and programme teams see the same assumptions.</li>
  <li><strong>Cost evidence:</strong> whether supplier quotes can be compared against bottom-up manufacturing cost models.</li>
  <li><strong>Supplier readiness:</strong> whether capacity, certification, location, and risk data are visible before RFQs are released.</li>
</ul>

<h2>How Emithran approaches it</h2>
<p>Emithran treats this as a manufacturing intelligence workflow. A BOM is not just a parts list. A supplier record is not just a vendor master. A should-cost model is not just a spreadsheet. The value comes from connecting these views so teams can answer practical questions quickly: who can make this part, what should it cost, what risks exist, and what decision should we make next?</p>

<h2>Practical implementation steps</h2>
<ol>
  <li>Start with a representative programme, BOM, or commodity family.</li>
  <li>Normalize part numbers, materials, specifications, supplier records, and quote data.</li>
  <li>Build should-cost models for the highest-value or highest-risk components.</li>
  <li>Map qualified supplier alternatives and identify single-source exposure.</li>
  <li>Turn the output into RFQ, negotiation, or VAVE actions with a clear owner.</li>
</ol>

<h2>Common mistakes</h2>
<p>The most common mistake is treating this as a reporting project rather than an operating workflow. Dashboards help, but sourcing and engineering teams need structured evidence at the moment of decision. Another mistake is optimising for unit price while ignoring tooling, logistics, quality cost, certification risk, inventory, and supplier switching cost.</p>

<h2>Where this fits in the roadmap</h2>
<p>This article is part of Emithran's 12-month SEO execution roadmap for manufacturing intelligence. It supports the content cluster around should-cost analysis, BOM management, supplier intelligence, strategic sourcing, VAVE, spend analysis, and international manufacturing benchmarks.</p>
    `,
  }
}

export function generateStaticParams() {
  return POSTS.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find(p => p.slug === slug)
  if (!post) return {}
  const isHandwritten = Boolean(BLOG_CONTENT[slug])
  const content = BLOG_CONTENT[slug] ?? buildRoadmapContent(post)

  const seo = content?.seo
  const title = seo?.metaTitle ?? `${post.title} | Emithran Blog`
  const description = seo?.metaDescription ?? post.excerpt
  const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

  // Use the generated branded OG image (see opengraph-image.tsx in this directory)
  const ogImage = `${siteUrl}/blog/${slug}/opengraph-image`

  return {
    title,
    description,
    keywords: seo?.tags,
    authors: [{ name: post.author.name, url: `${siteUrl}/about` }],
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    robots: isHandwritten ? undefined : { index: false, follow: true },
    openGraph: {
      title: seo?.ogTitle ?? post.title,
      description: seo?.ogDescription ?? post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      siteName: 'Emithran',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      tags: seo?.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      site: '@EmithranHQ',
      title: seo?.ogTitle ?? post.title,
      description: seo?.ogDescription ?? post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find(p => p.slug === slug)
  const content = post ? (BLOG_CONTENT[slug] ?? buildRoadmapContent(post)) : undefined

  if (!post || !content) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${siteUrl}/about`,
      sameAs: [post.author.linkedin],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Emithran',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/infographics/logo/logo-black.png` },
    },
    image: { '@type': 'ImageObject', url: `${siteUrl}/blog/${slug}/opengraph-image`, width: 1200, height: 630 },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${slug}` },
    keywords: (BLOG_CONTENT[slug]?.seo?.tags ?? []).join(', '),
  }

  const faqSchema = content.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null

  const howToSchema = content.howTo
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: content.howTo.name,
        step: content.howTo.steps.map((step) => ({
          '@type': 'HowToStep',
          name: step.name,
          text: step.text,
        })),
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
      <BlogPostPage post={post} content={content} />
    </>
  )
}

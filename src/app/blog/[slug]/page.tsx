import { notFound } from 'next/navigation'
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import BlogPostPage from '@/components/blog/BlogPostPage'

export function generateStaticParams() {
  return POSTS.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find(p => p.slug === slug)
  const content = BLOG_CONTENT[slug]
  if (!post) return {}

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
  const content = BLOG_CONTENT[slug]

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
      <BlogPostPage post={post} content={content} />
    </>
  )
}

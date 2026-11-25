import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { POSTS, DRAFT_POST_REDIRECTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import BlogPostPage from '@/components/blog/BlogPostPage'
import { metaDescription, stripBrandSuffix, stripYearSuffix } from '@/lib/seo'
import { parseDisplayDate } from '@/lib/lastModified'
import { authorByName, authorPath } from '@/lib/authors'
import { orgRef, SITE_URL } from '@/lib/schema'
import { CONTENT_ITEMS, pillarBySlug, relatedReading, solutionLinksFor } from '@/lib/topics'
import { relatedLinksForBlog } from '@/lib/internalLinks'

// Posts store display dates ("July 1, 2026"); schema.org and Open Graph expect ISO 8601.
function isoDate(value: string): string {
  const d = parseDisplayDate(value)
  return Number.isNaN(d.getTime()) ? value : d.toISOString()
}

/**
 * <title> policy (SEO audit Nov 2026, issue #11): keyword-first, ≤ 60 characters.
 * - A hard-coded "(2026)" is dropped; `{year}` in a title is replaced with the year of dateModified.
 * - The root template adds " | Emithran" only when the result still fits in 60 characters;
 *   longer blog titles drop the brand suffix instead of being truncated in the SERP.
 */
function blogTitle(raw: string, modified: string): string | { absolute: string } {
  const year = String(parseDisplayDate(modified).getUTCFullYear())
  const t = stripYearSuffix(stripBrandSuffix(raw)).replace(/\{year\}/g, year)
  return t.length + ' | Emithran'.length <= 60 ? t : { absolute: t }
}

export function generateStaticParams() {
  return POSTS.filter(post => BLOG_CONTENT[post.slug]).map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find(p => p.slug === slug)
  const content = BLOG_CONTENT[slug]
  if (!post || !content) return {}

  const seo = content.seo
  const modified = post.updated ?? post.date
  const title = blogTitle(seo?.metaTitle ?? post.title, modified)
  const titleText = typeof title === 'string' ? title : title.absolute
  const description = metaDescription(seo?.metaDescription ?? post.excerpt)
  const url = `${SITE_URL}/blog/${slug}`

  // Generated branded OG image (see opengraph-image.tsx in this directory)
  const ogImage = `${url}/opengraph-image`

  return {
    title,
    description,
    keywords: seo?.tags,
    authors: [{ name: post.author.name, url: `${SITE_URL}${authorPath(post.author.name)}` }],
    alternates: { canonical: url },
    openGraph: {
      title: stripYearSuffix(seo?.ogTitle ?? titleText),
      description,
      url,
      siteName: 'Emithran',
      type: 'article',
      publishedTime: isoDate(post.date),
      modifiedTime: isoDate(modified),
      authors: [`${SITE_URL}${authorPath(post.author.name)}`],
      tags: seo?.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@emithran',
      title: stripYearSuffix(seo?.ogTitle ?? titleText),
      description,
      images: [ogImage],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Planned-but-unwritten posts redirect (307) to the closest live page until published.
  if (DRAFT_POST_REDIRECTS[slug]) redirect(DRAFT_POST_REDIRECTS[slug])
  const post = POSTS.find(p => p.slug === slug)
  const content = post ? BLOG_CONTENT[slug] : undefined

  if (!post || !content) notFound()

  const url = `${SITE_URL}/blog/${slug}`
  const author = authorByName(post.author.name)
  const authorUrl = `${SITE_URL}${authorPath(post.author.name)}`
  const reviewerProfile = post.reviewedBy ? authorByName(post.reviewedBy) : undefined
  const reviewer = reviewerProfile
    ? { name: reviewerProfile.name, role: reviewerProfile.jobTitle, href: `/authors/${reviewerProfile.slug}` }
    : undefined

  // Pillar-driven related reading (SEO audit #05).
  const href = `/blog/${slug}`
  const pillars = CONTENT_ITEMS.find(i => i.href === href)?.pillars ?? []
  const relatedSlugs = relatedReading(href, pillars, 12)
    .filter(i => i.kind === 'guide')
    .map(i => i.href.replace('/blog/', ''))
  // "Related on Emithran": hand-picked links first, then pillar-matched solution pages.
  const explicit = relatedLinksForBlog(slug)
  const solutionLinks = [
    ...explicit,
    ...solutionLinksFor(href, pillars, 4)
      .filter(i => !explicit.some(e => e.href === i.href))
      .map(i => ({ href: i.href, label: i.title, description: i.description ?? '' })),
  ].slice(0, 5)
  const pillar = pillars[0] ? pillarBySlug(pillars[0]) : undefined
  const hub = pillar ? { href: `/topics/${pillar.slug}`, label: `More on ${pillar.name}` } : undefined

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: stripYearSuffix(post.title),
    description: post.excerpt,
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.updated ?? post.date),
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      '@id': `${authorUrl}#person`,
      name: post.author.name,
      jobTitle: author?.jobTitle ?? post.author.role,
      url: authorUrl,
      sameAs: [post.author.linkedin],
    },
    ...(reviewer && {
      reviewedBy: { '@type': 'Person', '@id': `${SITE_URL}${reviewer.href}#person`, name: reviewer.name, url: `${SITE_URL}${reviewer.href}` },
    }),
    publisher: {
      ...orgRef,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/infographics/logo/logo-black.png` },
    },
    image: { '@type': 'ImageObject', url: `${url}/opengraph-image`, width: 1200, height: 630 },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(pillar && { about: { '@type': 'Thing', name: pillar.name, url: `${SITE_URL}/topics/${pillar.slug}` } }),
    keywords: (content.seo?.tags ?? []).join(', '),
  }

  // FAQ blocks stay: Google no longer shows FAQ rich results for most sites, but the
  // markup still helps AI answer engines. HowTo markup was removed (issue #12):
  // Google dropped HowTo rich results, so it no longer earns anything.
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: stripYearSuffix(post.title), item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <BlogPostPage
        post={{ ...post, title: stripYearSuffix(post.title) }}
        content={content}
        authorHref={authorPath(post.author.name)}
        reviewer={reviewer}
        relatedSlugs={relatedSlugs}
        solutionLinks={solutionLinks}
        hub={hub}
      />
    </>
  )
}

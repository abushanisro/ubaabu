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

  return {
    title,
    description,
    keywords: seo?.tags,
    openGraph: {
      title: seo?.ogTitle ?? post.title,
      description: seo?.ogDescription ?? post.excerpt,
      type: 'article',
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find(p => p.slug === slug)
  const content = BLOG_CONTENT[slug]

  if (!post || !content) notFound()

  const faqSchema = content.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPostPage post={post} content={content} />
    </>
  )
}

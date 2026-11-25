import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { POSTS } from '@/components/blog/blogData'
import { BLOG_CONTENT } from '@/components/blog/blogContent'
import { CASE_STUDIES } from '@/components/case-studies/caseStudyData'
import { AUTHORS, authorBySlug } from '@/lib/authors'
import { metaDescription, ogImages } from '@/lib/seo'
import { ORG_ID, SITE_URL } from '@/lib/schema'

/** Author profile pages (SEO audit Nov 2026, issue #10 — E-E-A-T). */
export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = authorBySlug(slug)
  if (!a) return {}
  const title = `${a.name}, ${a.jobTitle.replace(', Emithran', '')}`
  return {
    title,
    description: metaDescription(a.summary),
    alternates: { canonical: `/authors/${a.slug}` },
    openGraph: { images: ogImages, title: `${title} | Emithran`, description: metaDescription(a.summary), url: `/authors/${a.slug}`, type: 'profile', siteName: 'Emithran', locale: 'en_US' },
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = authorBySlug(slug)
  if (!a) notFound()
  const posts = POSTS.filter((p) => p.author.name === a.name && BLOG_CONTENT[p.slug])
  const studies = CASE_STUDIES.filter((c) => c.author.name === a.name)
  const url = `${SITE_URL}/authors/${a.slug}`

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url,
      mainEntity: {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: a.name,
        jobTitle: a.jobTitle,
        description: a.summary,
        image: `${SITE_URL}${a.image}`,
        url,
        sameAs: [a.linkedin],
        worksFor: { '@id': ORG_ID, '@type': 'Organization', name: 'Emithran', url: SITE_URL },
        knowsAbout: a.expertise,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
        { '@type': 'ListItem', position: 3, name: a.name, item: url },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-white pt-28 pb-16 text-[#0f1b2d]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image src={a.image} alt={`${a.name}, ${a.jobTitle}`} width={112} height={112} className="h-28 w-28 rounded-full border border-black/10 object-cover" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Author</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">{a.name}</h1>
              <p className="mt-2 text-lg text-black/60">{a.jobTitle}</p>
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-black/70">{a.summary}</p>

          <section className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight">Background</h2>
            <ul className="mt-4 grid gap-2">
              {a.background.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed text-black/65">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-base font-bold">Areas of expertise</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.expertise.map((x) => (
                <li key={x} className="rounded-lg bg-[#0d9488]/5 px-3 py-1.5 text-sm text-[#0d9488]">{x}</li>
              ))}
            </ul>
            <a href={a.linkedin} rel="noopener noreferrer me" target="_blank" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#0d9488]">
              {a.name} on LinkedIn →
            </a>
          </section>

          {studies.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight">Case studies</h2>
              <ul className="mt-4 grid gap-3">
                {studies.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/case-studies/${c.slug}`} className="block min-h-11 rounded-xl border border-black/10 p-4 hover:border-[#0d9488]/40">
                      <span className="font-semibold">{c.title}</span>
                      <span className="mt-1 block text-sm text-black/55">{c.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight">Articles by {a.name}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="block h-full min-h-11 rounded-xl border border-black/10 p-4 hover:border-[#0d9488]/40">
                    <span className="font-semibold leading-snug">{p.title}</span>
                    <span className="mt-1 block text-sm text-black/55">{p.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

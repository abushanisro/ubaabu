import Link from 'next/link'
import type { ContentItem } from '@/lib/topics'

const KIND_LABEL: Record<ContentItem['kind'], string> = {
  guide: 'Guide',
  glossary: 'Glossary',
  product: 'Product',
  comparison: 'Comparison',
  'case-study': 'Case study',
  download: 'Template',
  report: 'Report',
}

/**
 * "Related reading" block driven by pillar tags (SEO audit Nov 2026, issue #05).
 * Server component: the item list is computed on the server so no article data ships to the client.
 */
export default function RelatedReading({
  items,
  heading = 'Related reading',
  hub,
}: {
  items: ContentItem[]
  heading?: string
  hub?: { href: string; label: string }
}) {
  if (!items.length) return null
  return (
    <section className="mt-12" aria-labelledby="related-reading">
      <h2 id="related-reading" className="text-2xl font-bold tracking-tight">{heading}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block h-full min-h-11 rounded-xl border border-black/10 p-4 hover:border-[#0d9488]/40">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">{KIND_LABEL[item.kind]}</span>
              <span className="mt-1 block text-[15px] font-semibold leading-snug text-[#0f1b2d]">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      {hub && (
        <Link href={hub.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#0d9488]">
          {hub.label} →
        </Link>
      )}
    </section>
  )
}

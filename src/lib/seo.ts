/**
 * Single source of truth for the default social-share (Open Graph / X) image.
 * Next.js does not merge `openGraph` between layout and page metadata, so any
 * page that defines its own `openGraph` must pass `images: ogImages`.
 * X falls back to og:image when twitter:image is absent.
 *
 * Asset: public/assets/meta/emithran-og.jpg — 1200x630 JPEG, < 100 KB
 * (WhatsApp ignores images over ~300 KB).
 */
export const OG_IMAGE = {
  url: '/assets/meta/emithran-og.jpg',
  width: 1200,
  height: 630,
  alt: 'Emithran - Manufacturing Intelligence Platform',
  type: 'image/jpeg',
} as const

export const ogImages = [OG_IMAGE]
export const twitterImages = [OG_IMAGE.url]

/**
 * The root layout appends " | Emithran" to every page title via `title.template`.
 * Data-driven titles (landing pages, blog posts) may already carry the brand, which
 * produced "… | Emithran | Emithran". Strip a trailing brand suffix so the template
 * adds it exactly once.
 */
export function stripBrandSuffix(title: string): string {
  return title.replace(/\s*\|\s*Emithran(?: Blog)?\s*$/i, '')
}

/**
 * Page-level Open Graph block. Next.js replaces (does not merge) the layout's `openGraph`
 * when a page defines its own, so a page that only wants a correct `og:url` must supply the
 * rest too. Pass the page's own path, title (as shown in <title>) and description.
 */
export function pageOpenGraph(path: string, title: string, description: string) {
  return {
    images: ogImages,
    title,
    description,
    url: path,
    type: 'website',
    siteName: 'Emithran',
    locale: 'en_US',
  } as const
}

/**
 * Meta description ≤ `max` characters (SEO audit Nov 2026, issue #11: keep descriptions
 * at ~140–155). Keeps whole sentences when they fit; otherwise cuts at a word boundary.
 */
export function metaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? []
  let out = ''
  for (const s of sentences) {
    if ((out + s).trim().length > max) break
    out += s
  }
  out = out.trim()
  if (out.length >= 120) return out
  const cut = clean.slice(0, max - 1).replace(/[\s,;:–-]+\S*$/, '')
  return `${cut}…`
}

/**
 * Title helper: drop a hard-coded year in parentheses, e.g. "(2026)", which looks stale
 * the following January (issue #11). Years that matter are added from dateModified.
 */
export function stripYearSuffix(title: string): string {
  return title.replace(/\s*\((?:19|20)\d{2}\)\s*/g, ' ').replace(/\s{2,}/g, ' ').trim()
}

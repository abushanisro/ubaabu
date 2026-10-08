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

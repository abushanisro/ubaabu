/**
 * Homepage hero thumbnail — the mobile LCP element. Served as responsive WebP
 * (400 / 640 / 776 px wide) so phones download ~18–41 KiB instead of the 87 KiB
 * full-size file (PageSpeed Insights, Nov 2026: "image larger than needed for its
 * displayed dimensions"). Shared by the <img> and the <link rel="preload"> so the
 * browser preloads exactly the file it will use.
 */
export const HERO_THUMB = {
  src: '/assets/hero-page/3d-drawing-776.webp',
  srcSet:
    '/assets/hero-page/3d-drawing-400.webp 400w, /assets/hero-page/3d-drawing-640.webp 640w, /assets/hero-page/3d-drawing-776.webp 776w',
  // Mobile: full width minus the 24px side padding; desktop: one column of the 1280px grid.
  sizes: '(min-width: 1024px) 600px, calc(100vw - 48px)',
  width: 776,
  height: 446,
} as const

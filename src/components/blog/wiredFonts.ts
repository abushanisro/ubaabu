import { Barlow_Condensed, IBM_Plex_Mono, Source_Serif_4 } from 'next/font/google'

// Editorial type system for the blog: condensed display headlines,
// letter-spaced mono for kickers/bylines, and a serif for decks and body copy.

export const displayFont = Barlow_Condensed({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-blog-display',
  display: 'swap',
})

export const monoFont = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-blog-mono',
  display: 'swap',
})

export const serifFont = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-blog-serif',
  display: 'swap',
})

export const blogFontVars = `${displayFont.variable} ${monoFont.variable} ${serifFont.variable}`

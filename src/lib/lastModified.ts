import lastmod from './lastmod.json'

/**
 * Sitemap <lastmod> values.
 *
 * Dates come from src/lib/lastmod.json, generated from git history by
 * scripts/generate-lastmod.mjs (`npm run seo:lastmod`), so they only change when a
 * page's source changes — not on every build. Blog posts and case studies use their
 * own publish dates (see sitemap.ts).
 */
const DATES = lastmod as Record<string, string>

/** Parse a display date such as "July 1, 2026" as UTC midnight (independent of build timezone). */
export function parseDisplayDate(value: string): Date {
  return new Date(`${value} 00:00:00 UTC`)
}

export function routeLastModified(route: string): Date {
  return new Date(DATES[route] ?? DATES['@default'])
}

export function groupLastModified(group: '@landing' | '@glossary' | '@de'): Date {
  return new Date(DATES[group] ?? DATES['@default'])
}

/** Most recent of the given dates (used for index pages such as /blog and /case-studies). */
export function latestDate(dates: Date[], fallback: Date): Date {
  const valid = dates.filter((d) => !Number.isNaN(d.getTime()))
  return valid.length ? new Date(Math.max(...valid.map((d) => d.getTime()))) : fallback
}

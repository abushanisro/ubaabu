#!/usr/bin/env node
/**
 * Regenerates src/lib/lastmod.json — the per-route "last content change" dates used by
 * src/app/sitemap.ts. Each date is the most recent git commit touching that route's
 * source files, so sitemap <lastmod> only moves when the content actually changes
 * (instead of changing on every build).
 *
 * Run after content changes you want reflected in the sitemap:
 *   npm run seo:lastmod
 * then commit src/lib/lastmod.json with the content change.
 *
 * Blog posts and case studies are NOT listed here: sitemap.ts uses their own
 * publish dates (blogData.ts `date`, caseStudyData.ts `dateISO`).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// route -> source paths (files or directories) that define the page's content
const ROUTES = {
  '/': ['src/app/page.tsx', 'src/components/sections', 'src/components/emithran'],
  '/products': ['src/app/products/page.tsx', 'src/components/products'],
  '/solutions': ['src/app/solutions/page.tsx', 'src/components/solutions'],
  '/industries': ['src/app/industries/page.tsx', 'src/components/industries'],
  '/pricing': ['src/app/pricing/page.tsx', 'src/components/pricing'],
  '/why-emithran': ['src/app/why-emithran/page.tsx'],
  '/expert-engineering-support': ['src/app/expert-engineering-support'],
  '/about': ['src/app/about/page.tsx', 'src/components/about'],
  '/about/partners': ['src/app/about/partners/page.tsx', 'src/components/partners/PartnersPage.tsx', 'src/components/partners/partnerData.ts'],
  '/about/partners/become-a-partner': ['src/app/about/partners/become-a-partner', 'src/components/partners/BecomeAPartner.tsx'],
  '/about/partners/vendor-onboarding': ['src/app/about/partners/vendor-onboarding', 'src/components/partners/VendorOnboarding.tsx'],
  '/contact': ['src/app/contact/page.tsx', 'src/components/contact'],
  '/request-demo': ['src/app/request-demo/page.tsx', 'src/components/request-demo'],
  '/should-cost-analysis-software': ['src/app/should-cost-analysis-software'],
  '/bom-management-software': ['src/app/bom-management-software'],
  '/supplier-intelligence': ['src/app/supplier-intelligence'],
  '/defence-manufacturing': ['src/app/defence-manufacturing'],
  '/aerospace-cost-engineering': ['src/app/aerospace-cost-engineering'],
  '/state-of-manufacturing-cost-intelligence-2026': ['src/app/state-of-manufacturing-cost-intelligence-2026'],
  '/faq': ['src/app/faq/page.tsx', 'src/components/faq'],
  '/privacy': ['src/app/privacy/page.tsx', 'src/components/privacy'],
  '/terms': ['src/app/terms/page.tsx', 'src/components/legal/TermsPage.tsx'],
  '/cookies': ['src/app/cookies/page.tsx', 'src/components/legal/CookiesPage.tsx'],
  '/dpa': ['src/app/dpa/page.tsx', 'src/components/legal/DPAPage.tsx'],
  '/emithran-vs-apriori': ['src/app/emithran-vs-apriori'],
  '/emithran-vs-costimator': ['src/app/emithran-vs-costimator'],
  '/emithran-vs-dfma': ['src/app/emithran-vs-dfma'],
  '/emithran-vs-tset': ['src/app/emithran-vs-tset'],
  '/emithran-vs-teamcenter': ['src/app/emithran-vs-teamcenter'],
  // Data-driven groups (one shared source of content)
  '@landing': ['src/components/seo/seoRoadmapData.ts', 'src/components/seo/SeoLandingPage.tsx', 'src/app/[slug]'],
  '@glossary': ['src/components/seo/seoRoadmapData.ts', 'src/app/glossary'],
  '@de': ['src/components/seo/seoRoadmapData.ts', 'src/app/de'],
}

// Commits that touched many pages without changing their content (sitewide metadata or
// config refactors). List full or abbreviated hashes, one per line, in
// scripts/lastmod-ignore-commits.txt — they are skipped when picking a route's date.
const ignorePath = resolve(root, 'scripts/lastmod-ignore-commits.txt')
const ignored = existsSync(ignorePath)
  ? readFileSync(ignorePath, 'utf8').split('\n').map((line) => line.split('#')[0].trim()).filter(Boolean)
  : []
const isIgnored = (hash) => ignored.some((h) => hash.startsWith(h))

function gitDate(paths) {
  const out = execFileSync('git', ['log', '--format=%H %cI', '--', ...paths], { cwd: root, encoding: 'utf8' })
  for (const line of out.split('\n').filter(Boolean)) {
    const [hash, date] = line.split(' ')
    if (!isIgnored(hash)) return date
  }
  return null
}

const result = {}
for (const [route, paths] of Object.entries(ROUTES)) {
  const date = gitDate(paths)
  if (date) result[route] = new Date(date).toISOString()
  else console.warn(`No git history for ${route} (${paths.join(', ')}) — skipped`)
}
result['@default'] = new Date(gitDate(['src'])).toISOString()

writeFileSync(resolve(root, 'src/lib/lastmod.json'), JSON.stringify(result, null, 2) + '\n')
console.log(`Wrote src/lib/lastmod.json (${Object.keys(result).length} entries)`)

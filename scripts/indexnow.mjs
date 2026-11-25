#!/usr/bin/env node
/**
 * Submit every URL in the live sitemaps to IndexNow (Bing, Yandex, Seznam, Naver…;
 * Bing feeds Copilot and ChatGPT search). SEO audit Nov 2026, issues #02 and #13.
 *
 * Run after each production deploy that publishes or changes pages:
 *   npm run seo:indexnow                 # all sitemap URLs
 *   npm run seo:indexnow -- /blog/new-post /glossary/new-term   # just these paths
 *   npm run seo:indexnow -- --dry-run    # list what would be sent, send nothing
 *
 * The key file public/01592b1fc2bc8a2619447964ff2f0ea4.txt must stay deployed at the site root:
 * IndexNow fetches it to verify the submission comes from the site owner.
 */
const SITE = process.env.SITE_URL ?? 'https://www.emithran.com'
const KEY = '01592b1fc2bc8a2619447964ff2f0ea4'
const host = new URL(SITE).host

async function sitemapUrls() {
  const index = await (await fetch(`${SITE}/sitemap.xml`)).text()
  const children = [...index.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
  const urls = []
  for (const child of children) {
    const xml = await (await fetch(child)).text()
    urls.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]))
  }
  return urls
}

const dryRun = process.argv.includes('--dry-run')
const args = process.argv.slice(2).filter((a) => a !== '--dry-run')
const urlList = args.length ? args.map((p) => new URL(p, SITE).toString()) : await sitemapUrls()

if (dryRun) {
  console.log(`IndexNow dry run: would submit ${urlList.length} URLs for ${host}`)
  console.log(urlList.slice(0, 5).join('\n'))
  process.exit(0)
}

for (let i = 0; i < urlList.length; i += 10000) {
  const batch = urlList.slice(i, i + 10000)
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
  })
  console.log(`IndexNow: submitted ${batch.length} URLs -> HTTP ${res.status}`)
}

import { SITE_URL } from '@/lib/sitemapEntries'

/**
 * robots.txt as a route handler.
 *
 * Nov 2026 audit (finding 07): the previous file repeated a `Content-Signal` line in
 * 15 separate groups. Lighthouse's robots parser treats Content-Signal as an unknown
 * directive and failed the robots-txt audit on every page (SEO score capped at 92),
 * and it listed a non-existent "Gemini" user agent. All crawlers share the same rules,
 * so they are now one valid group. The content-use preference is kept as a comment.
 */
export const dynamic = 'force-static'

// AI and search crawlers we explicitly welcome (all follow the same rules as `*`).
// Google-Extended covers Gemini; there is no separate "Gemini" crawler token.
const NAMED_AGENTS = [
  'Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'CCBot',
]

export function GET() {
  const body = [
    '# Emithran — https://www.emithran.com',
    '# Content-use preference: search=yes, ai-input=yes (pages may be indexed, shown in search',
    '# results and used as input for AI answers). ai-train: no preference. https://contentsignals.org',
    '',
    'User-agent: *',
    ...NAMED_AGENTS.map((ua) => `User-agent: ${ua}`),
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

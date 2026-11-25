import { SITE_URL } from '@/lib/sitemapEntries'

/**
 * robots.txt as a route handler (instead of app/robots.ts) so it can carry the
 * Content-Signal directive, which Next's MetadataRoute.Robots type cannot express
 * (SEO audit Nov 2026, issue #13). https://contentsignals.org
 */
export const dynamic = 'force-static'

const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Gemini', 'Bingbot', 'CCBot',
]

export function GET() {
  const body = [
    '# Emithran — https://www.emithran.com',
    '# Content signals: search=yes (index and show in search results), ai-input=yes (use as input for AI answers).',
    '# ai-train is left unset (no preference expressed). See https://contentsignals.org',
    '',
    'User-agent: *',
    'Content-Signal: search=yes, ai-input=yes',
    'Allow: /',
    'Disallow: /api/',
    '',
    ...AI_AGENTS.flatMap((ua) => [`User-agent: ${ua}`, 'Content-Signal: search=yes, ai-input=yes', 'Allow: /', 'Disallow: /api/', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

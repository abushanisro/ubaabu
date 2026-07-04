import { MetadataRoute } from 'next'

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',             allow: '/', disallow: ['/api/'] },
      { userAgent: 'GPTBot',        allow: '/' },
      { userAgent: 'ClaudeBot',     allow: '/' },
      { userAgent: 'Claude-User',   allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'anthropic-ai',  allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Gemini',        allow: '/' },
      { userAgent: 'CCBot',         allow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

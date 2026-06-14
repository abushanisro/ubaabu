import { MetadataRoute } from 'next'

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',             allow: '/', disallow: ['/api/', '/request-demo'] },
      { userAgent: 'GPTBot',        allow: '/' },
      { userAgent: 'ClaudeBot',     allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'anthropic-ai',  allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Gemini',        allow: '/' },
      { userAgent: 'CCBot',         allow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}

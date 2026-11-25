import type { NextConfig } from 'next'

/**
 * Content-Security-Policy, shipped in Report-Only mode first (SEO audit Nov 2026, #15):
 * violations are reported in the browser console without blocking anything. Once a
 * week of production traffic shows no unexpected violations, rename the header to
 * `Content-Security-Policy` to enforce it.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://chatling.ai https://*.chatling.ai https://challenges.cloudflare.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://chatling.ai https://*.chatling.ai",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://chatling.ai https://*.chatling.ai https://*.supabase.co https://challenges.cloudflare.com https://prod.spline.design https://*.spline.design https://vitals.vercel-insights.com https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com",
  "frame-src 'self' https://challenges.cloudflare.com https://chatling.ai https://*.chatling.ai https://www.youtube.com https://www.youtube-nocookie.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // Add 'upgrade-insecure-requests' when switching to the enforced header (it is ignored in Report-Only).
].join('; ')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Two root layouts ((site) = lang="en", (de) = lang="de") need a global 404 page.
    globalNotFound: true,
    // Not using experimental.inlineCss: tested Nov 2026 and mobile LCP got worse
    // (3.6 s -> 5.7-5.9 s on PageSpeed) because Next sends the CSS twice and the
    // homepage HTML roughly doubled. Keep the external stylesheets.
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/blog/bom-accuracy-tier1-suppliers',        destination: '/bom-management-software', permanent: true },
      { source: '/blog/emithran-series-a-announcement',      destination: '/about',                   permanent: true },
      { source: '/blog/launch-tracker-rfq-cycle',            destination: '/rfq-intelligence',         permanent: true },
      { source: '/blog/otif-logistics-intelligence',         destination: '/supplier-intelligence', permanent: true },
      { source: '/blog/precision-manufacturing-india-global', destination: '/industries',             permanent: true },
      { source: '/blog/supplier-radar-defence-manufacturing', destination: '/supplier-intelligence',  permanent: true },
      { source: '/blog/vave-cost-reduction-aerospace',       destination: '/vave-software',            permanent: true },
      { source: '/emithran-vs-apriori', destination: '/blog/apriori-vs-emithran-comparison', permanent: true },
      { source: '/emithran-vs-costimator', destination: '/blog/costimator-alternatives', permanent: true },
      { source: '/resources/should-cost-excel-template', destination: '/blog/should-cost-excel-template', permanent: true },
      // SEO audit Nov 2026 #06/#07 — merge cannibalising should-cost URLs and thin overlaps.
      { source: '/should-cost-modeling-software', destination: '/should-cost-analysis-software', permanent: true },
      { source: '/supply-chain-intelligence', destination: '/supplier-intelligence', permanent: true },
      { source: '/blog/should-cost-analysis-guide', destination: '/blog/what-is-should-cost-analysis', permanent: true },
      { source: '/blog/should-cost-modeling-software', destination: '/blog/should-cost-analysis-software-comparison', permanent: true },
      { source: '/blog/should-cost-modeling-software-buyers-guide', destination: '/blog/should-cost-analysis-software-comparison', permanent: true },
      { source: '/favicon.ico', destination: '/assets/favicon/favicon.ico', permanent: false },
      { source: '/should-cost-analysis', destination: '/should-cost-analysis-software', permanent: true },
      { source: '/bom-management', destination: '/bom-management-software', permanent: true },
      { source: '/emuski', destination: '/expert-engineering-support', permanent: true },
      { source: '/ai-for-manufacturing', destination: '/expert-engineering-support', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/assets/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/videos/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/de/:path*',
        headers: [{ key: 'Content-Language', value: 'de' }],
      },
      {
        source: '/de',
        headers: [{ key: 'Content-Language', value: 'de' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'Content-Security-Policy-Report-Only', value: CSP },
        ],
      },
    ]
  },
}

export default nextConfig
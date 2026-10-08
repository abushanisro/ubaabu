import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      { source: '/blog/otif-logistics-intelligence',         destination: '/supply-chain-intelligence', permanent: true },
      { source: '/blog/precision-manufacturing-india-global', destination: '/industries',             permanent: true },
      { source: '/blog/supplier-radar-defence-manufacturing', destination: '/supplier-intelligence',  permanent: true },
      { source: '/blog/vave-cost-reduction-aerospace',       destination: '/vave-software',            permanent: true },
      { source: '/favicon.ico', destination: '/assets/favicon/favicon.ico', permanent: false },
      { source: '/should-cost-analysis', destination: '/should-cost-analysis-software', permanent: true },
      { source: '/bom-management', destination: '/bom-management-software', permanent: true },
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
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ]
  },
}

export default nextConfig
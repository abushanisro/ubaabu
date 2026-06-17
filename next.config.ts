import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: '/blog/bom-accuracy-tier1-suppliers',        destination: '/bom-management-software', permanent: true },
      { source: '/blog/emithran-series-a-announcement',      destination: '/about',                   permanent: true },
      { source: '/blog/launch-tracker-rfq-cycle',            destination: '/products',                permanent: true },
      { source: '/blog/otif-logistics-intelligence',         destination: '/products',                permanent: true },
      { source: '/blog/precision-manufacturing-india-global', destination: '/industries',             permanent: true },
      { source: '/blog/supplier-radar-defence-manufacturing', destination: '/products',               permanent: true },
      { source: '/blog/vave-cost-reduction-aerospace',       destination: '/solutions',               permanent: true },
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
    ]
  },
}

export default nextConfig
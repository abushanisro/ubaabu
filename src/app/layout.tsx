import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import ConditionalNavbar from '@/components/layout/ConditionalNavbar'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import WhatsAppButton from '@/components/ui/whatsapp-button'

const sora = Sora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emithran.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Emithran',
  legalName: 'Emithran Technologies Pvt. Ltd.',
  url: siteUrl,
  logo: `${siteUrl}/assets/infographics/logo/logo-black.png`,
  description:
    'End-to-end manufacturing intelligence platform for space, defence, aerospace, and precision manufacturing companies in India.',
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: `${siteUrl}/contact`,
  },
  knowsAbout: [
    'Manufacturing Intelligence',
    'Should Cost Analysis',
    'BOM Management',
    'Defence Manufacturing',
    'Aerospace Manufacturing',
    'Supply Chain Optimisation',
    'Precision Engineering',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Emithran — End-to-End Manufacturing Intelligence',
    template: '%s | Emithran',
  },
  description:
    'Emithran is an end-to-end manufacturing intelligence platform built for space, defence, aerospace, and precision manufacturing companies in India.',
  keywords: [
    'manufacturing intelligence',
    'defence manufacturing',
    'supply chain India',
    'aerospace manufacturing platform',
    'should cost analysis',
    'BOM management',
    'precision engineering software',
    'space manufacturing India',
    'cost estimation tool',
    'manufacturing analytics',
  ],
  authors: [{ name: 'Emithran Technologies Pvt. Ltd.', url: siteUrl }],
  creator: 'Emithran Technologies Pvt. Ltd.',
  publisher: 'Emithran Technologies Pvt. Ltd.',
  category: 'Technology',
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/infographics/logo/logo-black.png', type: 'image/png' },
    ],
    apple: '/assets/infographics/logo/logo-black.png',
    shortcut: '/assets/infographics/logo/logo-black.png',
  },
  openGraph: {
    title: 'Emithran — End-to-End Manufacturing Intelligence',
    description:
      'Built for space, defence, aerospace, and precision manufacturing in India.',
    url: siteUrl,
    siteName: 'Emithran',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Emithran — Manufacturing Intelligence Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emithran — Manufacturing Intelligence',
    description:
      'Built for space, defence, aerospace, and precision manufacturing in India.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <span aria-hidden className="pointer-events-none fixed inset-y-0 z-40 w-px bg-black/[0.08] hidden md:block" style={{ left: 64 }} />
        <span aria-hidden className="pointer-events-none fixed inset-y-0 z-40 w-px bg-black/[0.08] hidden md:block" style={{ right: 64 }} />
        <ConditionalNavbar />
        <main className="relative z-10">{children}</main>
        <ConditionalFooter />
        <WhatsAppButton />
      </body>
    </html>
  )
}

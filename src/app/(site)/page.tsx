import type { Metadata } from 'next'
import { languageAlternates } from '@/lib/hreflang'

export const metadata: Metadata = {
  // Title kept at 52 chars (ideal range is 50-60 / ~600px) with the primary keyword
  // front-loaded and brand last — already matches 2026 best practice, not changed.
  title: 'Manufacturing Intelligence Platform India | Emithran',
  // Trimmed to ~153 chars (2026 guidance: 120-158 chars / ~920px to avoid truncation
  // on desktop and mobile SERPs) while keeping the customer names + headline stat.
  description:
    "AI manufacturing intelligence for space, defence & aerospace OEMs in India. Trusted by Ashok Leyland, TATA Power, Pixxel & Digantara. 99.4% BOM accuracy.",
  keywords: [
    'manufacturing intelligence platform India', 'AI manufacturing software India',
    'should cost analysis software', 'BOM management software',
    'defence manufacturing platform', 'aerospace cost engineering India',
    'supplier intelligence platform', 'space manufacturing India',
    'manufacturing cost estimation', 'manufacturing process library',
  ],
  alternates: { canonical: '/', languages: languageAlternates('/') },
  openGraph: {
    images: ogImages,
    title: 'Manufacturing Intelligence Platform India | Emithran',
    description: 'AI-powered BOM management, should-cost analysis, and supplier intelligence for defence, aerospace, and space OEMs in India. 99.4% BOM accuracy.',
    url: '/',
    type: 'website',
    // Next.js does not merge openGraph/twitter objects with the root layout when a
    // page defines its own — these were silently missing on the homepage without
    // being restated here.
    siteName: 'Emithran',
    locale: 'en_US',
  },
  twitter: {
    // Same gap as above: omitting `card` here was falling back to the small
    // "summary" card instead of the large-image card the rest of the site uses.
    card: 'summary_large_image',
    site: '@emithran',
    creator: '@emithran',
    title: 'Manufacturing Intelligence Platform India | Emithran',
    description: "India's leading AI-powered BOM, should-cost, and supplier intelligence platform. Trusted by India's top OEMs.",
  },
}

import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'

// Below-the-fold client sections are split into their own chunks. They are still
// server-rendered (same HTML for users and crawlers), but each hydrates on its own
// instead of in one long main-thread task with the hero, so the first paint and the
// LCP image are not held up (PageSpeed mobile, Nov 2026: ~2 s element render delay).
const PlatformShowcase = dynamic(() => import('@/components/sections/PlatformShowcase'))
const ProductIntelligence = dynamic(() => import('@/components/sections/ProductIntelligence'))
const StatsSection = dynamic(() => import('@/components/sections/StatsSection'))
const WatchDemo = dynamic(() => import('@/components/sections/WatchDemo'))
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'))
const EnterpriseSection = dynamic(() => import('@/components/sections/EnterpriseSection'))
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'))
import FAQ from '@/components/sections/FAQ'
import VendorManagementApp from '@/components/sections/VendorManagementApp'
import PlatformPartnership from '@/components/sections/PlatformPartnership'
import HomeExploreLinks from '@/components/sections/HomeExploreLinks'
import { ogImages } from '@/lib/seo'
import { organizationSchema, softwareSchema, websiteSchema } from '@/lib/schema'
import { HERO_THUMB } from '@/lib/heroImage'
import DeferredSection from '@/components/layout/DeferredSection'
import HashAnchorFix from '@/components/layout/HashAnchorFix'
export default function App() {
  return (
    <>
      {/* LCP image preload (homepage only; React hoists these into <head>). It's
          tiny, so it is ready for the very first paint instead of waiting for
          the frame after hydration. */}
      <link rel="preload" as="image" href="/assets/cards/projectcard.webp" media="(min-width: 1024px)" fetchPriority="high" />
      {/* Mobile: the decorative background is inline SVG now, so the product thumbnail is the
          largest image above the fold — preload it for phones (SEO audit #04). */}
      <link rel="preload" as="image" href={HERO_THUMB.src} imageSrcSet={HERO_THUMB.srcSet} imageSizes={HERO_THUMB.sizes} media="(max-width: 1023px)" fetchPriority="high" />
      {/* Organization + WebSite are declared once, here, with stable @ids; every other page
          references them by @id (SEO audit #12). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, softwareSchema()]) }} />
      <HashAnchorFix />
      <Hero />
      <DeferredSection height={3000}><PlatformShowcase /></DeferredSection>
      <DeferredSection height={650}><StatsSection /></DeferredSection>
      <DeferredSection height={2100}><ProductIntelligence /></DeferredSection>
      <div className="bg-white h-10 lg:h-16" />
      <WatchDemo />
      <DeferredSection height={680}><CaseStudies /></DeferredSection>
      <DeferredSection height={800}><EnterpriseSection /></DeferredSection>
      <DeferredSection height={520}><VendorManagementApp /></DeferredSection>
      <DeferredSection height={900}><PlatformPartnership /></DeferredSection>
      <DeferredSection height={700}><HomeExploreLinks /></DeferredSection>
      <DeferredSection height={560}><FinalCTA /></DeferredSection>
      <DeferredSection height={320}><FAQ /></DeferredSection>
    </>
  )
}

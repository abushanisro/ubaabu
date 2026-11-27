import type { Metadata } from 'next'
import { languageAlternates } from '@/lib/hreflang'

export const metadata: Metadata = {
  // Nov 2026 audit (findings 03 + 05): brand-led and market-neutral (the site targets
  // India, the US and the UK). "Manufacturing intelligence platform" is owned by
  // /manufacturing-intelligence so the homepage no longer competes with it.
  title: { absolute: 'Emithran | Should-Cost, BOM & Supplier Intelligence Software' },
  // Trimmed to ~153 chars (2026 guidance: 120-158 chars / ~920px to avoid truncation
  // on desktop and mobile SERPs) while keeping the customer names + headline stat.
  description:
    "AI should-cost, BOM and supplier intelligence for aerospace, defence, space and industrial OEMs. Trusted by Ashok Leyland, TATA Power, Pixxel & Digantara.",
  keywords: [
    'should cost software', 'manufacturing cost estimating software',
    'should cost analysis software', 'BOM management software',
    'defence manufacturing platform', 'aerospace cost engineering India',
    'supplier intelligence platform', 'space manufacturing India',
    'manufacturing cost estimation', 'manufacturing process library',
  ],
  alternates: { canonical: '/', languages: languageAlternates('/') },
  openGraph: {
    images: ogImages,
    title: 'Emithran | Should-Cost, BOM & Supplier Intelligence Software',
    description: 'AI-powered should-cost analysis, BOM management and supplier intelligence for aerospace, defence, space and industrial OEMs. 99.4% BOM accuracy.',
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
    title: 'Emithran | Should-Cost, BOM & Supplier Intelligence Software',
    description: 'AI-powered should-cost, BOM and supplier intelligence for aerospace, defence, space and industrial OEMs.',
  },
}

import Hero from '@/components/sections/Hero'
import FinalCTA from '@/components/sections/FinalCTA'
// Heavy interactive sections: server-rendered, hydrated only when scrolled near
// (see HomeDeferredSections.tsx).
import {
  PlatformShowcase,
  StatsSection,
  ProductIntelligence,
  WatchDemo,
  CaseStudies,
  EnterpriseSection,
} from '@/components/sections/HomeDeferredSections'
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
      <DeferredSection id="home-platform" height={3000}><PlatformShowcase /></DeferredSection>
      <DeferredSection id="home-stats" height={650}><StatsSection /></DeferredSection>
      <DeferredSection id="home-product" height={2100}><ProductIntelligence /></DeferredSection>
      <div className="bg-white h-10 lg:h-16" />
      <div id="home-watch"><WatchDemo /></div>
      <DeferredSection id="home-cases" height={680}><CaseStudies /></DeferredSection>
      <DeferredSection id="home-enterprise" height={800}><EnterpriseSection /></DeferredSection>
      <DeferredSection height={520}><VendorManagementApp /></DeferredSection>
      <DeferredSection height={900}><PlatformPartnership /></DeferredSection>
      <DeferredSection height={700}><HomeExploreLinks /></DeferredSection>
      <DeferredSection height={560}><FinalCTA /></DeferredSection>
      <DeferredSection height={320}><FAQ /></DeferredSection>
    </>
  )
}

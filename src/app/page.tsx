import type { Metadata } from 'next'

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
  alternates: { canonical: '/' },
  openGraph: {
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

import Hero from '@/components/sections/Hero'
import PlatformShowcase from '@/components/sections/PlatformShowcase'
import ProductIntelligence from '@/components/sections/ProductIntelligence'
import StatsSection from '@/components/sections/StatsSection'
import WatchDemo from '@/components/sections/WatchDemo'
import CaseStudies from '@/components/sections/CaseStudies'
import EnterpriseSection from '@/components/sections/EnterpriseSection'
import FinalCTA from '@/components/sections/FinalCTA'
import FAQ from '@/components/sections/FAQ'
export default function App() {
  return (
    <>
      <Hero />
      <PlatformShowcase />
      <StatsSection />
      <ProductIntelligence />
      <div className="bg-white h-16 lg:h-24" />
      <WatchDemo />
      <CaseStudies />
      <EnterpriseSection />
      <FinalCTA />
      <FAQ />
    </>
  )
}

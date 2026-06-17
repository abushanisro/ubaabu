import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emithran | Manufacturing Intelligence for India\'s OEMs',
  description:
    'Emithran gives India\'s space, defence, and aerospace OEMs end-to-end BOM management, should-cost analysis, and supplier intelligence. Cut costs, reduce risk, and ship faster.',
  keywords: [
    'manufacturing intelligence platform India', 'AI manufacturing software India',
    'should cost analysis tool', 'BOM management software',
    'defence manufacturing platform', 'aerospace cost engineering India',
    'supplier intelligence', 'space manufacturing India', 'OEM manufacturing software',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Emithran - End-to-End Manufacturing Intelligence Platform',
    description: 'BOM management, should-cost analysis, and supplier intelligence for space, defence, and aerospace in India.',
    url: '/',
    type: 'website',
  },
  twitter: {
    title: 'Emithran - Manufacturing Intelligence for Space, Defence & Aerospace',
    description: 'AI-powered BOM, should-cost, and supplier intelligence. Built for India\'s leading OEMs.',
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

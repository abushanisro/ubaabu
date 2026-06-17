import type { Metadata } from 'next'

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'Emithran | Manufacturing Intelligence for India\'s OEMs',
=======
  title: 'Manufacturing Intelligence Platform India | Emithran',
>>>>>>> 67f0da601264d9aa1479ca1f7dc9be49ad1dae4d
  description:
    "India's leading manufacturing intelligence platform for space, defence, and aerospace OEMs. Trusted by Ashok Leyland, TATA Power, Pixxel & Digantara. 99.4% BOM accuracy. Request a demo.",
  keywords: [
    'manufacturing intelligence platform India', 'AI manufacturing software India',
    'should cost analysis tool', 'BOM management software',
    'defence manufacturing platform', 'aerospace cost engineering India',
    'supplier intelligence', 'space manufacturing India', 'OEM manufacturing software',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Manufacturing Intelligence Platform India | Emithran',
    description: 'BOM management, should-cost analysis, and supplier intelligence for space, defence, and aerospace in India. Trusted by Ashok Leyland, TATA Power, Pixxel & Digantara.',
    url: '/',
    type: 'website',
  },
  twitter: {
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

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emithran — End-to-End Manufacturing Intelligence',
  description:
    'Emithran helps space, defence, aerospace, and precision manufacturing companies in India cut costs, manage BOMs, and accelerate sourcing with AI-powered intelligence.',
  alternates: { canonical: '/' },
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

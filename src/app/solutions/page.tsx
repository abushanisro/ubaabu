import SolutionsHero from '@/components/solutions/SolutionsHero'
import DesignSection   from '@/components/solutions/sections/DesignSection'
import SupplierSection from '@/components/solutions/sections/SupplierSection'
import CostSection     from '@/components/solutions/sections/CostSection'
import RiskSection     from '@/components/solutions/sections/RiskSection'
import VaveSection      from '@/components/solutions/sections/VaveSection'
import TrackingSection from '@/components/solutions/sections/TrackingSection'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Solutions | Manufacturing Intelligence Value Chain',
  description:
    'End-to-end manufacturing solutions: design cost modelling, supplier evaluation, cost engineering, risk intelligence, VAVE analysis, and delivery tracking - powered by AI and 72,000+ supplier data points.',
  keywords: [
    'manufacturing solutions India', 'supply chain intelligence', 'cost modelling software',
    'supplier evaluation platform', 'design for manufacturing', 'VAVE cost reduction',
    'NPI tracking software', 'OEM supply chain analytics',
  ],
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Emithran Solutions - End-to-End Manufacturing Intelligence',
    description: 'From design to delivery: AI-powered solutions for cost, quality, supplier, and risk management.',
    url: '/solutions', type: 'website',
  },
}

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />

      {/*
        Single wrapper that bounds the sticky nav.
        `sticky top-20` on the nav stops working once this div's
        bottom edge passes the viewport - no JS needed.
        All section components live here in nav order.
      */}
      <div>
        <DesignSection />
        <SupplierSection />
        <CostSection />
        <RiskSection />
        <VaveSection />
        <TrackingSection />
        {/* CostSection      id="cost"     - coming next */}
        {/* RiskSection      id="risk"     - coming next */}
        {/* VaveSection      id="vave"     - coming next */}
        {/* TrackingSection  id="tracking" - coming next */}
      </div>
    </>
  )
}

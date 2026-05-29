import SolutionsHero from '@/components/solutions/SolutionsHero'
import SolutionsNav from '@/components/solutions/SolutionsNav'
import DesignSection   from '@/components/solutions/sections/DesignSection'
import SupplierSection from '@/components/solutions/sections/SupplierSection'
import CostSection     from '@/components/solutions/sections/CostSection'
import RiskSection     from '@/components/solutions/sections/RiskSection'
import VaveSection      from '@/components/solutions/sections/VaveSection'
import TrackingSection from '@/components/solutions/sections/TrackingSection'

export const metadata = {
  title: 'Solutions | Emithran Manufacturing Intelligence',
  description:
    'Manufacturing intelligence across your entire value chain — from design conception to supplier delivery, powered by AI and 72,000+ supplier data points.',
}

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />

      {/*
        Single wrapper that bounds the sticky nav.
        `sticky top-20` on the nav stops working once this div's
        bottom edge passes the viewport — no JS needed.
        All section components live here in nav order.
      */}
      <div>
        <SolutionsNav />
        <DesignSection />
        <SupplierSection />
        <CostSection />
        <RiskSection />
        <VaveSection />
        <TrackingSection />
        {/* CostSection      id="cost"     — coming next */}
        {/* RiskSection      id="risk"     — coming next */}
        {/* VaveSection      id="vave"     — coming next */}
        {/* TrackingSection  id="tracking" — coming next */}
      </div>
    </>
  )
}

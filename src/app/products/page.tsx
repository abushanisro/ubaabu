import ProductsHero from '@/components/products/ProductsHero'
import BomComposerSection from '@/components/products/BomComposerSection'
import ShouldCostSection from '@/components/products/ShouldCostSection'
import VaveStudioSection from '@/components/products/VaveStudioSection'
import SupplierRadarSection from '@/components/products/SupplierRadarSection'
import VendorMatchSection from '@/components/products/VendorMatchSection'
import LaunchTrackerSection from '@/components/products/LaunchTrackerSection'
import QualityGuardSection from '@/components/products/QualityGuardSection'
import BenchmarkAnalysisSection from '@/components/products/BenchmarkAnalysisSection'
import ShipmentHubSection from '@/components/products/ShipmentHubSection'
import CostBenchmarkerSection from '@/components/products/CostBenchmarkerSection'
import ProductsCTA from '@/components/products/ProductsCTA'

export const metadata = {
  title: 'Products | Emithran Manufacturing Intelligence',
  description:
    'Explore Emithran product modules — modular, connected, and designed to scale across your entire manufacturing value chain.',
}

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <BomComposerSection />
      <ShouldCostSection />
      <VaveStudioSection />
      <SupplierRadarSection />
      <VendorMatchSection />
      <LaunchTrackerSection />
      <QualityGuardSection />
      <BenchmarkAnalysisSection />
      <ShipmentHubSection />
      <CostBenchmarkerSection />
      <ProductsCTA />
    </>
  )
}

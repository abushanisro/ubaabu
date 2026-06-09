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

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Products — BOM Intelligence, Should-Cost, Supplier Radar & More',
  description:
    'Emithran\'s AI modules: BOM Composer, Should-Cost Analysis, Supplier Radar, VAVE Studio, Quality Guard, Launch Tracker, and Shipment Hub — built for defence, aerospace, and space manufacturers.',
  keywords: [
    'BOM management software', 'should cost analysis platform', 'supplier radar tool',
    'VAVE analysis software', 'quality guard manufacturing', 'launch tracker NPI',
    'shipment hub OTIF', 'manufacturing intelligence modules',
  ],
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Emithran Products — Full Manufacturing Intelligence Suite',
    description: 'BOM Composer, Should-Cost, Supplier Radar, VAVE Studio, Quality Guard — all connected on one platform.',
    url: '/products', type: 'website',
  },
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
    </>
  )
}

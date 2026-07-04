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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.emithran.com'

const MODULES = [
  {
    name: 'Emithran BOM Composer',
    description: 'Auto-generates multi-level BOMs from CAD/design specs, links parts to suppliers, and syncs across design, procurement, manufacturing, and quality systems.',
    featureList: [
      'Auto-generate multi-level BOMs from CAD/design specs',
      'Link parts to suppliers and their capabilities',
      'Track revisions with automated change notifications',
      'Sync BOMs across design, procurement, manufacturing, quality systems',
      'Historical BOM tracking to understand cost and design evolution',
    ],
  },
  {
    name: 'Emithran Should-Cost Analysis',
    description: 'Estimates manufacturing cost based on materials and processes, benchmarks supplier quotes against should-cost, and identifies cost optimization opportunities.',
    featureList: [
      'Estimates manufacturing cost based on materials and processes',
      'Benchmarks quotes against should-cost',
      'Identifies cost optimization opportunities',
      'Tracks cost trends over time',
    ],
  },
  {
    name: 'Emithran VAVE Studio',
    description: 'Identifies design, material, process, and supplier optimizations, prioritizes VAVE ideas by impact and feasibility, and tracks savings realization.',
    featureList: [
      'Identifies design, material, process, and supplier optimizations',
      'Prioritizes VAVE ideas by impact and feasibility',
      'Structures VAVE workflow from ideation to implementation',
      'Tracks savings realization across portfolio',
    ],
  },
  {
    name: 'Emithran Supplier Radar',
    description: 'Aggregates supplier data continuously, calculates composite supplier health scoring, predicts supplier risk, and maps supplier capabilities.',
    featureList: [
      'Aggregates supplier data continuously',
      'Calculates composite supplier health scoring',
      'Predicts supplier risk',
      'Maps supplier capabilities',
    ],
  },
  {
    name: 'Emithran Vendor Match',
    description: 'Evaluates 1,000+ suppliers against fit criteria and returns a ranked shortlist with transparent selection rationale and one-click RFQ initiation.',
    featureList: [
      'Evaluates 1,000+ suppliers across fit criteria',
      'Returns ranked shortlist with matching analysis',
      'Shows transparent selection rationale',
      'Enables one-click RFQ initiation',
    ],
  },
  {
    name: 'Emithran Launch Tracker',
    description: 'Unifies project status across supplier, quality, and delivery, automates alerts for risks and constraints, and manages milestones and critical path.',
    featureList: [
      'Unifies project status across supplier, quality, and delivery',
      'Automates alerts for risks and constraints',
      'Tracks project-level costs',
      'Manages milestones and critical path',
    ],
  },
  {
    name: 'Emithran Quality Guard',
    description: 'Provides real-time quality metrics by part and supplier, analyzes defect trends and root causes, scores supplier quality, and manages corrective action workflows.',
    featureList: [
      'Provides real-time quality metrics by part/supplier',
      'Analyzes defect trends and root causes',
      'Scores supplier quality',
      'Manages corrective action workflows',
    ],
  },
  {
    name: 'Emithran Benchmark Analysis',
    description: 'Analyzes costs across suppliers, parts, and processes, benchmarks against market standards, and identifies cost outliers and opportunities.',
    featureList: [
      'Analyzes costs across suppliers, parts, processes',
      'Benchmarks against market standards',
      'Identifies cost outliers and opportunities',
      'Tracks cost trends over time',
    ],
  },
  {
    name: 'Emithran Shipment Hub',
    description: 'Tracks real-time shipments, predicts delivery risks, analyzes logistics costs, and automates customs and documentation for OTIF visibility.',
    featureList: [
      'Tracks real-time shipments',
      'Predicts delivery risks',
      'Analyzes logistics costs',
      'Automates customs & documentation',
    ],
  },
  {
    name: 'Emithran Cost Benchmarker',
    description: 'Benchmarks industry costs, analyzes cost structures comprehensively, and models scenarios for strategic sourcing decisions.',
    featureList: [
      'Benchmarks industry costs',
      'Analyzes cost structures comprehensively',
      'Models scenarios for strategic decisions',
    ],
  },
]

const modulesSchema = MODULES.map((mod) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: mod.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${siteUrl}/products`,
  description: mod.description,
  provider: { '@type': 'Organization', name: 'Emithran', url: siteUrl },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free pilot available' },
  featureList: mod.featureList,
}))

export const metadata: Metadata = {
  title: 'Products - BOM Intelligence, Should-Cost, Supplier Radar & More',
  description:
    'Emithran\'s AI modules: BOM Composer, Should-Cost Analysis, Supplier Radar, VAVE Studio, Quality Guard, Launch Tracker, and Shipment Hub - built for defence, aerospace, and space manufacturers.',
  keywords: [
    'BOM management software', 'should cost analysis platform', 'supplier radar tool',
    'VAVE analysis software', 'quality guard manufacturing', 'launch tracker NPI',
    'shipment hub OTIF', 'manufacturing intelligence modules',
  ],
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Emithran Products - Full Manufacturing Intelligence Suite',
    description: 'BOM Composer, Should-Cost, Supplier Radar, VAVE Studio, Quality Guard - all connected on one platform.',
    url: '/products', type: 'website',
  },
}

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(modulesSchema) }} />
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

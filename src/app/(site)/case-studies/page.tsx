import CaseStudyPage from '@/components/case-studies/CaseStudyPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  title: { absolute: 'Case Studies | Emithran Manufacturing Intelligence' },
  description:
    'Real-world manufacturing cost engineering and supply chain intelligence outcomes - from should-cost analysis to BOM validation and VAVE studies.',
  alternates: { canonical: '/case-studies' },
  openGraph: pageOpenGraph("/case-studies", "Case Studies | Emithran Manufacturing Intelligence", "Real-world manufacturing cost engineering and supply chain intelligence outcomes - from should-cost analysis to BOM validation and VAVE studies."),
}

export default function Page() {
  return <CaseStudyPage />
}

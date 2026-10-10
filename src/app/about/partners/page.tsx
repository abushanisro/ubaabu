import PartnersPage from '@/components/partners/PartnersPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  title: 'Partners',
  description: 'Accelerate your manufacturing business with Emithran certified partners - system integrators, technology providers, and industry consultants.',
  alternates: { canonical: '/about/partners' },
  openGraph: pageOpenGraph("/about/partners", "Partners | Emithran", "Accelerate your manufacturing business with Emithran certified partners - system integrators, technology providers, and industry consultants."),
}

export default function Page() {
  return <PartnersPage />
}

import BecomeAPartnerPage from '@/components/partners/BecomeAPartner'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/about/partners/become-a-partner' },
  openGraph: pageOpenGraph("/about/partners/become-a-partner", "Become a Partner | Emithran", "Join the Emithran partner ecosystem. Apply to become a certified manufacturing intelligence partner - system integrators, consultants, technology providers, and resellers welcome."),
  title: 'Become a Partner',
  description: 'Join the Emithran partner ecosystem. Apply to become a certified manufacturing intelligence partner - system integrators, consultants, technology providers, and resellers welcome.',
}

export default function Page() {
  return <BecomeAPartnerPage />
}

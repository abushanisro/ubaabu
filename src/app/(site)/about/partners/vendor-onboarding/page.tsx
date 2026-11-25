import VendorOnboardingPage from '@/components/partners/VendorOnboarding'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/about/partners/vendor-onboarding' },
  openGraph: pageOpenGraph("/about/partners/vendor-onboarding", "Vendor Onboarding | Emithran", "Register your manufacturing capabilities in the Emithran supplier database. Join 647+ verified vendors across space, defence, and aerospace."),
  title: 'Vendor Onboarding',
  description: 'Register your manufacturing capabilities in the Emithran supplier database. Join 647+ verified vendors across space, defence, and aerospace.',
}

export default function Page() {
  return <VendorOnboardingPage />
}

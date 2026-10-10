import TermsPage from '@/components/legal/TermsPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/terms' },
  openGraph: pageOpenGraph("/terms", "Terms of Service | Emithran", "The terms and conditions governing your access to and use of the Emithran manufacturing intelligence platform."),
  title: 'Terms of Service',
  description:
    'The terms and conditions governing your access to and use of the Emithran manufacturing intelligence platform.',
}

export default function Page() {
  return <TermsPage />
}

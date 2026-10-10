import DPAPage from '@/components/legal/DPAPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/dpa' },
  openGraph: pageOpenGraph("/dpa", "Data Processing Agreement | Emithran", "The Data Processing Agreement governing how Emithran processes personal data on behalf of business customers using the manufacturing intelligence platform."),
  title: 'Data Processing Agreement',
  description:
    'The Data Processing Agreement governing how Emithran processes personal data on behalf of business customers using the manufacturing intelligence platform.',
}

export default function Page() {
  return <DPAPage />
}

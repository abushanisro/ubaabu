import CookiesPage from '@/components/legal/CookiesPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/cookies' },
  openGraph: pageOpenGraph("/cookies", "Cookies Policy | Emithran", "Learn how Emithran uses cookies and similar technologies on its manufacturing intelligence platform and website."),
  title: 'Cookies Policy',
  description:
    'Learn how Emithran uses cookies and similar technologies on its manufacturing intelligence platform and website.',
}

export default function Page() {
  return <CookiesPage />
}

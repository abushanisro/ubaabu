import CookiesPage from '@/components/legal/CookiesPage'

import { pageOpenGraph } from '@/lib/seo'
export const metadata = {
  alternates: { canonical: '/cookies' },
  openGraph: pageOpenGraph("/cookies", "Cookies Policy | Emithran", "Learn how Emithran uses cookies and similar technologies on its manufacturing intelligence platform and website."),
  title: 'Cookies Policy',
  description:
    'How Emithran uses cookies and similar technologies on its website and manufacturing intelligence platform, and how you can manage your preferences.',
}

export default function Page() {
  return <CookiesPage />
}

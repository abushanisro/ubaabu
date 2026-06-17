import TermsPage from '@/components/legal/TermsPage'

export const metadata = {
  alternates: { canonical: '/terms' },
  title: 'Terms of Service | Emithran',
  description:
    'The terms and conditions governing your access to and use of the Emithran manufacturing intelligence platform.',
  alternates: { canonical: '/terms' },
}

export default function Page() {
  return <TermsPage />
}

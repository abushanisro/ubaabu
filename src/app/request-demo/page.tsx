import type { Metadata } from 'next'
import RequestDemoPage from '@/components/request-demo/RequestDemoPage'

export const metadata: Metadata = {
  title: 'Request a Demo | Emithran',
  description:
    'See how Emithran helps space, defence, and precision manufacturing teams cut costs, manage BOMs, and accelerate sourcing. Book a 30-minute live walkthrough.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <RequestDemoPage />
}

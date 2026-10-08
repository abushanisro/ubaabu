import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You for Subscribing | Emithran',
  description: 'You are subscribed to Emithran manufacturing intelligence updates.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/subscribe/thank-you' },
}

export default function SubscribeThankYouPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-[#f8fafc] px-6 py-24">
      <div className="w-full max-w-[480px] rounded-2xl border border-black/[0.07] bg-white shadow-xl shadow-black/[0.05] px-8 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-[#f0fdf9] border border-[#0d9e8a]/25 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={26} className="text-[#0d9e8a]" strokeWidth={2.2} />
        </div>

        <h1 className="font-display text-2xl font-bold text-[#0f1b2d] tracking-tight mb-3">
          Thank you for subscribing
        </h1>
        <p className="text-[14.5px] text-[#0f1b2d]/55 leading-relaxed mb-8">
          We've sent a confirmation to your inbox. You'll now get our latest manufacturing
          intelligence articles, case studies, and product updates - no spam, unsubscribe anytime.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
          >
            Read the Blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#0f1b2d] border border-black/10 hover:bg-black/[0.03] transition-colors w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

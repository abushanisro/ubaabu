import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const sora = Sora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Emithran — End-to-End Manufacturing Intelligence',
  description:
    'Emithran is an end-to-end manufacturing intelligence platform built for space, defence, aerospace, and precision manufacturing companies in India.',
  keywords:
    'manufacturing intelligence, defence manufacturing, supply chain, India, aerospace, should cost, BOM management',
  icons: {
    icon: '/assets/logo/logo-black.png',
    apple: '/assets/logo/logo-black.png',
  },
  openGraph: {
    title: 'Emithran — End-to-End Manufacturing Intelligence',
    description: 'Built for space, defence, aerospace, and precision manufacturing in India.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        {/* Column lines — fixed to screen edges, outside content area */}
        <span aria-hidden className="pointer-events-none fixed inset-y-0 z-40 w-px bg-black/[0.08]" style={{ left: 64 }} />
        <span aria-hidden className="pointer-events-none fixed inset-y-0 z-40 w-px bg-black/[0.08]" style={{ right: 64 }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

import { Sora, Inter } from 'next/font/google'
import Script from 'next/script'
import ConditionalNavbar from '@/components/layout/ConditionalNavbar'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import FooterOutro from '@/components/layout/FooterOutro'
import ChatlingController from '@/components/ui/chatling-controller'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import SiteJsonLd from '@/components/seo/SiteJsonLd'

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

/**
 * The <html> document shared by both root layouts. `lang` is set per layout so the
 * German section (/de/*) is served with lang="de" in the server HTML
 * (SEO audit Nov 2026, issue #08).
 *
 * Organization / WebSite / SoftwareApplication JSON-LD is no longer emitted here on
 * every page (issue #12): Organization and WebSite are declared once on the homepage
 * with stable @ids (see src/lib/schema.ts) and referenced elsewhere;
 * SoftwareApplication is emitted only on product pages.
 */
export default function RootShell({ lang, children }: { lang: 'en' | 'de'; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${sora.variable} ${inter.variable}`}>
      <head>
        {/* Critical inline CSS — prevents FOUC and CLS before Tailwind loads */}
        <style dangerouslySetInnerHTML={{ __html: 'html,body{background:#fff;margin:0;padding:0}*,*::before,*::after{box-sizing:border-box}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}' }} />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://chatling.ai" />
        <meta name="google" content="nositelinkssearchbox" />
      </head>
      <body style={{ backgroundColor: 'white' }}>
        <span aria-hidden className="pointer-events-none fixed inset-y-0 z-40 w-px bg-black/[0.08] hidden md:block" style={{ left: 64 }} />
        <span aria-hidden className="pointer-events-none fixed inset-y-0 z-40 w-px bg-black/[0.08] hidden md:block" style={{ right: 64 }} />

        {/* Outro: desktop only — iOS Safari has compositor bugs with large fixed background text; hidden on mobile to prevent scroll-bleed glitch */}
        <FooterOutro spacerId="footer-outro-spacer" />

        <ConditionalNavbar />
        <ChatlingController />

        {/* White content on top */}
        <div className="relative bg-white">
          <GoogleAnalytics />
          <SiteJsonLd />
          <main className="relative">{children}</main>
          <ConditionalFooter />
        </div>

        {/* Spacer — desktop only (mobile has no outro to reveal) */}
        <div id="footer-outro-spacer" className="h-0 md:h-[45vh] relative" style={{ zIndex: 1 }} aria-hidden="true" />

        <script dangerouslySetInnerHTML={{ __html: 'window.chtlConfig = { chatbotId: "7877335611" }' }} />
        <Script async data-id="7877335611" id="chtl-script" src="https://chatling.ai/js/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}

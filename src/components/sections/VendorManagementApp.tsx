import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const light = Inter({ weight: ['300'], subsets: ['latin'], display: 'swap' })

const PRE_BOOK_HREF = '/pre-book'

export default function VendorManagementApp() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1280px] px-4 md:px-12">
        <h2
          className={`${light.className} mx-auto mb-8 md:mb-10 whitespace-normal md:whitespace-nowrap text-center leading-tight text-[#0f1b2d] text-[20px] sm:text-[24px] md:[font-size:clamp(0.85rem,2.5vw,2.75rem)]`}
        >
          Supplier decisions don&apos;t wait for your desk. Soon, neither will you.
        </h2>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          {/* Device mockup + QR */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row md:justify-start">
            <div className="relative h-[180px] w-[210px] shrink-0 sm:h-[220px] sm:w-[260px] md:h-[260px] md:w-[300px]">
              <Image
                src="/assets/home/ventormanagement.png"
                alt="Vendor Management app shown on phone, tablet, and mobile"
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 210px, 300px"
              />
            </div>

            <Link href={PRE_BOOK_HREF} className="flex flex-col items-center gap-2 shrink-0">
              <div className="relative h-[90px] w-[90px] sm:h-[110px] sm:w-[110px]">
                <Image
                  src="/assets/home/Emithran-canva.png"
                  alt="Scan to pre-book the Emithran Vendor Management app"
                  fill
                  className="object-contain"
                  sizes="110px"
                />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0f1b2d]">
                Scan to Pre-book
              </span>
            </Link>
          </div>

          {/* Copy + badges */}
          <div className="text-center md:text-left">
            <p className={`${light.className} mb-8 text-[22px] leading-snug text-[#0f1b2d] sm:text-[26px] md:text-[32px]`}>
              Pre-book the Vendor Management app
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link href={PRE_BOOK_HREF} aria-label="Pre-book on the App Store" className="relative h-11 w-[135px] shrink-0">
                <Image src="/assets/home/apple.png" alt="Download on the App Store" fill className="object-contain" sizes="135px" />
              </Link>
              <Link href={PRE_BOOK_HREF} aria-label="Pre-book on Google Play" className="relative h-11 w-[150px] shrink-0">
                <Image src="/assets/home/playstore.png" alt="Get it on Google Play" fill className="object-contain" sizes="150px" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

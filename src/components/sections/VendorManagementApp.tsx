import Image from 'next/image'
import Link from 'next/link'

export default function VendorManagementApp() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <h2 className="mx-auto mb-12 md:mb-16 max-w-2xl text-center text-2xl font-bold tracking-tight text-[#0f1b2d] md:text-3xl">
          Supplier decisions don&apos;t wait for your desk. Soon, neither will you.
        </h2>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative mx-auto aspect-[1287/1222] w-full max-w-[520px] md:mx-0">
            <Image
              src="/assets/home/ventormanagement.png"
              alt="Vendor Management app shown on phone, tablet, and mobile"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Coming soon</p>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#0f1b2d] md:text-3xl">
              Pre-book the Vendor Management app
            </h3>
            <p className="mb-8 max-w-md text-[15px] leading-relaxed text-black/60">
              Supplier discovery, evaluation, RFQs, and nomination - the same supplier intelligence your team
              uses on desktop, built for the field. Reserve early access before it launches.
            </p>
            <Link
              href="/request-demo?source=vendor-management-app&cta=pre-book"
              className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.13 180), oklch(0.55 0.16 185))' }}
            >
              Pre-Book Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

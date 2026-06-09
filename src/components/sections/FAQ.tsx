import { AnimatedArrow } from '@/components/ui/animated-arrow'

export default function FAQ() {
  return (
    <section className="bg-white border-t border-black/[0.06] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          {/* Left: label + heading + subtitle */}
          <div className="max-w-xl">
            <p className="chip-light mb-4 w-fit">Frequently Asked Questions</p>
            <h2 className="text-2xl font-bold tracking-tight text-[#0d1117] md:text-3xl lg:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#64748b]">
              Everything you need to know about Emithran and how it works
              across your manufacturing organisation.
            </p>
          </div>

          {/* Right: CTA */}
          <a
            href="/faq"
            className="inline-flex items-center gap-2 rounded-md border border-black/15 px-5 py-2.5 text-sm font-semibold text-[#0d1117] transition-colors hover:bg-black/[0.04] shrink-0 w-fit whitespace-nowrap group"
          >
            Explore FAQs
            <AnimatedArrow />
          </a>

        </div>

      </div>
    </section>
  )
}

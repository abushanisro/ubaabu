import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import DashboardMockup from '@/components/ui/DashboardMockup'

export default function PlatformPromise() {
  return (
    <section className="border-t border-border py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection delay={0}>
            <div className="relative">
              <span
                aria-hidden
                className="font-display text-[160px] leading-none text-white opacity-[0.03] absolute -top-10 -left-2 pointer-events-none select-none"
              >
                01
              </span>
              <div className="relative">
                <SectionLabel>THE PLATFORM</SectionLabel>
                <h2 className="font-display text-white leading-tight text-[36px] lg:text-[52px] mb-8">
                  From CAD, BOM, and Drawings to Manufacturing Intelligence
                </h2>
                <div className="flex flex-col gap-4 max-w-xl">
                  <p className="font-mono text-[14px] text-grey-200 leading-relaxed">
                    Emithran helps engineering, costing, procurement, manufacturing, quality, and leadership teams make better decisions across the complete manufacturing lifecycle.
                  </p>
                  <p className="font-mono text-[14px] text-grey-200 leading-relaxed">
                    Upload or manage engineering data, structure BOMs, process CAD files, build should-cost models, evaluate suppliers, plan production, track quality, and manage delivery. Emithran brings every critical manufacturing decision into one connected operating platform.
                  </p>
                  <p className="font-mono text-[14px] text-grey-200 leading-relaxed">
                    Stop waiting on spreadsheets, emails, supplier quote loops, and disconnected ERP exports. Emithran gives teams the visibility and control needed to move faster from design release to manufacturing execution.
                  </p>
                </div>
                <a href="#" className="inline-block mt-8 font-mono text-[12px] tracking-widest text-white underline hover:text-grey-200 transition-colors uppercase">
                  Learn More →
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <DashboardMockup />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

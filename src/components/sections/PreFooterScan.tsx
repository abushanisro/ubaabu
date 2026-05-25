import SectionLabel from '@/components/ui/SectionLabel'

export default function PreFooterScan() {
  return (
    <section className="border-t border-border py-20 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <SectionLabel>READY TO START</SectionLabel>
        <h2 className="font-display text-white text-[36px] lg:text-[52px] leading-none mb-6">
          From Design to Delivery. In One Platform.
        </h2>
        <p className="font-mono text-[13px] text-grey-200 max-w-xl mx-auto leading-relaxed mb-10">
          Join the manufacturers building India's defence future with Emithran.
        </p>
        <button className="font-mono text-[12px] tracking-[0.2em] uppercase border border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-200">
          Request a Demo
        </button>
      </div>
    </section>
  )
}
export default function TopBanner() {
  return (
    <div className="bg-[#080808] border-b border-border pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <p className="font-mono text-[11px] tracking-widest text-grey-200 uppercase">
          Launch Faster with End-to-End Manufacturing Intelligence — Move from engineering data to costing, sourcing, production, quality, and delivery in one connected platform.
        </p>
        <a href="#demo" className="font-mono text-[11px] tracking-widest text-white hover:text-grey-200 transition-colors uppercase whitespace-nowrap">
          Request Demo →
        </a>
      </div>
    </div>
  )
}

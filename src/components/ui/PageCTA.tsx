export default function PageCTA({ title = 'See Emithran in action.', subtitle = 'Book a programme-specific walkthrough. We sign NDAs before every demo.' }) {
  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <h3 className="font-display text-white text-[36px] lg:text-[52px] leading-[0.95] mb-4">{title}</h3>
          <p className="font-mono text-[13px] text-grey-200 leading-relaxed">{subtitle}</p>
        </div>
        <a href="/request-demo" className="font-mono text-[12px] tracking-[0.2em] uppercase border border-white bg-white text-black px-8 py-4 hover:bg-transparent hover:text-white transition-all duration-200 whitespace-nowrap">
          Request Demo
        </a>
      </div>
    </section>
  )
}

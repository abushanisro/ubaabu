import SectionLabel from '@/components/ui/SectionLabel'

export default function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 border-b border-border overflow-hidden">
      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="font-display text-white text-[44px] sm:text-[60px] lg:text-[80px] leading-[0.95] tracking-tight max-w-5xl mb-8">
          {title}
        </h1>
        {subtitle && (
          <p className="font-mono text-[14px] lg:text-[15px] text-grey-200 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

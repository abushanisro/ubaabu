export default function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-mono tracking-[0.25em] uppercase text-grey-200 mb-4 ${className}`}>
      {children}
    </p>
  )
}

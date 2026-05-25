const cols = [
  {
    t: 'Platform',
    l: ['CAD to Cost', 'Should Cost Analysis', 'Supplier Intelligence', 'Production Tracking', 'Quality & PPAP', 'Analytics'],
  },
  {
    t: 'Industries',
    l: ['Space', 'Defence', 'Aerospace', 'Precision Manufacturing'],
  },
  {
    t: 'Company',
    l: ['About', 'Careers', 'Contact', 'Privacy Policy'],
  },
  {
    t: 'Resources',
    l: ['Documentation', 'Case Studies', 'Data Sovereignty', 'Compliance'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-16 relative">
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08]" style={{ left: 64 }} />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 z-40 w-px bg-white/[0.08]" style={{ right: 64 }} />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 font-display text-base font-semibold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-[#080808] text-xs font-bold">
                E
              </span>
              EMITHRAN
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              End-to-end manufacturing intelligence for India's space, defence, and aerospace industry.
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-white/30">
              Bangalore, India
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.t}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{c.t}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="hover:text-white transition-colors">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Emithran Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:contact@emithran.in" className="hover:text-white transition-colors">contact@emithran.in</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

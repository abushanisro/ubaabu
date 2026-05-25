const cols = [
  { t: "Capabilities", l: ["Design & DFM", "Sourcing", "Production", "Quality", "Logistics", "Aftermarket"] },
  { t: "Industries", l: ["Automotive", "Medical", "Industrial IoT", "Consumer"] },
  { t: "Company", l: ["About", "Customers", "Newsroom", "Careers", "Contact"] },
  { t: "Resources", l: ["Documentation", "Case studies", "Sustainability", "Trust & compliance"] },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="inline-block h-6 w-6 rounded-md bg-[var(--ink)]" />
              EMITHRAN
            </div>
            <p className="mt-4 text-sm text-[var(--ink-soft)]">
              End-to-end manufacturing infrastructure for modern hardware companies.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <p className="text-sm font-semibold">{c.t}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
                {c.l.map((x) => (
                  <li key={x}><a className="hover:text-[var(--ink)]" href="#">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-black/10 pt-6 text-xs text-[var(--ink-soft)] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Emithran Manufacturing. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

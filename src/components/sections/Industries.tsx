const industries = [
  {
    name: 'Space',
    desc: 'Satellite structures, propulsion components, and launch vehicle assemblies with full BOM traceability and should-cost baselines.',
    img: 'from-indigo-200 to-violet-200',
  },
  {
    name: 'Defence',
    desc: 'Missile systems, armoured vehicle parts, and EW equipment — with India-first data sovereignty and ITAR-compliant workflows.',
    img: 'from-slate-200 to-zinc-300',
  },
  {
    name: 'Aerospace',
    desc: 'Aircraft structural components, avionics housings, and MRO tracking for commercial and military fleets across India.',
    img: 'from-sky-200 to-cyan-200',
  },
  {
    name: 'Precision Manufacturing',
    desc: 'High-tolerance machined parts, medical devices, and semiconductor equipment at production scale with full quality traceability.',
    img: 'from-amber-200 to-rose-200',
  },
]

export default function Industries() {
  return (
    <section id="industries" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="chip-light mb-4">Industries</p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#062535] md:text-5xl">
          Built for India's most critical manufacturing sectors.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {industries.map((ind) => (
            <article
              key={ind.name}
              className="overflow-hidden rounded-2xl border border-black/6 bg-[#f8fafb] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`h-52 bg-gradient-to-br ${ind.img}`} />
              <div className="flex items-end justify-between p-7">
                <div>
                  <h3 className="text-xl font-semibold text-[#062535]">{ind.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#062535]/55">{ind.desc}</p>
                </div>
                <a
                  href="#"
                  className="ml-6 shrink-0 text-sm font-medium text-[#080808]/60 hover:underline"
                >
                  Learn more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

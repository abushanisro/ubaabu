const logos = [
  { src: '/assets/trustedby/Aadya.png',        alt: 'Aadya' },
  { src: '/assets/trustedby/ashokleyland.png',  alt: 'Ashok Leyland' },
  { src: '/assets/trustedby/digantara.png',     alt: 'Digantara' },
  { src: '/assets/trustedby/emuski.png',        alt: 'Emuski' },
  { src: '/assets/trustedby/ForusHealth.png',   alt: 'Forus Health' },
  { src: '/assets/trustedby/Pixxel.png',        alt: 'Pixxel' },
  { src: '/assets/trustedby/rainmaker.png',     alt: 'Rainmaker' },
  { src: '/assets/trustedby/RolandBerger.png',  alt: 'Roland Berger' },
  { src: '/assets/trustedby/Tanbo.png',         alt: 'Tanbo' },
  { src: '/assets/trustedby/TATAPower.png',     alt: 'TATA Power' },
]

export default function LogoMarquee() {
  const row = [...logos, ...logos, ...logos, ...logos]
  return (
    <section className="border-y border-black/[0.06] bg-white py-6">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-25%) } }
        .marquee-logos { animation: marquee 32s linear infinite; will-change: transform; }
        .logo-img { opacity: 0.85; }
      `}</style>
      <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 64px, black 64px, black calc(100% - 64px), transparent calc(100% - 64px))', WebkitMaskImage: 'linear-gradient(to right, transparent 64px, black 64px, black calc(100% - 64px), transparent calc(100% - 64px))' }}>
        <div className="marquee-logos flex w-max items-center gap-12">
          {row.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="logo-img h-7 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

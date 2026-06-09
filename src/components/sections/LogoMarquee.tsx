const logos = [
  { src: '/assets/trustedby/Aadya.svg',        alt: 'Aadya' },
  { src: '/assets/trustedby/ashokleyland.svg',  alt: 'Ashok Leyland' },
  { src: '/assets/trustedby/digantara.svg',     alt: 'Digantara' },
  { src: '/assets/trustedby/ForusHealth.svg',   alt: 'Forus Health' },
  { src: '/assets/trustedby/Pixxel.svg',        alt: 'Pixxel' },
  { src: '/assets/trustedby/rainmaker.svg',     alt: 'Rainmaker' },
  { src: '/assets/trustedby/RolandBerger.svg',  alt: 'Roland Berger' },
  { src: '/assets/trustedby/Tanbo.svg',         alt: 'Tanbo' },
  { src: '/assets/trustedby/TATAPower.svg',     alt: 'TATA Power' },
]

export default function LogoMarquee() {
  const row = [...logos, ...logos]
  return (
    <section className="relative z-0 border-y border-black/[0.06] bg-white -mt-16 pt-20 pb-6">
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-logos { animation: marquee 28s linear infinite; will-change: transform; }
      `}</style>
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent clamp(24px,5vw,64px), black clamp(24px,5vw,64px), black calc(100% - clamp(24px,5vw,64px)), transparent calc(100% - clamp(24px,5vw,64px)))',
          WebkitMaskImage: 'linear-gradient(to right, transparent clamp(24px,5vw,64px), black clamp(24px,5vw,64px), black calc(100% - clamp(24px,5vw,64px)), transparent calc(100% - clamp(24px,5vw,64px)))',
        }}
      >
        <div className="marquee-logos flex w-max items-center gap-3">
          {row.map((logo, i) => (
            <div
              key={i}
              className="flex items-center rounded-xl border shrink-0"
              style={{
                padding: '7px 10px',
                gap: 9,
                background: 'linear-gradient(135deg,rgba(248,250,252,0.92) 0%,rgba(241,245,249,0.95) 55%,rgba(244,248,252,0.90) 100%)',
                borderColor: 'rgba(0,0,0,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{
                  width: 34, height: 34,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: 20, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <span className="font-semibold whitespace-nowrap leading-tight" style={{ fontSize: 12, color: 'rgba(15,23,42,0.85)' }}>
                {logo.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

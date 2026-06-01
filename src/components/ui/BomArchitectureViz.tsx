'use client'

// Chip sits at x=235–265, y=28–48, centre=(250,38) in a 500×80 viewBox
const PATHS = [
  // far-left  → chip top-left
  { d: 'M 5 20 h 220 q 5 0 5 5 v 8',                                                   color: '#2dd4bf', dur: '5s', delay: '0s'   },
  // far-right → chip top-right
  { d: 'M 495 12 h -240 q -5 0 -5 5 v 16',                                              color: '#0d9e8a', dur: '3s', delay: '2s'   },
  // upper-right arc → chip right side
  { d: 'M 370 4 v 24 q 0 5 -5 5 h -120',                                                color: '#2dd4bf', dur: '4s', delay: '1s'   },
  // bottom-right long → chip right
  { d: 'M 465 72 v -21 q 0 -5 -5 -5 h -190',                                            color: '#f59e0b', dur: '6s', delay: '3s'   },
  // loop below chip
  { d: 'M 285 50 h 80 q 5 0 5 5 v 7 q 0 5 -5 5 h -112 q -5 0 -5 -5 v -17',            color: '#0d9e8a', dur: '4s', delay: '5s'   },
  // straight up from bottom centre → chip bottom
  { d: 'M 250 78 v -30',                                                                  color: '#2dd4bf', dur: '3s', delay: '1.5s' },
  // bottom-left snake → chip left side
  { d: 'M 232 70 v -12 q 0 -5 -5 -5 h -48 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 66',       color: '#f59e0b', dur: '5s', delay: '4s'   },
  // far-left horizontal connector
  { d: 'M 18 32 h 197 q 5 0 5 5 v 5 q 0 5 5 5 h 20',                                   color: '#0d9e8a', dur: '4s', delay: '3.5s' },
]

export default function BomArchitectureViz() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 500 80"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ background: 'transparent', display: 'block' }}
      >
        <defs>
          <radialGradient id="bom-teal-grad" fx="1">
            <stop offset="0%"   stopColor="#2dd4bf" />
            <stop offset="55%"  stopColor="#0d9e8a" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="bom-amber-grad" fx="1">
            <stop offset="0%"   stopColor="#fde68a" />
            <stop offset="55%"  stopColor="#f59e0b" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="bom-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bom-chip-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="bom-conn-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#4a4a4a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="bom-text-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#555">
              <animate attributeName="offset" values="-2;-1;0" dur="5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
            </stop>
            <stop offset="25%"  stopColor="white">
              <animate attributeName="offset" values="-1;0;1" dur="5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
            </stop>
            <stop offset="50%"  stopColor="#555">
              <animate attributeName="offset" values="0;1;2" dur="5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
            </stop>
          </linearGradient>

          {/* Masks — clip each glow to its own path */}
          {PATHS.map((p, i) => (
            <mask key={i} id={`bom-mask-${i}`}>
              <path d={p.d} stroke="white" strokeWidth="0.7" fill="none" />
            </mask>
          ))}
        </defs>

        {/* ── Static trace lines ── */}
        <g fill="none" strokeWidth="0.4">
          {PATHS.map((p, i) => (
            <path key={i} d={p.d} stroke={p.color} strokeOpacity="0.18"
              strokeDasharray="200 200" pathLength="200">
              <animate attributeName="stroke-dashoffset" from="200" to="0"
                dur="1.2s" fill="freeze" calcMode="spline"
                keyTimes="0;1" keySplines="0.25,0.1,0.5,1" />
            </path>
          ))}
        </g>

        {/* ── Animated glow circles ── */}
        {PATHS.map((p, i) => (
          <g key={i} mask={`url(#bom-mask-${i})`} filter="url(#bom-glow)">
            <circle r="7" fill={`url(#${p.color === '#f59e0b' ? 'bom-amber-grad' : 'bom-teal-grad'})`}>
              <animateMotion dur={p.dur} begin={p.delay} repeatCount="indefinite"
                calcMode="spline" keyTimes="0;1" keySplines="0.25,0.1,0.5,1"
                path={p.d} />
            </circle>
          </g>
        ))}

        {/* ── Chip connection pins ── */}
        <g fill="url(#bom-conn-grad)">
          {/* top */}
          <rect x="242" y="23" width="3" height="6" rx="0.8" />
          <rect x="253" y="23" width="3" height="6" rx="0.8" />
          {/* bottom */}
          <rect x="242" y="49" width="3" height="6" rx="0.8" />
          <rect x="253" y="49" width="3" height="6" rx="0.8" />
          {/* right */}
          <rect x="264" y="33" width="6" height="3" rx="0.8" />
          <rect x="264" y="42" width="6" height="3" rx="0.8" />
          {/* left */}
          <rect x="230" y="33" width="6" height="3" rx="0.8" />
          <rect x="230" y="42" width="6" height="3" rx="0.8" />
        </g>

        {/* ── BOM chip ── */}
        <rect x="235" y="28" width="30" height="20" rx="2.5"
          fill="#111" stroke="rgba(45,212,191,0.3)" strokeWidth="0.5"
          filter="url(#bom-chip-glow)" />
        <text x="250" y="41.5" fontSize="6.5" fill="url(#bom-text-grad)"
          fontWeight="700" letterSpacing="0.08em" textAnchor="middle">
          BOM
        </text>

        {/* ── Floating stat labels ── */}
        {/* 99.4% — left side */}
        <g>
          <rect x="14" y="5" width="28" height="14" rx="2.5"
            fill="rgba(13,158,138,0.12)" stroke="rgba(45,212,191,0.22)" strokeWidth="0.4" />
          <text x="28" y="14.5" fontSize="5.5" fill="#2dd4bf" fontWeight="700" textAnchor="middle">99.4%</text>
        </g>
        {/* 14.5K nodes — upper right */}
        <g>
          <rect x="440" y="2" width="30" height="14" rx="2.5"
            fill="rgba(13,158,138,0.12)" stroke="rgba(45,212,191,0.22)" strokeWidth="0.4" />
          <text x="455" y="11.5" fontSize="5" fill="#2dd4bf" fontWeight="700" textAnchor="middle">14.5K</text>
          <text x="455" y="14.5" fontSize="3.5" fill="rgba(255,255,255,0.35)" textAnchor="middle">BOM Nodes</text>
        </g>
        {/* 47 programmes — bottom right */}
        <g>
          <rect x="430" y="62" width="34" height="14" rx="2.5"
            fill="rgba(13,158,138,0.12)" stroke="rgba(45,212,191,0.22)" strokeWidth="0.4" />
          <text x="447" y="71" fontSize="5" fill="#f59e0b" fontWeight="700" textAnchor="middle">47 Progs</text>
          <text x="447" y="74" fontSize="3.5" fill="rgba(255,255,255,0.35)" textAnchor="middle">Active</text>
        </g>
      </svg>
    </div>
  )
}

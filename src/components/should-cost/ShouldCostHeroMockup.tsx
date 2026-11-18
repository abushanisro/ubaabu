/**
 * Static product illustration for the should-cost landing page hero.
 * Decorative only (aria-hidden): the numbers are an internally consistent
 * illustrative model, not customer data. Element totals and gaps add up.
 */

const TEAL = '#0d8a7c'
const INK = '#0f1b2d'

const rows = [
  { label: 'Raw material', should: 142.8, quote: 151.0 },
  { label: 'Process cost', should: 96.4, quote: 128.6 },
  { label: 'Tooling', should: 18.2, quote: 18.2 },
  { label: 'Rejection allowance', should: 7.1, quote: 9.5 },
  { label: 'Overheads', should: 31.5, quote: 33.7 },
  { label: 'SG&A and profit', should: 38.0, quote: 48.0 },
]

const shouldTotal = rows.reduce((s, r) => s + r.should, 0) // 334.00
const quoteTotal = rows.reduce((s, r) => s + r.quote, 0) // 389.00

const fmt = (n: number) => n.toFixed(2)

function Waterfall() {
  // Chart area
  const W = 360
  const H = 150
  const left = 34
  const bottom = 128
  const top = 10
  const max = 400
  const y = (v: number) => bottom - (v / max) * (bottom - top)
  // Precompute each bar's start/end so render stays pure
  const bars = rows.map((r, i) => {
    const start = rows.slice(0, i).reduce((s, x) => s + x.should, 0)
    return { label: r.label, start, end: start + r.should }
  })
  const colW = (W - left - 8) / (bars.length + 2)
  const ticks = [0, 100, 200, 300, 400]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} x2={W - 4} y1={y(t)} y2={y(t)} stroke="#e6ebee" strokeWidth="1" />
          <text x={left - 6} y={y(t) + 3} textAnchor="end" fontSize="8" fill="#8a96a3" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {t}
          </text>
        </g>
      ))}
      {bars.map((b, i) => {
        const y0 = y(b.start)
        const y1 = y(b.end)
        const x = left + i * colW + colW * 0.18
        const w = colW * 0.64
        return (
          <g key={b.label}>
            <rect x={x} y={y1} width={w} height={Math.max(y0 - y1, 1.5)} fill={TEAL} opacity={0.85} rx="1" />
            {i < bars.length - 1 && (
              <line x1={x + w} x2={x + colW} y1={y1} y2={y1} stroke="#9aa6b2" strokeWidth="0.75" strokeDasharray="2 2" />
            )}
            <text x={x + w / 2} y={bottom + 11} textAnchor="middle" fontSize="7.5" fill="#6b7785">
              {['Material', 'Process', 'Tooling', 'Reject', 'O/H', 'SG&A'][i]}
            </text>
          </g>
        )
      })}
      {/* Should-cost total */}
      {(() => {
        const i = bars.length
        const x = left + i * colW + colW * 0.18
        const w = colW * 0.64
        return (
          <g>
            <rect x={x} y={y(shouldTotal)} width={w} height={bottom - y(shouldTotal)} fill={INK} rx="1" />
            <text x={x + w / 2} y={y(shouldTotal) - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill={INK}>
              {shouldTotal.toFixed(0)}
            </text>
            <text x={x + w / 2} y={bottom + 11} textAnchor="middle" fontSize="7.5" fill="#6b7785">Should</text>
          </g>
        )
      })()}
      {/* Supplier quote */}
      {(() => {
        const i = bars.length + 1
        const x = left + i * colW + colW * 0.18
        const w = colW * 0.64
        return (
          <g>
            <rect x={x} y={y(quoteTotal)} width={w} height={bottom - y(quoteTotal)} fill="#fff" stroke={INK} strokeWidth="1" rx="1" />
            <rect x={x} y={y(quoteTotal)} width={w} height={y(shouldTotal) - y(quoteTotal)} fill="#f6d9cf" stroke={INK} strokeWidth="1" />
            <text x={x + w / 2} y={y(quoteTotal) - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill={INK}>
              {quoteTotal.toFixed(0)}
            </text>
            <text x={x + w / 2} y={bottom + 11} textAnchor="middle" fontSize="7.5" fill="#6b7785">Quote</text>
          </g>
        )
      })()}
      <line x1={left} x2={W - 4} y1={bottom} y2={bottom} stroke="#c3ccd4" strokeWidth="1" />
    </svg>
  )
}

function Drawing() {
  const line = '#25313f'
  const thin = '#6b7785'
  return (
    <svg viewBox="0 0 300 330" className="w-full h-auto" role="presentation">
      <defs>
        <marker id="sc-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L6 3L0 6Z" fill={thin} />
        </marker>
      </defs>

      {/* Front view */}
      <path d="M40 250V120A70 70 0 0 1 180 120V250Z" fill="#fbfcfc" stroke={line} strokeWidth="1.4" />
      <circle cx="110" cy="120" r="30" fill="none" stroke={thin} strokeWidth="0.8" strokeDasharray="4 3" />
      <circle cx="110" cy="120" r="22" fill="#fff" stroke={line} strokeWidth="1.3" />
      <rect x="78" y="170" width="64" height="16" rx="8" fill="#fff" stroke={line} strokeWidth="1.2" />
      <circle cx="62" cy="226" r="7" fill="#fff" stroke={line} strokeWidth="1.2" />
      <circle cx="158" cy="226" r="7" fill="#fff" stroke={line} strokeWidth="1.2" />

      {/* Centre lines */}
      <g stroke={thin} strokeWidth="0.6" strokeDasharray="10 2 2 2">
        <line x1="28" y1="120" x2="192" y2="120" />
        <line x1="110" y1="40" x2="110" y2="262" />
        <line x1="50" y1="226" x2="74" y2="226" />
        <line x1="62" y1="214" x2="62" y2="238" />
        <line x1="146" y1="226" x2="170" y2="226" />
        <line x1="158" y1="214" x2="158" y2="238" />
      </g>

      {/* Width dimension */}
      <g stroke={thin} strokeWidth="0.6" fill="none">
        <line x1="40" y1="254" x2="40" y2="288" />
        <line x1="180" y1="254" x2="180" y2="288" />
        <line x1="40" y1="282" x2="180" y2="282" markerStart="url(#sc-arrow)" markerEnd="url(#sc-arrow)" />
        {/* Height dimension */}
        <line x1="36" y1="50" x2="12" y2="50" />
        <line x1="36" y1="250" x2="12" y2="250" />
        <line x1="18" y1="50" x2="18" y2="250" markerStart="url(#sc-arrow)" markerEnd="url(#sc-arrow)" />
        {/* Bore leader */}
        <polyline points="122,101 136,30 180,30" />
      </g>
      <g fontSize="9" fill="#3b4755" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        <text x="110" y="278" textAnchor="middle">140</text>
        <text x="14" y="150" textAnchor="middle" transform="rotate(-90 14 150)">200</text>
        <text x="138" y="26">Ø44 THRU</text>
        <text x="110" y="202" textAnchor="middle" fontSize="8">SLOT 64×16</text>
        <text x="62" y="246" textAnchor="middle" fontSize="8">2× Ø14</text>
      </g>

      {/* Side view */}
      <path d="M222 50H234V238H280V250H222Z" fill="#fbfcfc" stroke={line} strokeWidth="1.4" />
      <g stroke={thin} strokeWidth="0.8" strokeDasharray="4 3">
        <line x1="222" y1="98" x2="234" y2="98" />
        <line x1="222" y1="142" x2="234" y2="142" />
      </g>
      <g stroke={thin} strokeWidth="0.6" fill="none">
        <line x1="222" y1="46" x2="222" y2="30" />
        <line x1="234" y1="46" x2="234" y2="30" />
        <line x1="210" y1="34" x2="222" y2="34" markerEnd="url(#sc-arrow)" />
        <line x1="246" y1="34" x2="234" y2="34" markerEnd="url(#sc-arrow)" />
      </g>
      <text x="252" y="37" fontSize="9" fill="#3b4755" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">12</text>

      {/* Title block */}
      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        <rect x="150" y="298" width="146" height="28" fill="#fff" stroke="#9aa6b2" strokeWidth="0.8" />
        <line x1="150" y1="312" x2="296" y2="312" stroke="#9aa6b2" strokeWidth="0.6" />
        <line x1="236" y1="298" x2="236" y2="326" stroke="#9aa6b2" strokeWidth="0.6" />
        <text x="155" y="308" fontSize="7" fill="#3b4755">BRK-2041 REV C</text>
        <text x="155" y="322" fontSize="7" fill="#3b4755">AL 6061-T6</text>
        <text x="241" y="308" fontSize="7" fill="#3b4755">SCALE 1:2</text>
        <text x="241" y="322" fontSize="7" fill="#3b4755">mm</text>
      </g>
    </svg>
  )
}

export default function ShouldCostHeroMockup() {
  const gap = quoteTotal - shouldTotal
  const gapPct = (gap / quoteTotal) * 100

  return (
    <div aria-hidden="true" className="select-none">
      <div
        className="rounded-xl bg-white overflow-hidden"
        style={{ border: '1px solid #d9e0e5', boxShadow: '0 1px 2px rgba(15,27,45,0.04), 0 24px 48px -24px rgba(15,27,45,0.18)' }}
      >
        {/* App bar */}
        <div className="flex items-center justify-between gap-4 px-4 h-11 text-[12px]" style={{ borderBottom: '1px solid #e6ebee', background: '#fafbfc' }}>
          <div className="flex items-center gap-1.5 min-w-0 truncate" style={{ color: '#6b7785' }}>
            <span>Should-cost</span>
            <span style={{ color: '#b6c0c9' }}>/</span>
            <span className="hidden sm:inline">Bracket family</span>
            <span className="hidden sm:inline" style={{ color: '#b6c0c9' }}>/</span>
            <span className="font-semibold" style={{ color: INK }}>BRK-2041</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ background: '#eef2f4', color: '#4a5664' }}>v3 · draft</span>
            <span className="hidden sm:inline px-2.5 py-1 rounded-md text-[11px] font-semibold text-white" style={{ background: TEAL }}>Export brief</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Drawing panel */}
          <div className="hidden sm:flex flex-col" style={{ borderRight: '1px solid #e6ebee' }}>
            <div className="flex items-center gap-4 px-4 h-9 text-[11.5px]" style={{ borderBottom: '1px solid #eef1f3' }}>
              <span className="font-semibold h-full flex items-center" style={{ color: INK, boxShadow: `inset 0 -2px 0 ${TEAL}` }}>Drawing</span>
              <span style={{ color: '#8a96a3' }}>3D</span>
              <span style={{ color: '#8a96a3' }}>Process route</span>
            </div>
            <div
              className="flex-1 p-4 flex items-center"
              style={{
                backgroundImage: 'linear-gradient(#f1f4f6 1px, transparent 1px), linear-gradient(90deg, #f1f4f6 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            >
              <Drawing />
            </div>
          </div>

          {/* Cost panel */}
          <div className="flex flex-col">
            <div className="px-4 pt-3.5 pb-3" style={{ borderBottom: '1px solid #eef1f3' }}>
              <p className="text-[13px] font-semibold" style={{ color: INK }}>Mounting bracket, machined</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#6b7785' }}>Al 6061-T6 · 2,500 / yr · India · USD per part</p>
            </div>

            <table className="w-full text-[11.5px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <thead>
                <tr style={{ color: '#8a96a3' }}>
                  <th className="text-left font-medium px-4 py-2">Element</th>
                  <th className="text-right font-medium px-2 py-2">Should</th>
                  <th className="text-right font-medium px-2 py-2">Quote</th>
                  <th className="text-right font-medium px-4 py-2">Gap</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const d = r.quote - r.should
                  return (
                    <tr key={r.label} style={{ borderTop: '1px solid #f0f3f5' }}>
                      <td className="px-4 py-[7px]" style={{ color: '#2b3746' }}>{r.label}</td>
                      <td className="px-2 py-[7px] text-right" style={{ color: INK }}>{fmt(r.should)}</td>
                      <td className="px-2 py-[7px] text-right" style={{ color: '#6b7785' }}>{fmt(r.quote)}</td>
                      <td className="px-4 py-[7px] text-right font-medium" style={{ color: d > 0 ? '#b4532a' : '#8a96a3' }}>
                        {d > 0 ? `+${fmt(d)}` : '—'}
                      </td>
                    </tr>
                  )
                })}
                <tr style={{ borderTop: '1px solid #d9e0e5', background: '#f7f9fa' }}>
                  <td className="px-4 py-2 font-semibold" style={{ color: INK }}>Total</td>
                  <td className="px-2 py-2 text-right font-semibold" style={{ color: INK }}>{fmt(shouldTotal)}</td>
                  <td className="px-2 py-2 text-right font-semibold" style={{ color: '#4a5664' }}>{fmt(quoteTotal)}</td>
                  <td className="px-4 py-2 text-right font-semibold" style={{ color: '#b4532a' }}>+{fmt(gap)}</td>
                </tr>
              </tbody>
            </table>

            <div className="px-4 pt-3 pb-2" style={{ borderTop: '1px solid #eef1f3' }}>
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-[11.5px] font-semibold" style={{ color: INK }}>Cost build-up vs quote</p>
                <p className="text-[11px]" style={{ color: '#b4532a', fontVariantNumeric: 'tabular-nums' }}>
                  Quote {gapPct.toFixed(1)}% above should-cost
                </p>
              </div>
              <Waterfall />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-right" style={{ color: 'rgba(15,27,45,0.4)' }}>Illustrative model, not customer data</p>
    </div>
  )
}

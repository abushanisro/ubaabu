'use client'

import { useId, useState } from 'react'

type ProfitMode = 'percent' | 'perUnit'

const usd = (n: number) =>
  (n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const usd0 = (n: number) => (n < 0 ? '−' : '') + '$' + Math.abs(Math.round(n)).toLocaleString('en-US')
const pct = (n: number) => (Number.isFinite(n) ? (n * 100).toFixed(1) + '%' : '–')

function Field({
  label,
  value,
  onChange,
  suffix,
  prefix,
  step = 'any',
  hideLabel = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  suffix?: string
  prefix?: string
  step?: string
  hideLabel?: boolean
}) {
  const id = useId()
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className={hideLabel ? 'sr-only' : 'text-[13px] font-semibold text-[#374151]'}>{label}</span>
      <span className="flex items-center rounded-md border border-[#d1d5db] bg-white focus-within:border-[#0d9488] focus-within:ring-1 focus-within:ring-[#0d9488]">
        {prefix && <span className="whitespace-nowrap pl-3 text-[14px] text-[#6b7280]">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent px-3 py-2 text-[15px] text-[#0d1117] outline-none"
        />
        {suffix && <span className="whitespace-nowrap pr-3 text-[13px] text-[#6b7280]">{suffix}</span>}
      </span>
    </label>
  )
}

/** Interactive target cost calculator. Defaults reproduce the cordless drill example in the article. */
export default function TargetCostCalculator() {
  const [price, setPrice] = useState('120')
  const [channel, setChannel] = useState('30')
  const [profitMode, setProfitMode] = useState<ProfitMode>('percent')
  const [profitPct, setProfitPct] = useState('15')
  const [profitUnit, setProfitUnit] = useState('12.60')
  const [sga, setSga] = useState('12')
  const [estimate, setEstimate] = useState('68')
  const [volume, setVolume] = useState('100000')

  const n = (s: string) => (Number.isFinite(parseFloat(s)) ? parseFloat(s) : 0)
  const netPrice = n(price) * (1 - n(channel) / 100)
  const profit = profitMode === 'percent' ? netPrice * (n(profitPct) / 100) : n(profitUnit)
  const sgaAmt = netPrice * (n(sga) / 100)
  const target = netPrice - profit - sgaAmt
  const gap = n(estimate) - target
  const gapPct = target > 0 ? gap / target : NaN
  const profitAtCurrent = netPrice - n(estimate) - sgaAmt
  const marginAtCurrent = netPrice > 0 ? profitAtCurrent / netPrice : NaN
  const shortfall = Math.max(gap, 0) * n(volume)
  const over = gap > 0.005

  const rows: [string, string, boolean?][] = [
    ['Net selling price', usd(netPrice)],
    ['Required profit per unit', usd(profit)],
    ['Warranty and SG&A per unit', usd(sgaAmt)],
    ['Target manufacturing cost', usd(target), true],
    ['Gap to current estimate', `${gap > 0 ? '+' : ''}${usd(gap)} (${gap > 0 ? '+' : ''}${pct(gapPct)})`],
    ['Profit margin at current cost', `${usd(profitAtCurrent)} per unit (${pct(marginAtCurrent)})`],
    ['Annual profit shortfall', over ? usd0(shortfall) : '$0 (on or under target)', true],
  ]

  return (
    <div className="not-prose my-8 rounded-xl border border-[rgba(13,148,136,0.25)] bg-[#f0fdf8] p-5 sm:p-6">
      <p className="m-0 text-[17px] font-bold text-[#0d1117]">Target cost calculator</p>
      <p className="mt-1 mb-5 text-[13px] text-[#6b7280]">
        Pre-filled with the cordless drill example. Change any input; results update instantly.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Customer price" prefix="$" value={price} onChange={setPrice} />
        <Field label="Channel margin" suffix="% of price" value={channel} onChange={setChannel} />

        <div className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold text-[#374151]">Required profit</span>
          <div className="flex gap-2">
            <div className="flex shrink-0 overflow-hidden rounded-md border border-[#d1d5db] text-[13px]" role="group" aria-label="Profit input type">
              {(['percent', 'perUnit'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setProfitMode(m)}
                  aria-pressed={profitMode === m}
                  className={`px-3 py-2 font-semibold ${profitMode === m ? 'bg-[#0d9488] text-white' : 'bg-white text-[#374151]'}`}
                >
                  {m === 'percent' ? '%' : '$/unit'}
                </button>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              {profitMode === 'percent' ? (
                <Field label="Required profit (% of net price)" hideLabel suffix="% of net" value={profitPct} onChange={setProfitPct} />
              ) : (
                <Field label="Required profit ($ per unit)" hideLabel prefix="$" value={profitUnit} onChange={setProfitUnit} />
              )}
            </div>
          </div>
        </div>

        <Field label="Warranty and SG&A" suffix="% of net" value={sga} onChange={setSga} />
        <Field label="Current cost estimate" prefix="$" value={estimate} onChange={setEstimate} />
        <Field label="Annual volume" suffix="units" step="1" value={volume} onChange={setVolume} />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-[rgba(13,148,136,0.2)] bg-white" aria-live="polite">
        {rows.map(([label, value, strong], i) => (
          <div
            key={label}
            className={`flex flex-wrap items-baseline justify-between gap-2 px-4 py-2.5 text-[14px] ${i % 2 ? 'bg-[#fafafa]' : ''} ${strong ? 'font-bold text-[#0d1117]' : 'text-[#374151]'}`}
          >
            <span>{label}</span>
            <span className={strong && label.startsWith('Target') ? 'text-[#0d9488]' : ''}>{value}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 mb-0 text-[12px] text-[#6b7280]">
        Percentages for profit and SG&amp;A apply to the net selling price, as in the article. Illustrative tool; check the definitions your company uses.
      </p>
    </div>
  )
}

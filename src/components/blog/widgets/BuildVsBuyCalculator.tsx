'use client'

import { useId, useState } from 'react'

const usd = (n: number) => (n < 0 ? '−' : '') + '$' + Math.round(Math.abs(n)).toLocaleString('en-US')

function Num({ label, value, onChange, prefix, suffix }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string }) {
  const id = useId()
  return (
    <label htmlFor={id} className="flex flex-col gap-1">
      <span className="text-[12.5px] font-semibold text-[#374151]">{label}</span>
      <span className="flex items-center rounded-md border border-[#d1d5db] bg-white focus-within:border-[#0d9488] focus-within:ring-1 focus-within:ring-[#0d9488]">
        {prefix && <span className="whitespace-nowrap pl-3 text-[14px] text-[#6b7280]">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent px-3 py-2 text-[15px] text-[#0d1117] outline-none"
        />
        {suffix && <span className="whitespace-nowrap pr-3 text-[13px] text-[#6b7280]">{suffix}</span>}
      </span>
    </label>
  )
}

/** Three-option TCO calculator. Defaults reproduce the 8-user, 3-year example in the article. */
export default function BuildVsBuyCalculator() {
  const [users, setUsers] = useState('8')
  const [years, setYears] = useState('3')
  const [ssSetup, setSsSetup] = useState('20000')
  const [ssUpkeep, setSsUpkeep] = useState('60000')
  const [ihBuild, setIhBuild] = useState('270000')
  const [ihUpkeep, setIhUpkeep] = useState('192000')
  const [csSetup, setCsSetup] = useState('30000')
  const [csSeat, setCsSeat] = useState('12000')
  const [csAdmin, setCsAdmin] = useState('24000')

  const n = (s: string) => (Number.isFinite(parseFloat(s)) ? Math.max(0, parseFloat(s)) : 0)
  const u = n(users)
  const y = Math.max(1, Math.round(n(years)))

  // In-house: the build takes most of year 1, so upkeep runs from year 2.
  const totals = [
    { name: 'Spreadsheets', total: n(ssSetup) + n(ssUpkeep) * y },
    { name: 'In-house tool', total: n(ihBuild) + n(ihUpkeep) * Math.max(0, y - 1) },
    { name: 'Commercial software', total: n(csSetup) + (n(csSeat) * u + n(csAdmin)) * y },
  ]
  const cheapest = Math.min(...totals.map(t => t.total))
  const perSeatYear = n(csSeat) * y
  const breakEven = perSeatYear > 0 ? (totals[1].total - n(csSetup) - n(csAdmin) * y) / perSeatYear : NaN

  return (
    <div className="not-prose my-8 rounded-xl border border-[rgba(13,148,136,0.25)] bg-[#f0fdf8] p-5 sm:p-6">
      <p className="m-0 text-[17px] font-bold text-[#0d1117]">Build vs buy TCO calculator</p>
      <p className="mt-1 mb-5 text-[13px] text-[#6b7280]">Pre-filled with the example above. Replace any figure with your own; totals update instantly.</p>

      <div className="grid grid-cols-2 gap-4">
        <Num label="Regular users" value={users} onChange={setUsers} />
        <Num label="Period" value={years} onChange={setYears} suffix="years" />
      </div>

      <p className="mt-5 mb-2 text-[12px] font-bold uppercase tracking-wide text-[#0d9488]">Spreadsheets</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Num label="Template build" prefix="$" value={ssSetup} onChange={setSsSetup} />
        <Num label="Upkeep" prefix="$" suffix="/ year" value={ssUpkeep} onChange={setSsUpkeep} />
      </div>

      <p className="mt-5 mb-2 text-[12px] font-bold uppercase tracking-wide text-[#0d9488]">In-house tool</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Num label="Build (year 1)" prefix="$" value={ihBuild} onChange={setIhBuild} />
        <Num label="Upkeep from year 2" prefix="$" suffix="/ year" value={ihUpkeep} onChange={setIhUpkeep} />
      </div>

      <p className="mt-5 mb-2 text-[12px] font-bold uppercase tracking-wide text-[#0d9488]">Commercial software</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Num label="Implementation" prefix="$" value={csSetup} onChange={setCsSetup} />
        <Num label="Subscription per user" prefix="$" suffix="/ yr" value={csSeat} onChange={setCsSeat} />
        <Num label="Internal admin" prefix="$" suffix="/ yr" value={csAdmin} onChange={setCsAdmin} />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-[rgba(13,148,136,0.2)] bg-white" aria-live="polite">
        <div className="grid grid-cols-3 gap-2 bg-[#fafafa] px-4 py-2 text-[12px] font-bold text-[#374151]">
          <span>Option</span>
          <span className="text-right">{y}-year total</span>
          <span className="text-right">Per user per year</span>
        </div>
        {totals.map(t => {
          const best = t.total === cheapest
          return (
            <div key={t.name} className={`grid grid-cols-3 gap-2 px-4 py-2.5 text-[14px] ${best ? 'font-bold text-[#0d9488]' : 'text-[#374151]'}`}>
              <span>{t.name}{best ? ' (lowest)' : ''}</span>
              <span className="text-right">{usd(t.total)}</span>
              <span className="text-right">{u > 0 ? usd(t.total / (u * y)) : '–'}</span>
            </div>
          )
        })}
      </div>

      <p className="mt-3 mb-0 text-[13px] text-[#374151]">
        {Number.isFinite(breakEven) && breakEven > 0
          ? <>On these inputs, commercial software costs more than the in-house tool above about <strong>{breakEven.toFixed(1)} users</strong>.</>
          : <>On these inputs, commercial software stays below the in-house tool at any user count.</>}
      </p>
      <p className="mt-2 mb-0 text-[12px] text-[#6b7280]">
        Cash cost only. It leaves out the value of better estimates, the cost of a failed or late build, and integration work, which applies to every option. In-house upkeep is held flat as users grow, which flatters building.
      </p>
    </div>
  )
}

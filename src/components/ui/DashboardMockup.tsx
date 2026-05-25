export default function DashboardMockup() {
  const rows = [
    { programme: 'TEJAS MK2', bom: '████████░░', cost: '\u20B92.4Cr', supplier: 'BEL', status: 'ON TRACK' },
    { programme: 'BRAHMOS-NG', bom: '██████░░░░', cost: '\u20B98.1Cr', supplier: 'DRDO', status: 'AT RISK' },
    { programme: 'HAL DHRUV', bom: '█████████░', cost: '\u20B91.7Cr', supplier: 'HAL', status: 'ON TRACK' },
    { programme: 'AKASH PRIME', bom: '████░░░░░░', cost: '\u20B95.3Cr', supplier: 'BDL', status: 'DELAYED' },
  ]

  return (
    <div className="border border-border bg-grey-600 font-mono text-xs">
      {/* Header bar */}
      <div className="border-b border-border px-4 py-2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-grey-400" />
        <div className="w-2 h-2 rounded-full bg-grey-400" />
        <div className="w-2 h-2 rounded-full bg-grey-400" />
        <span className="ml-2 text-grey-300 tracking-widest text-[10px]">EMITHRAN — PROGRAMME DASHBOARD</span>
      </div>
      {/* Table header */}
      <div className="grid grid-cols-5 px-4 py-2 border-b border-border text-grey-300 tracking-wider text-[10px]">
        <span>PROGRAMME</span>
        <span>BOM</span>
        <span>COST</span>
        <span>SUPPLIER</span>
        <span>STATUS</span>
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-5 px-4 py-3 border-b border-border last:border-0 hover:bg-grey-500 transition-colors">
          <span className="text-white text-[11px]">{row.programme}</span>
          <span className="text-grey-300 text-[11px]">{row.bom}</span>
          <span className="text-grey-200 text-[11px]">{row.cost}</span>
          <span className="text-grey-300 text-[11px]">{row.supplier}</span>
          <span className={`text-[10px] tracking-wider font-medium ${
            row.status === 'ON TRACK' ? 'text-white' :
            row.status === 'AT RISK' ? 'text-grey-100' : 'text-grey-200'
          }`}>{row.status}</span>
        </div>
      ))}
    </div>
  )
}

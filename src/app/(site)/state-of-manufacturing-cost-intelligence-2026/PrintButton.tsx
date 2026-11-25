'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
      style={{ background: '#0d9488' }}
    >
      Download as PDF
    </button>
  )
}

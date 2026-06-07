'use client'

export function SectionDivider() {
  return (
    <div className="relative w-full overflow-hidden pointer-events-none" style={{ height: 64 }}>
      {/* Back bar — deep teal */}
      <div
        className="absolute inset-x-0"
        style={{
          height: 28,
          top: 18,
          background: '#0d9488',
          transform: 'skewY(1.6deg)',
          transformOrigin: 'right center',
        }}
      />
      {/* Front bar — primary teal */}
      <div
        className="absolute inset-x-0"
        style={{
          height: 20,
          top: 8,
          background: '#2dd4bf',
          transform: 'skewY(1.6deg)',
          transformOrigin: 'right center',
        }}
      />
    </div>
  )
}

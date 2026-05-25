export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#080808]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#FFFFFF 1px, transparent 1px),
            linear-gradient(90deg, #FFFFFF 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Radial vignette — darker at edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #080808 100%)'
        }}
      />
    </div>
  )
}

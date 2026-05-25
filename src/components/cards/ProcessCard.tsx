export function ProcessCard() {
  return (
    <div className="h-56 relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
      <svg viewBox="0 0 300 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="pc-ribbon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.13 175)" />
            <stop offset="50%" stopColor="oklch(0.68 0.13 180)" />
            <stop offset="100%" stopColor="oklch(0.55 0.18 280)" />
          </linearGradient>
          <linearGradient id="pc-ribbon2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.13 175 / 0.6)" />
            <stop offset="100%" stopColor="oklch(0.55 0.12 185 / 0)" />
          </linearGradient>
        </defs>
        <path d="M-10 150 C 80 150, 100 60, 180 60 S 280 30, 320 20" stroke="url(#pc-ribbon)" strokeWidth="22" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M-10 150 C 80 150, 100 60, 180 60 S 280 30, 320 20 L320 200 L-10 200 Z" fill="url(#pc-ribbon2)" />
        {[[40, 148], [130, 95], [220, 55], [285, 28]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill="white" stroke="oklch(0.55 0.18 280)" strokeWidth="2" />
            <circle cx={x} cy={y} r="4" fill="oklch(0.55 0.18 280)" />
          </g>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <circle key={i} cx={20 + i * 14} cy={170 + Math.sin(i) * 8} r={1.5} fill="oklch(0.55 0.18 280)" opacity={0.5} />
        ))}
      </svg>
      <div className="absolute top-3 left-3 right-3 flex justify-between">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Cost trajectory</span>
        <span className="text-xs font-bold text-gradient">+18.4%</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-card/80 backdrop-blur border border-border/50 flex items-end justify-between">
        <div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Estimated</div>
          <div className="text-lg font-bold text-foreground tabular-nums">$128,450</div>
        </div>
        <div className="flex gap-0.5 items-end h-6">
          {[3, 5, 4, 7, 6, 9, 8, 11, 14, 12, 18, 22].map((h, i) => (
            <div key={i} className="w-1 rounded-sm gradient-primary" style={{ height: h }} />
          ))}
        </div>
      </div>
    </div>
  );
}

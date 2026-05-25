export function QualityCard() {
  const score = 98.6;
  const r = 60;
  const c = 2 * Math.PI * r;
  return (
    <div className="h-56 relative flex flex-col items-center justify-center">
      <div className="scene">
        <div className="preserve-3d relative" style={{ animation: "drift 5s ease-in-out infinite" }}>
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, oklch(0.95 0.05 180), oklch(0.68 0.13 180) 50%, oklch(0.45 0.18 280) 100%)",
                boxShadow: "0 0 60px oklch(0.68 0.13 180 / 0.5), inset -20px -30px 40px oklch(0.3 0.15 280 / 0.4), inset 15px 20px 30px oklch(1 0 0 / 0.3)",
              }}>
              <div className="absolute top-3 left-6 w-12 h-8 rounded-full bg-white/40 blur-md" />
            </div>
            <svg className="absolute -inset-3 w-[184px] h-[184px] -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={r} fill="none" stroke="oklch(0.9 0.02 200)" strokeWidth="3" />
              <circle cx="80" cy="80" r={r} fill="none" stroke="url(#qc-grad)" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={c} strokeDashoffset={c - (c * score) / 100}
                style={{ filter: "drop-shadow(0 0 6px oklch(0.68 0.13 180))" }} />
              <defs>
                <linearGradient id="qc-grad">
                  <stop offset="0%" stopColor="oklch(0.78 0.13 175)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.18 280)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="text-3xl font-bold drop-shadow-md">{score}%</div>
              <div className="text-[10px] opacity-90 uppercase tracking-wider">Quality</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 w-full text-center">
        {[["Pass", "1,227"], ["Defects", "18"], ["Compliance", "100%"]].map(([k, v]) => (
          <div key={k} className="py-1.5 rounded-md bg-muted/40">
            <div className="text-sm font-bold text-foreground tabular-nums">{v}</div>
            <div className="text-[9px] text-muted-foreground uppercase">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

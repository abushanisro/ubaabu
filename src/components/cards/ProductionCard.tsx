const steps = [
  { label: "ISIR", done: true, hue: 180 },
  { label: "PPAP", done: true, hue: 195 },
  { label: "Batch", done: true, hue: 210 },
  { label: "Mass", done: false, hue: 280 },
];

export function ProductionCard() {
  return (
    <div className="h-56 relative scene flex flex-col justify-center gap-3 py-2">
      {steps.map((s, i) => (
        <div key={s.label} className="preserve-3d flex items-center gap-3 relative"
          style={{ transform: `rotateY(-12deg) translateX(${i % 2 === 0 ? 0 : 8}px)`, animation: `slideIn 0.6s ${i * 100}ms both` }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold relative"
            style={{
              background: s.done ? `linear-gradient(135deg, oklch(0.85 0.14 ${s.hue}), oklch(0.55 0.16 ${s.hue}))` : "oklch(0.93 0.01 200)",
              color: s.done ? "white" : "oklch(0.55 0.04 220)",
              boxShadow: s.done ? `0 6px 14px -4px oklch(0.55 0.16 ${s.hue} / 0.6)` : "none",
            }}>
            {i + 1}
          </div>
          <div className="flex-1 relative h-10 rounded-xl overflow-hidden"
            style={{
              background: s.done
                ? `linear-gradient(90deg, oklch(0.94 0.06 ${s.hue}), oklch(0.84 0.12 ${s.hue} / 0.7))`
                : "oklch(0.96 0.005 200)",
              boxShadow: s.done ? `inset 0 -2px 6px oklch(0.55 0.16 ${s.hue} / 0.2), 0 4px 10px -3px oklch(0.55 0.12 ${s.hue} / 0.3)` : "inset 0 0 0 1px var(--border)",
            }}>
            <div className="absolute inset-0 flex items-center justify-between px-3">
              <span className={`text-xs font-semibold ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label} Production</span>
              <span className={`text-[10px] font-mono ${s.done ? "text-foreground/70" : "text-muted-foreground"}`}>
                {s.done ? "✓ Complete" : "○ Planning"}
              </span>
            </div>
            {s.done && (
              <div className="absolute inset-0 opacity-40"
                style={{ background: "linear-gradient(90deg, transparent, white, transparent)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

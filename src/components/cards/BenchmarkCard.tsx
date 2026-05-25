const projects = [
  { name: "A", value: 120450, h: 88, hue: 200 },
  { name: "B", value: 98320, h: 70, hue: 180 },
  { name: "C", value: 110780, h: 80, hue: 280 },
];

export function BenchmarkCard() {
  return (
    <div className="h-56 relative">
      <div className="scene h-36 flex items-end justify-center gap-6">
        {projects.map((p, i) => (
          <div key={p.name} className="preserve-3d relative" style={{ transform: "rotateX(30deg) rotateY(-20deg)", animation: `drift 4s ${i * 0.3}s ease-in-out infinite` }}>
            <div className="w-12 relative" style={{ height: p.h, animation: `growUp 0.9s ${i * 100}ms both` }}>
              <div className="absolute inset-0 rounded-t-md"
                style={{ background: `linear-gradient(180deg, oklch(0.85 0.14 ${p.hue}), oklch(0.55 0.16 ${p.hue}))`, boxShadow: `0 10px 30px -8px oklch(0.55 0.16 ${p.hue} / 0.6)` }} />
              <div className="absolute -top-2 left-0 right-0 h-3 rounded"
                style={{ background: `oklch(0.92 0.1 ${p.hue})`, transform: "skewX(-30deg) translateX(3px)" }} />
              <div className="absolute top-0 -right-2 w-3 h-full rounded"
                style={{ background: `oklch(0.45 0.16 ${p.hue})`, transform: "skewY(-30deg) translateY(3px)" }} />
            </div>
            <div className="text-center mt-3 text-[10px] font-mono tabular-nums">${(p.value / 1000).toFixed(1)}k</div>
            <div className="text-center text-[9px] text-muted-foreground">Project {p.name}</div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1.5">Top cost drivers</div>
        {[["Microcontroller", 28], ["Connector", 18], ["Packaging", 12]].map(([l, pct], i) => (
          <div key={l as string} className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-foreground flex-1">{l}</span>
            <div className="w-20 h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full gradient-primary" style={{ width: `${(pct as number) * 3}%`, animation: `grow 1s ${i * 100}ms both` }} />
            </div>
            <span className="text-[10px] font-semibold tabular-nums w-7 text-right">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

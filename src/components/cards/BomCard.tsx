export function BomCard() {
  return (
    <div className="scene h-56 relative flex items-center justify-center">
      <div className="preserve-3d relative w-full h-full" style={{ transform: "rotateX(55deg) rotateZ(-25deg)", animation: "drift 6s ease-in-out infinite" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-44 h-28 rounded-xl border border-primary/30"
            style={{
              transform: `translate(-50%, -50%) translateZ(${i * 14}px)`,
              background: `linear-gradient(135deg, oklch(0.92 0.06 180 / ${0.4 + i * 0.15}), oklch(0.78 0.13 175 / ${0.3 + i * 0.2}))`,
              boxShadow: "0 6px 14px -4px oklch(0.5 0.12 185 / 0.35)",
            }}
          >
            <div className="absolute inset-2 rounded-md border border-white/40 grid grid-cols-6 gap-1 p-1.5">
              {Array.from({ length: 12 }).map((_, j) => (
                <div key={j} className="rounded-sm bg-white/50" style={{ height: 4 }} />
              ))}
            </div>
          </div>
        ))}
        {[
          { x: -90, y: -50, z: 70, c: "oklch(0.7 0.18 25)" },
          { x: 70, y: -60, z: 90, c: "oklch(0.78 0.15 80)" },
          { x: -60, y: 60, z: 110, c: "oklch(0.65 0.2 280)" },
          { x: 80, y: 50, z: 60, c: "oklch(0.72 0.14 200)" },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-8 h-8 rounded-lg"
            style={{
              transform: `translate(-50%,-50%) translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateZ(${i * 25}deg)`,
              background: `linear-gradient(135deg, ${p.c}, oklch(1 0 0 / 0.3))`,
              boxShadow: `0 8px 16px -4px ${p.c}`,
              animation: `drift ${3 + i}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-muted-foreground font-mono">
        <span>204 parts</span><span>12 assemblies</span>
      </div>
    </div>
  );
}

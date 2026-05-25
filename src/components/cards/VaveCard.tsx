export function VaveCard() {
  return (
    <div className="h-56 relative overflow-hidden rounded-xl"
      style={{ background: "radial-gradient(circle at center, oklch(0.95 0.05 280) 0%, transparent 70%)" }}>
      <div className="absolute inset-0 scene flex items-center justify-center">
        <div className="preserve-3d relative w-44 h-44">
          {[
            { tilt: 70, rot: 0, dur: 12 },
            { tilt: 60, rot: 60, dur: 18 },
            { tilt: 75, rot: 120, dur: 24 },
          ].map((o, i) => (
            <div key={i} className="absolute inset-0 rounded-full border"
              style={{
                borderColor: i === 0 ? "oklch(0.78 0.13 175 / 0.5)" : i === 1 ? "oklch(0.55 0.18 280 / 0.4)" : "oklch(0.7 0.18 300 / 0.4)",
                borderWidth: 1.5,
                transform: `rotateX(${o.tilt}deg) rotateZ(${o.rot}deg)`,
                animation: `spin-slow ${o.dur}s linear infinite`,
              }}>
              <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2"
                style={{
                  background: `radial-gradient(circle at 30% 30%, white, ${["oklch(0.78 0.13 175)", "oklch(0.55 0.18 280)", "oklch(0.7 0.18 300)"][i]})`,
                  boxShadow: `0 0 10px ${["oklch(0.78 0.13 175)", "oklch(0.55 0.18 280)", "oklch(0.7 0.18 300)"][i]}`,
                }} />
            </div>
          ))}
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white"
            style={{
              background: "radial-gradient(circle at 30% 30%, oklch(0.95 0.05 280), oklch(0.55 0.18 280) 60%, oklch(0.35 0.18 280))",
              boxShadow: "0 0 30px oklch(0.55 0.18 280 / 0.6), inset -5px -8px 12px oklch(0.3 0.15 280 / 0.5)",
              animation: "drift 3s ease-in-out infinite",
            }}>
            AI
          </div>
          {Array.from({ length: 20 }).map((_, i) => {
            const a = (i / 20) * Math.PI * 2;
            const r = 50 + (i % 3) * 15;
            const tx = (Math.cos(a) * r).toFixed(4);
            const ty = (Math.sin(a) * r).toFixed(4);
            const delay = (i * 0.1).toFixed(1);
            return (
              <div key={i} className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-primary"
                style={{
                  transform: `translate(${tx}px, ${ty}px)`,
                  animation: `drift ${2 + (i % 3)}s ${delay}s ease-in-out infinite`,
                  opacity: 0.6,
                }} />
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono">
        <span className="text-muted-foreground">SCAMPER · TRIZ</span>
        <span className="text-gradient font-bold">-23.4% cost</span>
      </div>
    </div>
  );
}

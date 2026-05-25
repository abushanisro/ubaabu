export function DeliveryCard() {
  return (
    <div className="h-56 relative overflow-hidden rounded-xl"
      style={{ background: "radial-gradient(ellipse at center, oklch(0.95 0.05 200) 0%, oklch(0.99 0.005 200) 70%)" }}>
      <div className="absolute inset-0 scene flex items-center justify-center">
        <div className="preserve-3d relative" style={{ animation: "spin-slow 30s linear infinite" }}>
          <div className="relative w-44 h-44 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, oklch(0.78 0.13 175 / 0.4), oklch(0.55 0.18 280 / 0.5) 70%, oklch(0.35 0.15 280 / 0.7))",
              boxShadow: "0 0 50px oklch(0.55 0.18 280 / 0.3), inset -15px -20px 30px oklch(0.3 0.15 280 / 0.5)",
            }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {[20, 35, 50, 65, 80].map((y) => (
                <ellipse key={y} cx="50" cy={y} rx={Math.sqrt(2500 - (y - 50) ** 2)} ry="2" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="0.3" />
              ))}
              {[20, 40, 50, 60, 80].map((x) => (
                <ellipse key={x} cx="50" cy="50" rx={Math.abs(x - 50) || 0.5} ry="50" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="0.3" />
              ))}
              {Array.from({ length: 60 }).map((_, i) => {
                const a = (i / 60) * Math.PI * 2;
                const r = 30 + Math.sin(i * 1.7) * 15;
                return <circle key={i} cx={50 + Math.cos(a) * r * 0.6} cy={50 + Math.sin(a) * r * 0.5} r="0.8" fill="oklch(0.78 0.13 175)" opacity={0.7} />;
              })}
            </svg>
          </div>
        </div>
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 220">
        {[
          ["M30 150 Q 150 30 270 80", "oklch(0.78 0.13 175)"],
          ["M50 60 Q 180 180 280 130", "oklch(0.55 0.18 280)"],
        ].map(([d, c], i) => (
          <g key={i}>
            <path d={d as string} stroke={c as string} strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="-30" dur={`${2 + i}s`} repeatCount="indefinite" />
            </path>
          </g>
        ))}
        {[[30, 150], [270, 80], [50, 60], [280, 130]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="white" stroke="oklch(0.55 0.18 280)" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="6" fill="none" stroke="oklch(0.55 0.18 280)" strokeOpacity="0.4">
              <animate attributeName="r" from="3" to="12" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" from="0.6" to="0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>32 active routes</span><span>98% on-time</span>
      </div>
    </div>
  );
}

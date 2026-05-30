'use client'
import { useState, useEffect, useCallback, useRef } from "react";

const axes = ["Quality", "Cost", "Delivery", "Tech", "Capacity"];
const data: Record<string, number[]> = {
  V1: [0.6, 0.7, 0.5, 0.65, 0.55],
  V2: [0.92, 0.85, 0.8, 0.78, 0.72],
  V3: [0.7, 0.6, 0.75, 0.6, 0.8],
};

function poly(vals: number[], r: number) {
  return vals.map((v, i) => {
    const a = (Math.PI * 2 * i) / vals.length - Math.PI / 2;
    return `${Math.cos(a) * r * v},${Math.sin(a) * r * v}`;
  }).join(" ");
}

const tabs = Object.keys(data) as Array<keyof typeof data>;

export function NominationCard() {
  const [active, setActive] = useState<keyof typeof data>("V1");
  const [cycleKey, setCycleKey] = useState(0);
  const activeRef = useRef(active);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const rafRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  // Counter-rotate labels each frame to keep them upright despite the spin animation
  useEffect(() => {
    function tick(now: number) {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const spinAngle = ((elapsed / 30000) * 360) % 360;
      const vals = data[activeRef.current];
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const v = vals[i];
        const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
        const lx = Math.cos(a) * (75 * v + 14);
        const ly = Math.sin(a) * (75 * v + 14);
        el.setAttribute("transform", `rotate(${-spinAngle}, ${lx}, ${ly})`);
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    let idx = tabs.indexOf(active);
    const id = setInterval(() => {
      idx = (idx + 1) % tabs.length;
      setActive(tabs[idx]);
    }, 2000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleKey]);

  const replay = useCallback(() => {
    setActive("V1");
    setCycleKey(k => k + 1);
  }, []);

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className="h-56 relative" onMouseEnter={replay}>
      <div className="flex gap-1 mb-2 bg-muted/60 rounded-lg p-1">
        {tabs.map((k) => (
          <button key={k} onClick={() => setActive(k)}
            className={`flex-1 text-xs font-semibold py-1 rounded-md transition ${
              active === k ? "gradient-primary text-primary-foreground shadow" : "text-muted-foreground"
            }`}>{k}</button>
        ))}
      </div>
      <div className="scene flex justify-center items-center h-36">
        <div className="preserve-3d relative" style={{ transform: "rotateX(60deg) rotateZ(20deg)", animation: "spin-slow 30s linear infinite" }}>
          <svg width="180" height="180" viewBox="-90 -90 180 180">
            <defs>
              <radialGradient id="nom-radGlow">
                <stop offset="0%" stopColor="rgba(30,30,30,0.6)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
              </radialGradient>
            </defs>
            {[0.3, 0.6, 0.9].map((s) => (
              <polygon key={s} points={poly(axes.map(() => s), 75)} fill="none" stroke="oklch(0.7 0.05 200 / 0.4)" strokeWidth="0.5" />
            ))}
            {axes.map((_, i) => {
              const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
              return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 75} y2={Math.sin(a) * 75} stroke="oklch(0.7 0.05 200 / 0.3)" strokeWidth="0.5" />;
            })}
            <polygon points={poly(data[active], 75)} fill="url(#nom-radGlow)" stroke="#1a1a1a" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px rgba(0,0,0,0.45))", transition: "all 0.6s" }} />
            {data[active].map((v, i) => {
              const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
              const cx = Math.cos(a) * 75 * v;
              const cy = Math.sin(a) * 75 * v;
              const labelX = Math.cos(a) * (75 * v + 14);
              const labelY = Math.sin(a) * (75 * v + 14);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="3" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
                  <text
                    ref={el => { labelRefs.current[i] = el; }}
                    x={labelX} y={labelY}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8" fontWeight="bold" fill="#0d9e8a"
                    style={{ transition: "x 0.6s, y 0.6s" }}
                  >
                    {Math.round(v * 100)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/20 flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Recommended</div>
          <div className="text-sm font-bold text-foreground">Supplier B · 92</div>
        </div>
        <div className="px-2 py-1 rounded-md gradient-primary text-primary-foreground text-[10px] font-bold">WINNER</div>
      </div>
    </div>
  );
}

'use client'
import { useState } from "react";

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

export function NominationCard() {
  const [active, setActive] = useState<keyof typeof data>("V2");

  return (
    <div className="h-56 relative">
      <div className="flex gap-1 mb-2 bg-muted/60 rounded-lg p-1">
        {(Object.keys(data) as Array<keyof typeof data>).map((k) => (
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
                <stop offset="0%" stopColor="oklch(0.78 0.13 175 / 0.7)" />
                <stop offset="100%" stopColor="oklch(0.55 0.18 280 / 0.1)" />
              </radialGradient>
            </defs>
            {[0.3, 0.6, 0.9].map((s) => (
              <polygon key={s} points={poly(axes.map(() => s), 75)} fill="none" stroke="oklch(0.7 0.05 200 / 0.4)" strokeWidth="0.5" />
            ))}
            {axes.map((_, i) => {
              const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
              return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 75} y2={Math.sin(a) * 75} stroke="oklch(0.7 0.05 200 / 0.3)" strokeWidth="0.5" />;
            })}
            <polygon points={poly(data[active], 75)} fill="url(#nom-radGlow)" stroke="oklch(0.55 0.18 280)" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px oklch(0.55 0.18 280 / 0.5))", transition: "all 0.6s" }} />
            {data[active].map((v, i) => {
              const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2;
              return <circle key={i} cx={Math.cos(a) * 75 * v} cy={Math.sin(a) * 75 * v} r="3" fill="white" stroke="oklch(0.55 0.18 280)" strokeWidth="1.5" />;
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

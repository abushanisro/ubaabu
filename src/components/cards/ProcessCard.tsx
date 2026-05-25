'use client'
import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

const FINAL_DOTS: [number, number][] = [[40, 148], [130, 95], [220, 55], [285, 28]];

export function ProcessCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prog, setProg] = useState(0);   // 0 → 1 wave rise progress
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Wave rise animation
  useEffect(() => {
    if (!visible) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProg(easeOutCubic(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible]);

  // Number count-up
  useEffect(() => {
    if (!visible) return;
    const target = 128450;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round(easeOutCubic(p) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible]);

  const e = prog;

  // Interpolate path y-values from 200 (flat bottom) to final positions
  const my   = lerp(200, 150, e);
  const c1y  = lerp(200, 150, e);
  const c2y  = lerp(200, 60,  e);
  const c3y  = lerp(200, 60,  e);
  const s1y  = lerp(200, 30,  e);
  const s2y  = lerp(200, 20,  e);

  const strokePath = `M-10 ${my} C 80 ${c1y}, 100 ${c2y}, 180 ${c3y} S 280 ${s1y}, 320 ${s2y}`;
  const fillPath   = `${strokePath} L320 200 L-10 200 Z`;

  const dots = FINAL_DOTS.map(([x, fy]) => [x, lerp(200, fy, e)] as [number, number]);

  const slideUp = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.5s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <div ref={ref} className="h-56 relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/10">

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

        {/* animated fill area */}
        <path d={fillPath} fill="url(#pc-ribbon2)" />

        {/* animated stroke */}
        <path d={strokePath} stroke="url(#pc-ribbon)" strokeWidth="22" fill="none" strokeLinecap="round" opacity="0.9" />

        {/* animated dots */}
        {dots.map(([x, y], i) => (
          <g key={i} style={{ opacity: prog }}>
            <circle cx={x} cy={y} r="10" fill="white" stroke="oklch(0.55 0.18 280)" strokeWidth="2" />
            <circle cx={x} cy={y} r="4" fill="oklch(0.55 0.18 280)" />
          </g>
        ))}

        {Array.from({ length: 20 }).map((_, i) => (
          <circle key={i} cx={20 + i * 14} cy={170 + Math.sin(i) * 8} r={1.5} fill="oklch(0.55 0.18 280)" opacity={0.5 * prog} />
        ))}
      </svg>

      {/* top label */}
      <div className="absolute top-1 left-3 right-3 flex justify-between" style={slideUp(200)}>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Cost trajectory</span>
        <span className="text-xs font-bold text-gradient">+18.4%</span>
      </div>

      {/* bottom cost box */}
      <div
        className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-card/80 backdrop-blur border border-border/50 flex items-end justify-between"
        style={slideUp(300)}
      >
        <div>
          <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Estimated</div>
          <div
            className="text-lg font-bold text-foreground tabular-nums"
            style={{
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1) 350ms",
            }}
          >
            ${count.toLocaleString()}
          </div>
        </div>
        <div className="flex gap-0.5 items-end h-6">
          {[3, 5, 4, 7, 6, 9, 8, 11, 14, 12, 18, 22].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-sm gradient-primary"
              style={{
                height: visible ? h : 0,
                transition: `height 0.5s cubic-bezier(0.22,1,0.36,1) ${400 + i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

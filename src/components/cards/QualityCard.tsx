'use client'
import { useCallback, useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function useCountUp(target: number, visible: boolean, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) { setValue(0); return; }
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(easeOutCubic(p) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [visible, target, duration, delay]);
  return value;
}

export function QualityCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const replayTimer = useRef<ReturnType<typeof setTimeout>>();

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

  const replay = useCallback(() => {
    clearTimeout(replayTimer.current);
    setVisible(false);
    replayTimer.current = setTimeout(() => setVisible(true), 40);
  }, []);

  useEffect(() => () => clearTimeout(replayTimer.current), []);

  const scoreVal   = useCountUp(986, visible, 1600, 0);   // 98.6 → stored as 986, divide by 10
  const passVal    = useCountUp(1227, visible, 1500, 100);
  const defectVal  = useCountUp(18,   visible, 1200, 150);
  const compliVal  = useCountUp(100,  visible, 1400, 200);

  const score = scoreVal / 10;
  const r = 60;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="h-56 relative flex flex-col items-center justify-center" onMouseEnter={replay}>
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
                strokeDasharray={c}
                strokeDashoffset={c - (c * score) / 100}
                style={{ filter: "drop-shadow(0 0 6px oklch(0.68 0.13 180))", transition: "stroke-dashoffset 0.05s linear" }} />
              <defs>
                <linearGradient id="qc-grad">
                  <stop offset="0%" stopColor="oklch(0.78 0.13 175)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.18 280)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="text-3xl font-bold drop-shadow-md tabular-nums">{score.toFixed(1)}%</div>
              <div className="text-[10px] opacity-90 uppercase tracking-wider">Quality</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 w-full text-center">
        <div className="py-1.5 rounded-md bg-muted/40">
          <div className="text-sm font-bold text-foreground tabular-nums">{passVal.toLocaleString()}</div>
          <div className="text-[9px] text-muted-foreground uppercase">Pass</div>
        </div>
        <div className="py-1.5 rounded-md bg-muted/40">
          <div className="text-sm font-bold text-foreground tabular-nums">{defectVal}</div>
          <div className="text-[9px] text-muted-foreground uppercase">Defects</div>
        </div>
        <div className="py-1.5 rounded-md bg-muted/40">
          <div className="text-sm font-bold text-foreground tabular-nums">{compliVal}%</div>
          <div className="text-[9px] text-muted-foreground uppercase">Compliance</div>
        </div>
      </div>
    </div>
  );
}

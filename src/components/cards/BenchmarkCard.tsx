'use client'
import { useCallback, useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function useCountUp(target: number, visible: boolean, duration = 1300, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) { setValue(0); return; }
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round(easeOutCubic(p) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [visible, target, duration, delay]);
  return value;
}

const projects = [
  { name: "Project A", value: 120450, hue: 180 },
  { name: "Project B", value: 98320,  hue: 185 },
  { name: "Project C", value: 110780, hue: 175 },
];

const MAX_H = 100; // max bar height in px
const MAX_V = 120450;

export function BenchmarkCard() {
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

  const v0 = useCountUp(projects[0].value, visible, 1300, 0);
  const v1 = useCountUp(projects[1].value, visible, 1300, 150);
  const v2 = useCountUp(projects[2].value, visible, 1300, 300);
  const counts = [v0, v1, v2];

  return (
    <div ref={ref} className="h-56 relative rounded-xl overflow-hidden flex flex-col" onMouseEnter={replay}
      style={{ background: "linear-gradient(135deg, oklch(0.97 0.02 180) 0%, oklch(0.99 0.005 200) 100%)" }}>

      {/* header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Cost Comparison</span>
        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "oklch(0.68 0.13 180 / 0.12)", color: "oklch(0.45 0.14 180)" }}>
          3 Projects
        </span>
      </div>

      {/* bar chart */}
      <div className="flex-1 flex items-end justify-center gap-8 px-6 pb-4">
        {projects.map((p, i) => {
          const barH = (p.value / MAX_V) * MAX_H;
          const color = `oklch(${0.68 - i * 0.08} 0.13 ${p.hue})`;
          return (
            <div key={p.name} className="flex flex-col items-center gap-1.5">
              {/* price on top */}
              <span
                className="text-[10px] font-bold tabular-nums"
                style={{
                  color,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.4s ease ${i * 150 + 600}ms, transform 0.4s ease ${i * 150 + 600}ms`,
                }}
              >
                ${counts[i].toLocaleString()}
              </span>

              {/* bar */}
              <div
                className="w-12 rounded-t-lg"
                style={{
                  height: visible ? barH : 0,
                  background: `linear-gradient(180deg, oklch(0.78 0.13 175), ${color})`,
                  boxShadow: `0 8px 20px -4px ${color}60`,
                  transition: `height 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 150}ms`,
                }}
              />

              {/* project label */}
              <span
                className="text-[10px] text-gray-500 font-medium"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.4s ease ${i * 150 + 400}ms`,
                }}
              >
                {p.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

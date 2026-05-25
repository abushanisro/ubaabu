'use client'

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Sun, Moon } from "lucide-react";
import { ManufacturingViz } from "./ManufacturingViz";



type Time = "pre-dawn" | "sunrise" | "daytime" | "dusk" | "sunset" | "night";
const TIMES: Time[] = ["pre-dawn", "sunrise", "daytime", "dusk", "sunset", "night"];

const stats = [
  { value: "150+", label: "components and materials sourced across our global network" },
  { value: "$2.4B", label: "in production volume managed for our customers in 2025" },
  { value: "99.4%", label: "on-time delivery across active production lines" },
  { value: "38", label: "countries served with bonded warehousing and last-mile" },
];

export function StatsSection() {
  const [active, setActive] = useState(2);
  const [time, setTime] = useState<Time>("night");
  const [playing, setPlaying] = useState(true);
  const intRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    intRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % stats.length);
    }, 3500);
    return () => {
      if (intRef.current) window.clearInterval(intRef.current);
    };
  }, [playing]);

  const cycleTime = () => {
    const idx = TIMES.indexOf(time);
    setTime(TIMES[(idx + 1) % TIMES.length]);
  };

  const isDay = time === "daytime" || time === "sunrise" || time === "sunset";

  return (
    <section className="stats-stage relative py-24 md:py-32" data-time={time}>
      <div className="stats-sky" data-time={time} />
      <div className="stats-stars" />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            The operating system for global manufacturing.
          </h2>
        </div>

        <div className="self-end">
          <ul className="flex flex-col">
            {stats.map((s, i) => (
              <li key={s.value}>
                <button
                  className={`stat-pill ${i === active ? "active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <p className="font-display text-5xl font-medium md:text-6xl">{s.value}</p>
                  {i === active && (
                    <p className="mt-2 text-sm opacity-80 md:text-base">{s.label}</p>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="grid h-9 w-9 place-items-center rounded-full border border-current/40 hover:bg-white/10"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              onClick={cycleTime}
              aria-label="Time of day"
              className="grid h-9 w-9 place-items-center rounded-full border border-current/40 hover:bg-white/10"
            >
              {isDay ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <span className="ml-2 text-xs uppercase tracking-widest opacity-70">{time}</span>
          </div>
        </div>
      </div>

      {/* Per-stat manufacturing animation */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 flex justify-center">
        <div className="relative w-[120%] max-w-[1400px] translate-y-[20%]" style={{ aspectRatio: "2 / 1" }}>
          <ManufacturingViz index={active as 0 | 1 | 2 | 3} time={time} playing={playing} />
        </div>
      </div>


    </section>
  );
}

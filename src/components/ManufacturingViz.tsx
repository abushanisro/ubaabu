'use client'

import { useEffect, useRef } from "react";

type Time = "pre-dawn" | "sunrise" | "daytime" | "dusk" | "sunset" | "night";

const PALETTE: Record<Time, { fg: string; accent: string; soft: string; bg: string }> = {
  "pre-dawn": { fg: "#cfd9ff", accent: "#9bb8ff", soft: "rgba(155,184,255,0.25)", bg: "rgba(20,30,60,0)" },
  sunrise:   { fg: "#fff0d6", accent: "#ffb37a", soft: "rgba(255,179,122,0.28)", bg: "rgba(0,0,0,0)" },
  daytime:   { fg: "#0e2547", accent: "#2a5fb8", soft: "rgba(42,95,184,0.22)", bg: "rgba(0,0,0,0)" },
  dusk:      { fg: "#ffd9ee", accent: "#c46cff", soft: "rgba(196,108,255,0.25)", bg: "rgba(0,0,0,0)" },
  sunset:    { fg: "#ffd2b8", accent: "#ff7a4f", soft: "rgba(255,122,79,0.28)", bg: "rgba(0,0,0,0)" },
  night:     { fg: "#dfeaff", accent: "#7df0d1", soft: "rgba(125,240,209,0.22)", bg: "rgba(0,0,0,0)" },
};

type Props = { index: 0 | 1 | 2 | 3; time: Time; playing: boolean };

export function ManufacturingViz({ index, time, playing }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indexRef = useRef(index);
  const timeRef = useRef(time);
  const playingRef = useRef(playing);

  useEffect(() => { indexRef.current = index; }, [index]);
  useEffect(() => { timeRef.current = time; }, [time]);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    let lastIdx = indexRef.current;
    let transition = 1; // 1 = fully shown, 0 = entering

    const draw = () => {
      if (indexRef.current !== lastIdx) {
        lastIdx = indexRef.current;
        transition = 0;
      }
      transition = Math.min(1, transition + 0.04);
      if (playingRef.current) t += 0.016;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = transition;
      const pal = PALETTE[timeRef.current];

      switch (lastIdx) {
        case 0: drawComponents(ctx, w, h, t, pal); break;
        case 1: drawConveyor(ctx, w, h, t, pal); break;
        case 2: drawUptime(ctx, w, h, t, pal); break;
        case 3: drawWorldMap(ctx, w, h, t, pal); break;
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* -------------------- 1. Components / materials (orbiting parts grid) -------------------- */
function drawComponents(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pal: { fg: string; accent: string; soft: string }) {
  const cx = w / 2, cy = h * 0.6;
  ctx.strokeStyle = pal.soft; ctx.lineWidth = 1;
  // concentric rings
  for (let r = 60; r < Math.max(w, h); r += 90) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  }
  // radial spokes
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40);
    ctx.lineTo(cx + Math.cos(a) * Math.max(w, h), cy + Math.sin(a) * Math.max(w, h));
    ctx.stroke();
  }

  // orbiting component glyphs (gears, chips, bolts)
  const orbits = [
    { r: 130, count: 8, speed: 0.25, size: 14 },
    { r: 220, count: 12, speed: -0.15, size: 12 },
    { r: 320, count: 16, speed: 0.1, size: 11 },
    { r: 420, count: 22, speed: -0.07, size: 10 },
  ];
  orbits.forEach((o, oi) => {
    for (let i = 0; i < o.count; i++) {
      const a = (i / o.count) * Math.PI * 2 + t * o.speed;
      const x = cx + Math.cos(a) * o.r;
      const y = cy + Math.sin(a) * o.r;
      const kind = (i + oi) % 3;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a + t * 0.5);
      ctx.fillStyle = pal.accent;
      ctx.strokeStyle = pal.fg;
      ctx.lineWidth = 1.2;
      if (kind === 0) drawGear(ctx, o.size);
      else if (kind === 1) drawChip(ctx, o.size);
      else drawBolt(ctx, o.size);
      ctx.restore();
    }
  });

  // center hub
  ctx.fillStyle = pal.accent;
  ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = pal.fg; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, 18 + Math.sin(t * 2) * 3, 0, Math.PI * 2); ctx.stroke();
}

function drawGear(ctx: CanvasRenderingContext2D, s: number) {
  const teeth = 8;
  ctx.beginPath();
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? s : s * 0.7;
    const a = (i / (teeth * 2)) * Math.PI * 2;
    ctx[i === 0 ? "moveTo" : "lineTo"](Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2); ctx.fill();
}
function drawChip(ctx: CanvasRenderingContext2D, s: number) {
  ctx.strokeRect(-s, -s * 0.7, s * 2, s * 1.4);
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(i * s * 0.35, -s * 0.7); ctx.lineTo(i * s * 0.35, -s);
    ctx.moveTo(i * s * 0.35, s * 0.7);  ctx.lineTo(i * s * 0.35, s);
    ctx.stroke();
  }
}
function drawBolt(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx[i === 0 ? "moveTo" : "lineTo"](Math.cos(a) * s, Math.sin(a) * s);
  }
  ctx.closePath(); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2); ctx.stroke();
}

/* -------------------- 2. Conveyor belt (production volume) -------------------- */
function drawConveyor(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pal: { fg: string; accent: string; soft: string }) {
  const lanes = 3;
  const laneH = h / (lanes + 1.5);
  for (let l = 0; l < lanes; l++) {
    const y = laneH * (l + 1.2);
    const dir = l % 2 === 0 ? 1 : -1;
    // belt
    ctx.strokeStyle = pal.soft; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    // tick marks moving
    const speed = (40 + l * 10) * dir;
    const offset = (t * speed) % 30;
    ctx.strokeStyle = pal.soft; ctx.lineWidth = 1;
    for (let x = -30 + offset; x < w + 30; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x + 10, y + 4); ctx.stroke();
    }
    // parts on belt
    const partCount = 8;
    for (let i = 0; i < partCount; i++) {
      const phase = (i / partCount + (t * (0.08 + l * 0.02) * dir)) % 1;
      const x = phase * (w + 100) - 50;
      const size = 22 + (i % 3) * 6;
      ctx.save();
      ctx.translate(x, y - size / 2 - 4);
      ctx.fillStyle = pal.accent;
      ctx.strokeStyle = pal.fg;
      ctx.lineWidth = 1.2;
      const kind = (i + l) % 3;
      if (kind === 0) {
        ctx.fillRect(0, 0, size, size * 0.65);
        ctx.strokeRect(0, 0, size, size * 0.65);
      } else if (kind === 1) {
        ctx.beginPath(); ctx.arc(size / 2, size * 0.35, size * 0.4, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, size * 0.65); ctx.lineTo(size / 2, 0); ctx.lineTo(size, size * 0.65); ctx.closePath();
        ctx.fill(); ctx.stroke();
      }
      ctx.restore();
    }
  }

  // floating dollar values
  ctx.font = "500 12px Inter, sans-serif";
  ctx.fillStyle = pal.fg;
  for (let i = 0; i < 6; i++) {
    const x = ((i / 6) * w + (t * 30) % w) % w;
    const y = 30 + (i * 17) % (h - 60);
    const v = ["$12k", "$48k", "$1.2M", "$420k", "$98k", "$3.4M"][i];
    ctx.globalAlpha = 0.5 + Math.sin(t + i) * 0.3;
    ctx.fillText(v, x, y);
  }
  ctx.globalAlpha = 1;
}

/* -------------------- 3. Uptime / on-time radial gauge + EKG -------------------- */
function drawUptime(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pal: { fg: string; accent: string; soft: string }) {
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) * 0.32;

  // bg ring
  ctx.strokeStyle = pal.soft; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

  // animated progress ring (994/1000)
  const progress = 0.994;
  ctx.strokeStyle = pal.accent; ctx.lineWidth = 6; ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
  ctx.stroke();

  // pulse dot at end
  const endA = -Math.PI / 2 + Math.PI * 2 * progress;
  const ex = cx + Math.cos(endA) * R;
  const ey = cy + Math.sin(endA) * R;
  ctx.fillStyle = pal.accent;
  ctx.beginPath(); ctx.arc(ex, ey, 5 + Math.sin(t * 4) * 2, 0, Math.PI * 2); ctx.fill();

  // tick marks around
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const r1 = R + 14, r2 = R + (i % 5 === 0 ? 22 : 18);
    ctx.strokeStyle = pal.soft; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  // EKG-style line across, indicating shipments arriving on time
  const baseY = cy + R + 60;
  ctx.strokeStyle = pal.accent; ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const phase = (x / 80) - t * 2;
    const spike = Math.sin(phase * Math.PI * 2) * 4
      + (Math.sin(phase * 6) > 0.95 ? 30 : 0)
      - (Math.cos(phase * 6 + 0.4) > 0.97 ? 18 : 0);
    const y = baseY - spike;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // grid below
  ctx.strokeStyle = pal.soft; ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, baseY + 50); ctx.lineTo(x, baseY + 90); ctx.stroke();
  }
}

/* -------------------- 4. World map with 38 country nodes -------------------- */
const NODES: [number, number][] = [
  [0.18, 0.45], [0.22, 0.4], [0.24, 0.5], [0.28, 0.55], [0.3, 0.62],
  [0.34, 0.7], [0.32, 0.78], [0.2, 0.55], [0.15, 0.5],
  [0.46, 0.38], [0.48, 0.42], [0.5, 0.46], [0.52, 0.4], [0.54, 0.5],
  [0.49, 0.55], [0.51, 0.62], [0.55, 0.7], [0.58, 0.78],
  [0.62, 0.36], [0.65, 0.42], [0.68, 0.45], [0.72, 0.5], [0.7, 0.55],
  [0.74, 0.6], [0.78, 0.52], [0.8, 0.6], [0.82, 0.68],
  [0.85, 0.42], [0.88, 0.5], [0.6, 0.32], [0.42, 0.32], [0.25, 0.32],
  [0.38, 0.6], [0.44, 0.65], [0.6, 0.45], [0.66, 0.62], [0.76, 0.4], [0.83, 0.55],
];

function drawWorldMap(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pal: { fg: string; accent: string; soft: string }) {
  // dotted "continents" — fine grid masked by pseudo land function
  const step = 14;
  ctx.fillStyle = pal.soft;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const u = x / w, v = y / h;
      const land =
        Math.sin(u * 18) * Math.cos(v * 10) +
        Math.sin(u * 7 + 1.3) * Math.cos(v * 5 + 0.4);
      if (land > 0.35) {
        ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  // 38 country nodes
  NODES.forEach(([nx, ny], i) => {
    const x = nx * w, y = ny * h;
    const pulse = (Math.sin(t * 2 + i * 0.7) + 1) / 2;
    ctx.fillStyle = pal.accent;
    ctx.globalAlpha = 0.4 + pulse * 0.6;
    ctx.beginPath(); ctx.arc(x, y, 2.5 + pulse * 1.5, 0, Math.PI * 2); ctx.fill();
    // halo
    ctx.globalAlpha = (1 - pulse) * 0.5;
    ctx.beginPath(); ctx.arc(x, y, 4 + pulse * 14, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;

  // active shipping lines between random pairs
  ctx.strokeStyle = pal.accent; ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    const a = NODES[(Math.floor(t * 0.5) + i * 5) % NODES.length];
    const b = NODES[(Math.floor(t * 0.5) + i * 7 + 3) % NODES.length];
    const ax = a[0] * w, ay = a[1] * h, bx = b[0] * w, by = b[1] * h;
    const mx = (ax + bx) / 2, my = (ay + by) / 2 - 40;
    const phase = (t * 0.4 + i * 0.2) % 1;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.stroke();
    // moving packet
    const px = (1 - phase) * (1 - phase) * ax + 2 * (1 - phase) * phase * mx + phase * phase * bx;
    const py = (1 - phase) * (1 - phase) * ay + 2 * (1 - phase) * phase * my + phase * phase * by;
    ctx.globalAlpha = 1;
    ctx.fillStyle = pal.fg;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

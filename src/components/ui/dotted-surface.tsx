'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';



type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

// Canvas 2D re-implementation of the Three.js dotted wave grid.
// Perspective projection matches the original:
//   camera (0, 355, 1220), FOV 60°, looking along -Z.
export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SEPARATION = 150;
    const AMOUNTX   = 40;
    const AMOUNTY   = 60;

    const getSize = () => ({
      w: container.clientWidth  || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    let { w, h } = getSize();

    const canvas = document.createElement('canvas');
    canvas.width  = w;
    canvas.height = h;
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;

    // Camera constants — mirrors Three.js setup
    const CAM_Y = 355;
    const CAM_Z = 1220;
    const F = 1 / Math.tan(30 * Math.PI / 180); // focal length for FOV=60°

    const project = (x: number, y: number, z: number) => {
      const depth = CAM_Z - z; // positive for points in front of camera
      if (depth <= 0) return null;
      const aspect = w / h;
      const sx = (F / aspect) * (x / depth) * (w / 2) + w / 2;
      const sy = F * ((CAM_Y - y) / depth) * (h / 2) + h / 2; // y-flip: world-up → screen-down
      const r  = Math.max(1, 3.5 * F * (h / 2) / depth);
      return { x: sx, y: sy, r };
    };

    let count = 0;
    let rafId: number;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.55;
      ctx.fillStyle   = '#2dd4bf';

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const px = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const pz = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          const py = Math.sin((ix + count) * 0.3) * 4 +
                     Math.sin((iy + count) * 0.5) * 4;
          const p = project(px, py, pz);
          if (!p || p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) continue;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      count += 0.015;
    };

    const resize = () => {
      ({ w, h } = getSize());
      canvas.width  = w;
      canvas.height = h;
    };

    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0', className)}
      {...props}
    />
  );
}

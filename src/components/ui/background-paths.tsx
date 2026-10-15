// Decorative flowing lines. Pure CSS (stroke-dashoffset + opacity keyframes in
// globals.css) - previously 36 framer-motion paths per instance were driven
// from JavaScript on every frame. Same look: the dash pattern matches framer's
// pathLength=1 / pathOffset 0→1→0 sweep. Server component, no hydration cost.
export function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            pathLength={1}
            className="floating-path"
            stroke="white"
            strokeWidth={path.width}
            strokeOpacity={0.03 + path.id * 0.012}
            style={{ animationDuration: `${20 + (path.id % 5) * 3}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

export function AnimatedArrow({ size = 10 }: { size?: number }) {
  return (
    <svg
      className="overflow-visible shrink-0"
      width={size}
      height={size}
      viewBox="0 0 10 10"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        className="origin-left transition-transform duration-200 ease-out -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
        d="M0 5h7"
      />
      <path
        className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
        d="M1 1l4 4-4 4"
      />
    </svg>
  )
}

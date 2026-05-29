"use client"

import * as React from "react"

interface LoaderProps {
  size?: number
  text?: string
}

export const Component: React.FC<LoaderProps> = ({ size = 64, text = "Voice AI" }) => {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {/* Spinning teal ring */}
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          animation: "aiLoaderSpin 5s linear infinite",
        }}
      />

      {/* Label */}
      <span className="text-[11px] font-bold tracking-widest uppercase text-[#0d1117]">
        {text}
      </span>

      <style>{`
        @keyframes aiLoaderSpin {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 6px 12px 0 #48d2be inset,
              0 12px 18px 0 #0d9e8a inset,
              0 36px 36px 0 #0a4a3a inset,
              0 0 4px 2px rgba(72,210,190,0.5),
              0 0 10px 3px rgba(13,158,138,0.3);
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 6px 12px 0 #7ee8d6 inset,
              0 12px 6px 0 #0b8a7a inset,
              0 24px 36px 0 #0d9e8a inset,
              0 0 4px 2px rgba(72,210,190,0.5),
              0 0 10px 3px rgba(13,158,138,0.3);
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 6px 12px 0 #48d2be inset,
              0 12px 18px 0 #0d9e8a inset,
              0 36px 36px 0 #0a4a3a inset,
              0 0 4px 2px rgba(72,210,190,0.5),
              0 0 10px 3px rgba(13,158,138,0.3);
          }
        }
      `}</style>
    </div>
  )
}

export default Component

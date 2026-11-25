import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Text with a hand-drawn underline that draws in on load and wobbles on hover.
 * Pure CSS (keyframes in globals.css): no framer-motion and no client JavaScript,
 * so it renders as a server component wherever it is used. The hover wobble uses
 * a CSS `d: path()` transition (Chromium and Firefox; Safari keeps the static curve).
 */
interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
  underlineColor?: string;
}

function AnimatedText({
  text,
  textClassName,
  underlineClassName,
  underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
  underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
  underlineDuration = 1.5,
  underlineColor = "currentColor",
  className,
  style,
  ...props
}: AnimatedTextProps) {
  return (
    <span
      className={cn("animated-underline relative inline-block", className)}
      style={{
        ...style,
        ["--ul-path" as string]: `path("${underlinePath}")`,
        ["--ul-hover-path" as string]: `path("${underlineHoverPath}")`,
        ["--ul-duration" as string]: `${underlineDuration}s`,
      }}
      {...props}
    >
      <span className={cn("relative", textClassName)}>{text}</span>
      <svg
        width="100%"
        height="12"
        viewBox="0 0 300 20"
        aria-hidden
        className={cn("absolute -bottom-1 left-0 w-full", underlineClassName)}
        style={{ overflow: "visible" }}
      >
        <path d={underlinePath} pathLength={1} stroke={underlineColor} strokeWidth="2.5" fill="none" />
      </svg>
    </span>
  );
}

export { AnimatedText };

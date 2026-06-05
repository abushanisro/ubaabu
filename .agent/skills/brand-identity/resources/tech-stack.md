# Preferred Tech Stack & Implementation Rules

When generating code or UI components for Emithran, you **MUST** strictly adhere to the following technology choices.

## Core Stack

* **Framework:** Next.js 16 (App Router, TypeScript)
* **Styling Engine:** Tailwind CSS v4 (Mandatory. Do not use plain CSS files or styled-components unless explicitly asked.)
* **Animation:** Framer Motion (`motion`, `useInView`, `useScroll`, `useTransform`, `useMotionValue`, `useSpring`)
* **Icons:** Lucide React
* **Carousel:** embla-carousel-react
* **3D / Canvas:** Three.js (plain, no react-three-fiber)
* **Fonts:** Sora (headings via `--font-sora`) + Inter (body via `--font-inter`) loaded via `next/font/google`

## Implementation Guidelines

### 1. Tailwind Usage
* Use utility classes directly in JSX.
* For brand colors not in Tailwind defaults, use inline `style` props with tokens from `design-tokens.json`.
* Avoid hardcoding hex values directly — reference the token names from `design-tokens.json`.
* **Dark Mode:** Not currently used — default to light mode only.

### 2. Component Patterns
* **Buttons (primary):** Teal background `#2dd4bf`, navy text `#0f1b2d`, `border-radius: 999px`, `box-shadow: 0 4px 24px rgba(45,212,191,0.30)`.
* **Buttons (secondary):** Border `rgba(0,0,0,0.15)`, transparent background, navy text.
* **Cards:** White background, `border: 1px solid rgba(0,0,0,0.08)`, `border-radius: 1rem`, `box-shadow: 0 2px 16px rgba(0,0,0,0.07)`.
* **Section headings:** Use `AnimatedText` from `@/components/ui/animated-underline-text-one` for the last word with teal underline.
* **Animations:** Use Framer Motion `useInView` with `once: true` for scroll-triggered entrance animations. Standard ease: `[0.16, 1, 0.3, 1]`.
* **Layout:** `max-w-[1280px] mx-auto px-6` for content containers.

### 3. File Conventions
* Components: `src/components/[section]/ComponentName.tsx`
* Pages: `src/app/[route]/page.tsx`
* All client components must have `'use client'` at the top.

### 4. Forbidden Patterns
* Do NOT use jQuery or Bootstrap.
* Do NOT use `@react-three/fiber` — use plain Three.js.
* Do NOT create new global CSS files; keep styles in component files via Tailwind or inline `style` props.
* Do NOT use `margin` for offset below fixed navbar — use `padding` to prevent margin collapse.

### 5. Anti-AI-Slop Visual Rules
* Do NOT use typewriter/cycling text animations — show copy as static text.
* Do NOT animate numeric metrics — display them as static numbers.
* Do NOT use `backdrop-blur` on regular cards — use solid `bg-white` with a border.
* Do NOT use dark backgrounds with teal/neon glow accents in body sections — keep to light `bg-white` or `bg-[#fafafa]`.
* Do NOT use pulsing orbs, floating particle animations, or blur-circle decorative div backgrounds.
* Do NOT use continuous `animation: ... infinite` loops on purely decorative elements.
* Subtle scroll-triggered fade-in (Framer Motion `useInView`, `once: true`) is acceptable.

## Asset Paths
* Logo (white): `/assets/infographics/logo/logo-white.png`
* Logo (black): `/assets/infographics/logo/logo-black.png`
* Hero wave SVG: `/assets/cards/solution/hero.svg`
* Case studies: `/case-studies/[slug]`

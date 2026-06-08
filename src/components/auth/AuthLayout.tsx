"use client";

type AuthHeaderProps = {
  rightLink: { href: string; label: string };
};

export function AuthHeader({ rightLink }: AuthHeaderProps) {
  return (
    <header className="relative z-20 w-full bg-white border-b border-black/[0.07]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/assets/infographics/logo/logo-white.png"
            alt="Emithran"
            className="h-8 w-auto"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-[#080808]">
            EMITHRAN
          </span>
        </a>

        <a
          href={rightLink.href}
          className="group inline-flex items-center gap-0 text-[13px] text-[#0d9e8a] hover:opacity-75 transition-opacity"
        >
          {rightLink.label}&nbsp;
          <svg
            className="overflow-visible"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              className="origin-left transition-transform duration-200 ease-out translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              d="M0 5h7"
            />
            <path
              className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              d="M1 1l4 4-4 4"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}

export function AuthFooter() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-transparent">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-5">
        <nav className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-col gap-2">
            <a href="/" className="flex items-center gap-2 w-fit">
              <img
                src="/assets/infographics/logo/logo-white.png"
                alt="Emithran"
                className="h-5 w-auto"
              />
              <span className="text-[#0f1b2d] text-sm font-bold tracking-widest">EMITHRAN</span>
            </a>
            <a
              href="/"
              className="group flex items-center gap-1 text-[13px] text-black/40 hover:text-[#0d9e8a] transition-colors w-fit"
            >
              Visit our full website
              <svg
                className="ml-0.5 group-hover:translate-x-0.5 transition-transform"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M0 5h7M6 1l4 4-4 4" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a href="/privacy" className="text-black/40 hover:text-black/65 transition-colors whitespace-nowrap">
              Privacy &amp; terms
            </a>
            <span className="text-black/20">·</span>
            <span className="text-black/30 whitespace-nowrap">
              © {new Date().getFullYear()} Emithran Technologies Pvt. Ltd.
            </span>
          </div>
        </nav>
      </div>
    </footer>
  );
}

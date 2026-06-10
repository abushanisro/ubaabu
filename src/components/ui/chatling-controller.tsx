"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ChatlingController() {
  const pathname = usePathname();

  useEffect(() => {
    const el = () => document.getElementById("chtl-chat-icon-container") as HTMLElement | null;

    function update() {
      const widget = el();
      if (!widget) return;

      const isHomepage = pathname === "/";

      // Check if footer is near/in the viewport
      const footer = document.querySelector("footer");
      let footerVisible = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        footerVisible = rect.top < window.innerHeight;
      }

      widget.style.display = isHomepage || footerVisible ? "none" : "";
    }

    // Poll briefly for the widget to appear (third-party script loads async)
    const interval = setInterval(() => { if (el()) { update(); clearInterval(interval); } }, 200);
    const timeout = setTimeout(() => clearInterval(interval), 8000);

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("scroll", update);
      // Restore when unmounting
      const widget = el();
      if (widget) widget.style.display = "";
    };
  }, [pathname]);

  return null;
}

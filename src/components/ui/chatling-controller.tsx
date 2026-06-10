"use client";
import { useEffect } from "react";

export default function ChatlingController() {
  useEffect(() => {
    const getWidget = () =>
      document.getElementById("chtl-chat-icon-container") as HTMLElement | null;

    function update() {
      const widget = getWidget();
      if (!widget) return;

      // Hide when hero (first viewport) is visible
      const heroVisible = window.scrollY < window.innerHeight * 0.9;

      // Hide when footer is visible
      const footer = document.querySelector("footer");
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;

      widget.style.display = heroVisible || footerVisible ? "none" : "";
    }

    // Poll until the widget appears (async third-party script)
    const interval = setInterval(() => {
      if (getWidget()) {
        update();
        clearInterval(interval);
      }
    }, 200);
    const timeout = setTimeout(() => clearInterval(interval), 8000);

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("scroll", update);
      const widget = getWidget();
      if (widget) widget.style.display = "";
    };
  }, []);

  return null;
}

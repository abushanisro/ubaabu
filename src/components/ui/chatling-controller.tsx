"use client";
import { useEffect } from "react";

// Hides the Chatling widget while the hero (first viewport) or the footer is on
// screen. Uses IntersectionObservers instead of a scroll listener so nothing
// runs (or forces layout) on every scroll frame.
export default function ChatlingController() {
  useEffect(() => {
    const getWidget = () =>
      document.getElementById("chtl-chat-icon-container") as HTMLElement | null;

    let heroVisible = window.scrollY < window.innerHeight * 0.9;
    let footerVisible = false;

    const apply = () => {
      const widget = getWidget();
      if (widget) widget.style.display = heroVisible || footerVisible ? "none" : "";
    };

    // Sentinel spanning the first 90% of the viewport height at the top of the page
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:90vh;pointer-events:none;visibility:hidden";
    document.body.appendChild(sentinel);

    const heroIO = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; apply(); });
    heroIO.observe(sentinel);

    const footerIO = new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting; apply(); });
    const footer = document.querySelector("footer");
    if (footer) footerIO.observe(footer);

    // The widget is injected asynchronously by a third-party script: apply the
    // current state as soon as it appears.
    const mo = new MutationObserver(() => {
      if (getWidget()) { apply(); mo.disconnect(); }
    });
    if (getWidget()) apply();
    else mo.observe(document.body, { childList: true });

    return () => {
      heroIO.disconnect();
      footerIO.disconnect();
      mo.disconnect();
      sentinel.remove();
      const widget = getWidget();
      if (widget) widget.style.display = "";
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

export function ScrollTextReveal() {
  useEffect(() => {
    const root = document.getElementById("home-content");
    const footer = document.getElementById("footer-content");
    if (!root || !window.IntersectionObserver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(root.querySelectorAll("section"));
    const elements = [root, footer].filter((scope): scope is HTMLElement => !!scope)
      .flatMap((scope) => Array.from(scope.querySelectorAll<HTMLElement>(
        "h1, h2, h3, h4, h5, h6, p, li, button, a, img, span",
      ))).filter((element) => {
      if (element.closest("[data-no-reveal]")) return false;
      if (element.closest("li li")) return false;
      if (element.closest("li") && element.tagName !== "LI") return false;
      if (element.tagName === "IMG" && element.closest("picture")) return false;
      if (element.tagName === "IMG" && element.closest("a")) return false;
      if (element.tagName === "SPAN") {
        if (element.hasAttribute("aria-hidden") || !element.textContent?.trim()) return false;
        if (element.closest("h1, h2, h3, h4, h5, h6, p, button, a")) return false;
      }
      return true;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("text-reveal-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );

    for (const element of elements) {
      const sectionIndex = sections.indexOf(element.closest("section") as HTMLElement);
      element.dataset.textReveal = element.dataset.revealDirection || (
        element.tagName === "P"
          ? "top"
          : sectionIndex % 2 === 0 ? "left" : "right"
      );
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of elements) {
        delete element.dataset.textReveal;
        element.classList.remove("text-reveal-visible");
      }
    };
  }, []);

  return null;
}

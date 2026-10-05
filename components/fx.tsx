"use client";

import { useEffect } from "react";

export function ScrollFx() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.classList.add("in");
      io.unobserve(el);
      window.setTimeout(() => { el.style.transitionDelay = ""; }, 1400);
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll<HTMLElement>("main section :is(h2, li, article, details, dl > div)").forEach((el) => {
      el.style.transitionDelay = `${Math.min(Array.from(el.parentElement?.children ?? []).indexOf(el), 5) * 70}ms`;
      io.observe(el);
    });
    const move = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(".spot");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => { io.disconnect(); document.removeEventListener("pointermove", move); };
  }, []);
  return null;
}

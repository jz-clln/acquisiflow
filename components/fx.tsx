"use client";

import { useEffect } from "react";
import { isLowPerf, isReducedMotion, markLowPerf } from "@/lib/perf";

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

    // Looping animations (glow, tool strip) pause while off screen.
    const watch = new IntersectionObserver((entries) => entries.forEach((e) => (e.target as HTMLElement).toggleAttribute("data-off", !e.isIntersecting)));
    document.querySelectorAll("[data-anim]").forEach((el) => watch.observe(el));

    // Adaptive downgrade: if the page measures slow frames, switch to the low-end mode (static scenes, no glow).
    let raf = 0, timer = 0;
    // Skipped in `next dev`: dev builds are slow and would trigger a false downgrade.
    if (process.env.NODE_ENV !== "development" && !isLowPerf() && !isReducedMotion()) {
      const dts: number[] = [];
      let last = 0;
      const tick = (t: number) => {
        if (last && t - last < 250) dts.push(t - last);
        last = t;
        if (dts.length < 60) { raf = requestAnimationFrame(tick); return; }
        dts.sort((a, b) => a - b);
        if (dts[30] > 30) markLowPerf();
      };
      timer = window.setTimeout(() => { raf = requestAnimationFrame(tick); }, 2500);
    }

    return () => {
      io.disconnect(); watch.disconnect();
      window.clearTimeout(timer); cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", move);
    };
  }, []);
  return null;
}
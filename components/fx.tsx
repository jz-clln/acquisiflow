"use client";

import { useEffect } from "react";
import { isLowPerf, isReducedMotion, markLowPerf } from "@/lib/perf";

export function ScrollFx() {
  useEffect(() => {
    // Content is visible by default. Only animate after observation succeeds.
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      if (!isReducedMotion()) {
        const el = e.target as HTMLElement;
        const delay = Math.min(Array.from(el.parentElement?.children ?? []).indexOf(el), 5) * 70;
        el.animate([{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "none" }], {
          duration: isLowPerf() ? 400 : 700, delay, easing: "cubic-bezier(.16,1,.3,1)",
        });
      }
      io.unobserve(e.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll<HTMLElement>("main section :is(h2, li, article, details, dl > div)").forEach(el => io.observe(el));
    let pointerRaf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || isLowPerf() || isReducedMotion()) return;
      const target = (e.target as HTMLElement).closest<HTMLElement>(".spot");
      if (!target) return;
      cancelAnimationFrame(pointerRaf);
      pointerRaf = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${e.clientX - r.left}px`);
        target.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      document.documentElement.dataset.motion = motionQuery.matches ? "reduce" : "full";
      window.dispatchEvent(new Event("motion:change"));
    };
    motionQuery.addEventListener("change", syncMotion);

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
      cancelAnimationFrame(pointerRaf);
      motionQuery.removeEventListener("change", syncMotion);
      window.clearTimeout(timer); cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", move);
    };
  }, []);
  return null;
}
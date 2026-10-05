// lib/perf.ts
// The inline script in layout.tsx sets data-perf="low" | "high" before first paint.
// fx.tsx can downgrade to "low" at runtime if the page measures slow frames.

export const isLowPerf = () => typeof document !== "undefined" && document.documentElement.dataset.perf === "low";

// data-motion is "reduce" when the OS asks for reduced motion, unless the URL has ?motion=on (for testing).
export const isReducedMotion = () => typeof document !== "undefined" && document.documentElement.dataset.motion === "reduce";

export function markLowPerf() {
  if (isLowPerf()) return;
  document.documentElement.dataset.perf = "low";
  window.dispatchEvent(new Event("perf:low"));
}
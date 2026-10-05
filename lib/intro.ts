// lib/intro.ts

export function onIntroDone(callback: () => void) {
  if (document.documentElement.dataset.intro !== "playing") {
    callback();
    return () => {};
  }
  window.addEventListener("intro:done", callback, { once: true });
  return () => window.removeEventListener("intro:done", callback);
}
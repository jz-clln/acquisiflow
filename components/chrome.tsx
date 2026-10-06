"use client";

import Image from "next/image";
import { ArrowRight, Menu, Pause, Play, SunMoon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { wrap } from "@/lib/ui";

// Restore the browser tab's theme-aware symbol after hydration. The initial
// server HTML still declares /icon.png; search engines control their selection.
function syncFavicon(theme: string | undefined) {
  const href = theme === "dark" ? "/acquisiflow-symbol-dark.png" : "/acquisiflow-symbol-light.png";
  document.querySelectorAll('link[rel="icon"]').forEach((el) => el.remove());
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = href;
  document.head.appendChild(link);
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("af-theme", next); } catch {}
  syncFavicon(next);
}

export function Header() {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    syncFavicon(document.documentElement.dataset.theme);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    site.nav.forEach((n) => { const el = document.getElementById(n.href.slice(1)); if (el) io.observe(el); });
    const syncMotion = () => setPaused(document.documentElement.dataset.motion === "reduce");
    syncMotion();
    window.addEventListener("motion:change", syncMotion);
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.getElementById("mobile-nav")) {
        setOpen(false); menuButton.current?.focus();
      }
    };
    const wide = () => innerWidth >= 1024 && setOpen(false);
    addEventListener("keydown", esc); addEventListener("resize", wide);
    return () => { window.removeEventListener("motion:change", syncMotion); io.disconnect(); removeEventListener("keydown", esc); removeEventListener("resize", wide); };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        <a href="#top" aria-label="AcquisiFlow home" className="shrink-0">
          <Image src="/acquisiflow-wordmark.png" alt="AcquisiFlow" width={1086} height={362} sizes="(min-width: 640px) 128px, 112px" priority className="h-auto w-28 sm:w-32 dark:brightness-0 dark:invert" />
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-[15px] lg:flex">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} aria-current={active === n.href.slice(1) ? "true" : undefined} className="py-2 text-body transition-colors hover:text-ink aria-current:text-ink aria-current:underline aria-current:underline-offset-8">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" aria-label={paused ? "Play animations" : "Pause animations"} aria-pressed={paused} onClick={() => {
            document.documentElement.dataset.motion = paused ? "full" : "reduce";
            window.dispatchEvent(new Event("motion:change"));
          }} className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-secondary">
            {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
          </button>
          <button type="button" onClick={toggleTheme} aria-label="Switch between light and dark theme" className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-secondary">
            <SunMoon size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <a href="#contact" className="btn hidden min-h-11! px-5! sm:inline-flex">Start Your Project<ArrowRight size={16} aria-hidden="true" /></a>
          <button ref={menuButton} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)} className="grid size-11 place-items-center rounded-full border border-line-strong lg:hidden">
            {open ? <X size={18} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <div className={`${wrap} flex flex-col py-4`}>
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => {
                setOpen(false);
                const target = document.querySelector<HTMLElement>(e.currentTarget.hash);
                target?.setAttribute("tabindex", "-1");
                target?.focus({ preventScroll: true });
              }} className="display border-b border-line py-4 text-2xl">{n.label}</a>
            ))}
            <a href="#contact" onClick={(e) => {
                setOpen(false);
                const target = document.querySelector<HTMLElement>(e.currentTarget.hash);
                target?.setAttribute("tabindex", "-1");
                target?.focus({ preventScroll: true });
              }} className="btn mt-6">Start Your Project<ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </nav>
      )}
      <span aria-hidden="true" className="progress absolute inset-x-0 bottom-0 h-0.5 bg-brand" />
    </header>
  );
}

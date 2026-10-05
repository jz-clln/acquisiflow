"use client";

import Image from "next/image";
import { ArrowRight, ArrowUp, Mail, Menu, SunMoon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { wrap } from "@/lib/ui";

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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    syncFavicon(document.documentElement.dataset.theme);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    site.nav.forEach((n) => { const el = document.getElementById(n.href.slice(1)); if (el) io.observe(el); });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = () => innerWidth >= 1024 && setOpen(false);
    addEventListener("keydown", esc); addEventListener("resize", wide);
    return () => { io.disconnect(); removeEventListener("keydown", esc); removeEventListener("resize", wide); };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        <a href="#top" aria-label="AcquisiFlow home" className="shrink-0">
          <Image src="/acquisiflow-wordmark.png" alt="AcquisiFlow" width={1086} height={362} priority className="h-auto w-28 sm:w-32 dark:brightness-0 dark:invert" />
        </a>
        <nav aria-label="Primary" className="hidden gap-8 text-[15px] lg:flex">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} aria-current={active === n.href.slice(1) ? "true" : undefined} className="py-2 text-body transition-colors hover:text-ink aria-current:text-ink aria-current:underline aria-current:underline-offset-8">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={toggleTheme} aria-label="Switch between light and dark theme" className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-secondary">
            <SunMoon size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <a href="#contact" className="btn hidden min-h-11! px-5! sm:inline-flex">Start a project<ArrowRight size={16} aria-hidden="true" /></a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)} className="grid size-11 place-items-center rounded-full border border-line-strong lg:hidden">
            {open ? <X size={18} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <div className={`${wrap} flex flex-col py-4`}>
            {site.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="display border-b border-line py-4 text-2xl">{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn mt-6">Start a project<ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </nav>
      )}
      <span aria-hidden="true" className="progress absolute inset-x-0 bottom-0 h-0.5 bg-brand" />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className={`${wrap} flex flex-wrap items-end justify-between gap-8`}>
        <div>
          <Image src="/acquisiflow-wordmark.png" alt="AcquisiFlow" width={1086} height={362} className="h-auto w-40 dark:brightness-0 dark:invert" />
          <p className="mt-4 max-w-sm text-[15px] text-body">We build custom software around your business and the way your team works.</p>
        </div>
        <div className="text-[15px] text-body sm:text-right">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all text-ink underline underline-offset-4"><Mail size={16} aria-hidden="true" />{site.email}</a>
          <p className="mt-2 max-w-sm text-sm text-quiet">© {new Date().getFullYear()} AcquisiFlow. We work from the Philippines and serve clients in other countries.</p>
          <a href="#top" className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink underline underline-offset-4">Back to top<ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
# AcquisiFlow rebuild v2: install notes

Extract this zip into the root of your AcquisiFlow project and allow it to overwrite. No new packages are needed. Then run `npm run dev`.

What changed in v2:
- components/sections/hero.tsx: the before/after slider now sits in a dark showcase panel with the brand symbol and proof points.
- components/sections/services.tsx: services are now a grid of illustrative interfaces (operations board, customer portal, booking, dashboards, automation, web platforms).
- components/sections/faq.tsx (new) and app/page.tsx: an FAQ before the contact section.

Everything else is unchanged from v1. Interfaces are labelled as illustrative, and there are no invented clients, testimonials, metrics, or prices. Add real ones as you get them.

Brand: Flow Blue (#3D5AFE) is used in light mode only. Dark mode is monochrome, and the wordmark and symbol turn white using `dark:brightness-0 dark:invert`, so they expect transparent PNGs in /public.

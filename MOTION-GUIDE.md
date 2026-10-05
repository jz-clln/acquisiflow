# AcquisiFlow Motion Guide

The website is intentionally motion-rich, but the motion still follows one rule:

> **Motion should communicate complexity becoming clarity.**

## 1. Global experience

`components/motion/page-experience.tsx`

Handles:
- branded first-load transition
- scroll progress bar
- desktop pointer glow

The loader is deliberately short. Do not turn it into a multi-second splash screen.

## 2. Hero choreography

`components/animations/hero-copy.tsx`
`components/animations/system-scene.tsx`

Sequence:
1. page loader introduces the brand
2. hero headline enters word-by-word
3. dashboard assembles
4. disconnected workflow cards appear
5. SVG connections draw toward the system
6. metrics and workflow rows resolve
7. satellite cards begin very subtle idle motion

This is the main visual statement of the landing page.

## 3. Scroll reveals

`components/motion/reveal.tsx`

Use for section-level content. It combines:
- opacity
- transform
- light blur

Do not wrap every tiny UI element in a reveal. Animate groups instead.

## 4. Interactive motion

`components/motion/tilt-card.tsx`
`components/motion/magnetic-link.tsx`

Tilt is desktop-only by design. Magnetic movement is deliberately small. These effects should be felt, not become a game.

## 5. SVG / workflow motion

`components/animations/operation-map.tsx`

Path-drawing animation is used when motion communicates flow or connection. This visual language can be reused later for real case studies.

## 6. Native CSS vs Anime.js

Use Anime.js for:
- sequenced entrances
- path drawing
- multi-element choreography
- controlled idle motion
- spring-back interactions

Use CSS for:
- color changes
- simple hover states
- border transitions
- small scale/translate effects
- the marquee

## 7. Accessibility

`hooks/use-reduced-motion.ts` and the global CSS media query honor `prefers-reduced-motion`.

Every new complex animation should have a readable static state when reduced motion is enabled.

## 8. Performance rules

Prefer animating:
- opacity
- transform
- SVG stroke dash offset
- filter only for short entrance effects

Avoid continuous animation of layout properties such as width, height, margin, left, and top.

## 9. Brand timing

Typical AcquisiFlow timing:
- microinteraction: 200–350ms
- hover return: 400–650ms
- section reveal: 650–850ms
- major hero choreography: 700–1100ms per stage

The feeling should be **confident and engineered**, never frantic.

# AcquisiFlow website

Next.js (App Router), Tailwind CSS v4, TypeScript.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_SITE_URL` and `CONTACT_EMAIL` in `.env.local` (see `.env.example`).

Copy lives in `components/sections.tsx`. Site name, email, and nav live in `lib/site.ts`. Colors are tokens in `app/globals.css`.

## Animations

Remotion compositions live in `components/scenes.tsx` and play inline through `@remotion/player` (`components/scene.tsx`). They read the theme tokens in `app/globals.css`, so light and dark mode need no extra work. Playback pauses off screen and stops for visitors who prefer reduced motion. `remotion` and `@remotion/player` must stay on the same exact version. Check the Remotion license terms for your company size.

## Contact form

`app/api/contact/route.ts` validates the message and sends it through Resend. Set `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local`. Without a key the form shows a message that points visitors to the email address.

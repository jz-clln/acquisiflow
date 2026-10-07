# AcquisiFlow concept previews

## Purpose and boundaries

Use **`/p/[business]`** for short, unofficial client website concept links, for example `https://acquisiflow.com/p/santos`. There is no `/preview/` route and no preview directory/listing page. The only registered business is the fictional **Demo Dental Studio**, at `/p/demo`.

All feature code, data, documentation, and tests live in this folder. No new packages, global styles, root metadata, favicons, homepage components, or Next.js configuration are required. The host currently uses Next.js 16.3.8 App Router, strict TypeScript, Tailwind CSS 4, and npm. Lucide and Simple Icons already exist, but the infrastructure does not need icons.

## Folder map

```text
p/
  [business]/page.tsx                 Route, metadata and automatic wrappers
  layout.tsx                         Mandatory noindex policy for this subtree
  not-found.tsx                      Unavailable-link message
  _businesses/demo/business.ts        Fictional data only
  _businesses/demo/Website.tsx         Intentionally plain routing demo
  _components/PreviewNotice.tsx       Automatic unofficial-preview disclosure
  _components/AcquisiFlowOwnerCTA.tsx  Automatic, separate owner contact section
  _lib/types.ts                      Data and component contracts
  _lib/registry.ts                    Explicit slug -> data/component mapping
  _lib/get-business.ts                Safe lookup and slug validation
  _lib/settings.ts                    Studio name, URL and contact URL
  _lib/metadata.ts                    Preview metadata and fixed robots rules
  _tests/                            Isolated Playwright checks and configuration
```

Underscore folders are private Next.js implementation folders, not URL segments. Keep new helpers, images, styles and components beneath them. Do not accidentally add routable `page.tsx` files for business implementations.

## Adding a prospect (Claude handoff)

1. Choose the shortest recognizable available slug, such as `santos`.
2. Create `_businesses/santos/business.ts` and `_businesses/santos/Website.tsx`.
3. Put only supplied/verified facts in `business.ts`:

   ```ts
   import type { BusinessPreview } from "../../_lib/types";

   // Illustrative registration only; verify all prospect details before publishing.
   export const business = {
     slug: "santos",
     name: "Santos Clinica Dental",
   } satisfies BusinessPreview;
   ```

4. Custom-design `Website.tsx` for that prospect. Export a default component accepting `BusinessWebsiteProps` and read facts from its `business` prop. It should own one `<main>` and one primary `<h1>`. Do not import factual data directly into the component: the route supplies it, so a future API/data loader can replace local files without rewriting presentation. Add business-local components/CSS Modules if needed.
5. Register it in `_lib/registry.ts`:

   ```ts
   import { business as santosBusiness } from "../_businesses/santos/business";
   import SantosWebsite from "../_businesses/santos/Website";

   // Inside previewRegistry, alongside demo:
   santos: { business: santosBusiness, Website: SantosWebsite },
   ```

6. Open `/p/santos`, check the disclosure, owner link, metadata and keyboard behavior, and run validation. Rebuild/deploy through the project's usual process to make the link public. This infrastructure does not deploy or send messages.

The registry key must equal `business.slug`. Registration imports are explicit; there is no filesystem loader. Unknown and invalid slugs return `notFound()`. No additional route file is needed for each business.

## Design responsibility

**Claude designs each prospect's website independently. Do not copy the fictional demo or automatically reuse another client's website.** There is no shared client template, hero, navbar, gallery, typography system, marketing layout or animation system here. The demo proves plumbing only. `business.ts` contains facts; `Website.tsx` contains presentation. Do not put client hooks/interactivity in the common route. Prefer Server Components; add small Client Components only where interaction requires them.

The route automatically renders the notice before the website and the owner CTA afterward. They are outside the client's `<main>` and are not client-business contact details. Do not duplicate, hide or remove them. Presentation may be customized later while keeping their disclosure intact. The owner link is configured once in `_lib/settings.ts`, currently `https://acquisiflow.com/#contact`.

The wrapper's `id="main-content"` is the existing root skip-link target. Do not duplicate this ID. Keep the website's own navigation links and landmarks accessible, and use real links/buttons with visible focus.

## Short slugs

- Lowercase ASCII letters, numbers and single separating hyphens only; no spaces, leading/trailing hyphens, or consecutive hyphens.
- Prefer `/p/santos`, `/p/abc`, `/p/casaverde`, `/p/smileco`.
- Avoid `/p/santos-clinica-dental-calamba-laguna-philippines` and unnecessary words such as clinic, restaurant, resort, company or philippines.
- Use a short location suffix only to resolve a duplicate: `santos-naga`, `santos-cebu`.
- Choose slugs manually. The infrastructure validates syntax but does not generate slugs, rewrite casing, or enforce an arbitrary length cap. Check for existing keys before registering a prospect; each key must be unique.

## Optional facts and safety

Only `slug` and `name` are required. Types support brand/contact details, services, hours, images, team members, testimonials, trust items and business CTAs. Omit unknown fields and skip sections whose data is absent. Empty arrays are fine; there are no invented defaults.

Never invent ratings, reviews, customer counts, services, professionals, credentials, certifications, prices, opening hours, addresses, awards or years in business. Preserve provenance/source URLs when supplied. Do not present a concept as a live or authorized official site. The fictional demo must stay explicitly fictional and must not gain pretend social proof. Do not connect booking, payment or lead-capture actions to real businesses without authorization.

## Metadata and indexing

`generateMetadata` produces a business-specific absolute title ending in `| Concept Website`, a description with an unofficial-preview disclosure, a self-referencing preview canonical, and text-only Open Graph/Twitter metadata. Optional `business.metadata.title` is the title prefix; `business.metadata.description` is additional description text. Neither can configure robots.

Both the preview layout and page metadata enforce **noindex, nofollow**, including a matching Googlebot directive. This replaces the root's production indexing policy for previews. Do not expose a robots override in business data or add a nested metadata route that enables indexing. Do not add preview links to public navigation, the sitemap, or IndexNow submissions. The existing sitemap is an explicit homepage-only registry; it does not discover new routes automatically. Do not block `/p/` in robots.txt: crawlers must be able to read the noindex directive.

**Noindex is not access control.** Anyone with a URL, or who guesses a short slug, can view these pages. Messaging services can fetch the link to generate a preview. Do not store secrets, confidential customer information, or sensitive assets here. Password protection, authentication, expiry, admin tools, databases, CMS, AI generation, lead engines and automatic deployment are not implemented.

## Inherited host behavior and assets

Everything feature-specific is local to `p/`, but this is a nested route in the existing application, not a standalone app. Next.js/React, TypeScript, Tailwind and the root layout are host dependencies. Root global CSS, fonts, theme script, favicon, skip link and `ScrollFx` still apply. The homepage navbar/footer are page-level and do not appear here. The plain demo has no animation targets, but a future custom website using `main section` headings/lists/cards may be picked up by the root scroll effects. Keep this constraint in mind; full CSS/animation isolation would require a separate approved host-level change. Do not edit root files as part of a prospect design. Prefer CSS Modules or styles scoped to the prospect; avoid `html`, `body`, `:root` or other global overrides.

Store future local assets in `_businesses/<slug>/assets/` and use static imports with `next/image` (or a typed imported image's `.src` when passing it into the string-based data schema). Files in `app/p/` are not directly served as `/p/.../assets/...`; use imports, not fabricated public paths. Supply alt text and stable dimensions; decorative images use empty alt text.

The current `next.config.ts` has no remote image allowlist. Do not use remote optimized `next/image` URLs without an approved configuration change. If authorized external assets must be used without changing configuration, an unoptimized image can avoid the optimizer allowlist, but the browser still needs a publicly reachable source and explicit dimensions/alt text. Prefer local imports and respect image usage rights. No images are added by this infrastructure.

## Validation

Existing project commands (run from the repository root):

```sh
npm run typecheck
npm run lint
npm run build
```

Using the already-installed Playwright dependency and browser, run the feature checks without adding a package script:

```sh
npx playwright test --config app/p/_tests/playwright.config.ts
```

The checks launch the production server on port 3101 after a build. They cover server-rendered preview content, mandatory robots/Googlebot directives, unique metadata, wrapper placement, contact link, invalid/unknown slugs and prototype-key lookups, sitemap exclusion, keyboard skip link and hydration errors. Test output stays inside the ignored `_tests/.results/` folder. No external messages are sent.

Before handoff, run `git status --short`: feature changes must all be under `app/p/`. Leave existing unrelated user changes alone. To remove this feature later, remove this folder tree; no external registration was added.

# AcquisiFlow technical SEO pass

Completed 6 October 2026. Changes are local; no deployment or search-engine submission was performed.

## 1. Problems found

- The only public content route is `/`; Services, Process, Lab, About, FAQ and Contact are sections, not separate pages. `/api/contact` is a POST endpoint. No service/industry detail pages exist.
- Missing canonical, structured data, verification settings, Apple icon and error boundary. Social image dimensions did not match the actual asset.
- The canonical origin could be replaced by an environment variable; previews had no explicit indexing guard. Sitemap dates changed on every build without content changes.
- An inline script activated CSS that hid headings/cards until hydration and scroll observation succeeded.
- No animation pause control, no skip link, incomplete mobile-menu focus handling, and muted text on gray surfaces had approximately 4.25:1 contrast.
- Pointer effects did layout reads for each pointer event. Scenes did not explicitly pause when the browser tab was hidden or respond to changing OS motion preferences.
- No lint script/configuration or browser regression checks existed. The footer unnecessarily ran as a Client Component, including its server-configured contact email.

The existing App Router architecture is sound: page content uses Server Components, interactive scenes/forms are client islands, typography uses `next/font`, the page has one H1 and logical headings, and navigation, lists, forms, footer and FAQ already use semantic HTML. Actual animations use Remotion and CSS; Anime.js only appears in historical documentation. No animation library was removed.

## 2. Files changed

- `lib/site.ts`, `lib/seo.ts`: fixed origin, shared copy, indexing policy, metadata helper, schema and public-page registry.
- `app/layout.tsx`, `app/page.tsx`: metadata, verification, schema and skip target.
- `app/robots.ts`, `app/sitemap.ts`: public crawling and canonical route registry.
- `app/apple-icon.tsx`, `app/error.tsx`, `app/not-found.tsx`: existing-symbol Apple icon and branded recovery links.
- `app/globals.css`, `components/fx.tsx`, `components/scene.tsx`: progressive motion, contrast, pointer work and playback lifecycle.
- `components/chrome.tsx`, new `components/footer.tsx`: motion control, focus handling, responsive logo sizes and server-rendered footer.
- `components/sections.tsx`: targeted supporting copy, descriptive FAQ questions, internal section links and consistent Start Your Project CTA.
- `components/seo/structured-data.tsx`: reusable safely serialized JSON-LD.
- `app/api/contact/route.ts`: reject null/non-object JSON and align fallback email with the public site.
- `package.json`, `package-lock.json`, `eslint.config.mjs`, `playwright.config.ts`, `tests/seo.spec.ts`: validation tooling.
- `.env.example`, `.gitignore`, `README.md`, this report: configuration and maintenance guidance.

## 3. Metadata and search intent

Homepage title: **AcquisiFlow | Custom Software Development for Growing Businesses**. Root title template: **%s | AcquisiFlow**. The homepage has its own canonical, description, Open Graph title/description/URL/image/locale and Twitter large-image card. Root metadata adds application name, author, creator, publisher, category, robots and real-token verification hooks. Existing favicon variants remain; the Apple icon renders the original symbol at 180 x 180.

Supporting copy now explicitly describes custom business software, business systems, web applications and workflow automation, with AI only where useful. The H1 and section design remain. Local and international positioning is explicit in the footer. No keyword meta tag or installable-app manifest was added: neither adds useful functionality for this single-page marketing site.

The existing branded social image is reused with its correct 2033 x 774 dimensions. It is wide rather than 1.91:1; check crops in social-platform debuggers after deployment. No new image or fabricated results were introduced. The schema and image description identify the software screens as illustrative.

## 4. Structured data

An Organization and WebSite graph describes the real brand, canonical URL, original logo, Philippines/international service coverage and an OfferCatalog containing Service entries matching visible services. There are no invented founder names, addresses, social profiles, clients, reviews, ratings or statistics. JSON-LD is parsed by the browser regression test and escapes `<` before embedding.

No breadcrumbs are added because there are no nested pages or visible breadcrumbs. No FAQ schema is added: Google removed the FAQ rich-result feature in May 2026 ([official documentation updates](https://developers.google.com/search/updates#may-2026)). The existing accessible FAQ remains useful to buyers.

## 5. Crawling, sitemap and canonicalization

Production robots permits public content, excludes `/api/`, and references `https://acquisiflow.com/sitemap.xml`. The sitemap lists only the homepage, with monthly frequency, priority 1, and an explicit substantive-change date. Update `publicPages` in `lib/seo.ts` when meaningful pages launch; use `pageMetadata` for unique metadata. Fragments, API routes, errors and assets are not sitemap entries.

Next.js normalizes the root canonical to `https://acquisiflow.com` and the sitemap matches it. Query-string variants share that canonical. Default Next.js trailing-slash handling is preserved. No speculative host/protocol redirects were introduced; confirm HTTP and www redirects in the hosting dashboard before changing them.

`VERCEL_ENV=preview`/`development`, local development, or `SITE_NOINDEX=true` produce noindex metadata and an empty sitemap. Preview robots still permits HTML crawling so crawlers can read noindex; it does not advertise the production sitemap. These settings are evaluated at build time. Never promote a preview-built artifact directly to production without rebuilding. Noindex is not access control; use hosting authentication for private staging.

## 6. Performance and accessibility

- Content is visible before hydration. Scroll entrances use transform/opacity only after intersection detection; failure cannot leave SEO content hidden.
- Existing scene aspect ratios, static initial frames, off-screen pausing, reduced-motion and adaptive low-performance behavior remain.
- Playback now pauses in hidden tabs and responds to OS preference changes and a compact header pause/play control. Pointer glow work is limited to one animation frame and skipped for reduced motion, low-performance mode and touch.
- Footer is now server-only; logos use responsive `sizes` and the footer logo remains lazy-loaded. Existing self-hosted `next/font` typography is preserved.
- Added keyboard skip link, Escape focus restoration and focus transfer to selected mobile sections. Small muted text uses a slightly darker token on light surfaces; dark colors remain intact.
- Existing labels, native disclosure FAQ and focus styling remain. A branded error boundary and useful 404 links support recovery.

These are implementation improvements, not measured improvements to field LCP, CLS or INP. Collect deployed mobile field data before making larger animation/bundle changes. No intrusive tracking scripts were installed.

## 7. Validation

Passed: `npm run lint`, `npm run typecheck`, `npm run build`, and all five `npm run test:seo` browser tests. A separate Vercel-preview build was checked for noindex HTML and an empty sitemap; the production build was restored afterward. Mobile and desktop screenshots were generated, with the mobile hero visually reviewed.

Production browser checks cover metadata, JSON-LD syntax, canonical query variants, robots, sitemap, Apple icon, actual 404/noindex response, invalid contact JSON, all fragment links, meaningful content with JavaScript disabled, hydration failure, 390px/1440px layouts, overflow, keyboard focus, light/dark themes, motion controls and live OS reduced-motion updates. They collect browser errors/warnings and save screenshots under ignored `test-results/`. No real contact message is sent.

Source inspection found no tracking scripts, private/test content routes, client access to the Resend key, or generated public browser source maps. Local environment values were not printed or changed. Contact delivery still requires deployment-specific Resend configuration. Rate limiting remains the existing in-memory implementation; shared rate limiting is a separate deployment-hardening task.

The dependency audit reports five high-severity findings in the development-only ESLint dependency chain (`braces` through `micromatch`/`fast-glob`). The offered automatic fix downgrades the Next.js lint configuration incompatibly. Do not run `npm audit fix --force`; track a compatible upstream fix. The reported findings do not affect the production dependency tree.

## 8. Owner actions after review

1. Deploy with `SITE_NOINDEX` unset/false and the correct production environment. Verify the deployed canonical, robots and sitemap.
2. Configure real `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` tokens before building, or use provider DNS verification. Submit the sitemap and inspect the homepage in the webmaster tools.
3. Confirm HTTP-to-HTTPS and www-to-non-www redirects in hosting. Verify that production is publicly reachable and staging protection is enabled where needed.
4. Check the deployed structured data with a schema validator, and the social image in sharing debuggers. Search Console can verify Google rendering/indexability; syntax validation alone does not guarantee rich-result eligibility.
5. Confirm the contact inbox, sender domain and Resend delivery. No real emails were sent in this pass.
6. If analytics are wanted, add one chosen provider through a small component in `app/layout.tsx` with real configuration and applicable consent handling. Do not add overlapping GA4/Clarity/Vercel scripts by default. Search Console verification needs no tracking JavaScript.

## 9. Next content priorities

Create substantial pages only when their copy and examples are ready:

1. `/services/custom-software`: workflows covered, discovery, deliverables, integrations, ownership, support and project-fit guidance.
2. `/industries/field-services` and `/industries/construction`: specific scheduling/site/materials workflows, with clearly labeled Lab examples and links into project inquiry.
3. A custom-software-versus-off-the-shelf guide: honest decision criteria and cases where existing SaaS is the better choice.
4. A cost-and-scope guide: actual cost drivers, discovery inputs and approved examples; no invented price promises.
5. A spreadsheet-replacement guide, followed by a distribution/inventory page when concrete workflow material is available.

Keep real case studies for completed, permissioned client work. The current Lab concepts remain explicitly labeled as examples. Technical improvements support discoverability but do not establish ranking gains.

Implementation reference: [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) and [robots file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

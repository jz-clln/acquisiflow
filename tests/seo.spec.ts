import { test, expect } from "@playwright/test";

test("production metadata, crawl files, schema and error status", async ({ request }) => {
  const response = await request.get("/?utm_source=test");
  expect(response.status()).toBe(200);
  const fullHtml = await response.text();
  const html = fullHtml.split("</head>")[0];
  expect(html).toContain('<link rel="canonical" href="https://acquisiflow.com"');
  expect(html).toContain('name="robots" content="index, follow"');
  expect(html).toContain('property="og:image:width" content="2033"');
  expect(fullHtml.includes('Custom software development is our main work')).toBe(true);
  expect(fullHtml.match(/<h1[ >]/g)).toHaveLength(1);
  const schema = JSON.parse(fullHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
  expect(schema["@graph"].map((node: { "@type": string }) => node["@type"])).toEqual(["Organization", "WebSite"]);
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://acquisiflow.com/sitemap.xml");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(1);
  expect(sitemap).toContain("<loc>https://acquisiflow.com</loc>");
  expect((await request.get("/apple-icon")).headers()["content-type"]).toContain("image/png");
  const missing = await request.get("/missing-page");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain('content="noindex"');
  expect((await request.post("/api/contact", { data: null })).status()).toBe(400);
});

test("content and links remain usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3100");
  for (const heading of await page.locator("main h1, main h2, main h3").all()) {
    await expect(heading).toBeVisible();
    await expect(heading).toHaveCSS("opacity", "1");
  }
  for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!))) {
    expect(await page.locator(href).count()).toBe(1);
  }
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  await context.close();
});

for (const width of [390, 1440]) {
  test(`layout, keyboard, theme and motion at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (["error", "warning"].includes(message.type())) errors.push(message.text()); });
    await page.goto("/?perf=high");
    await expect(page.locator("#top .rise-2")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: `test-results/hero-${width}.png` });
    await page.keyboard.press("Tab");
    await expect(page.getByText("Skip to content", { exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    if (width < 1024) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "Services", exact: true }).focus();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "Services", exact: true }).click();
      await expect(page.locator("#services")).toBeFocused();
    }
    await page.getByRole("button", { name: "Pause animations" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
    await page.getByRole("button", { name: "Play animations" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
    await page.getByRole("button", { name: "Switch between light and dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    for (const section of await page.locator("main section").all()) {
      await section.scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("failed hydration does not hide content", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", route => route.abort());
  await page.goto("/");
  await expect(page.locator("#services h2")).toHaveCSS("opacity", "1");
  await expect(page.locator("#about h2")).toHaveCSS("opacity", "1");
});

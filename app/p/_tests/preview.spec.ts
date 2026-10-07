import { expect, test } from "@playwright/test";
import { getBusiness } from "../_lib/get-business";
import { createPreviewMetadata } from "../_lib/metadata";

test("lookup only accepts registered business keys", () => {
  expect(getBusiness("demo")?.business.name).toBe("Demo Dental Studio");
  for (const slug of ["constructor", "toString", "__proto__", "missing", "Demo", "demo--x", "../demo"]) {
    expect(getBusiness(slug)).toBeUndefined();
  }
});

test("business metadata supports copy but cannot override robots", () => {
  const metadata = createPreviewMetadata({ slug: "test", name: "Test", metadata: { title: "Custom title", description: "Supplied description" } });
  expect(metadata.title).toEqual({ absolute: "Custom title | Concept Website" });
  expect(metadata.description).toContain("Supplied description");
  expect(metadata.description).toContain("Unofficial concept");
  expect(metadata.robots).toEqual({ index: false, follow: false, googleBot: { index: false, follow: false } });
});

test("server output includes preview metadata and remains outside the sitemap", async ({ request }) => {
  const response = await request.get("/p/demo");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html.includes('<meta name="robots" content="noindex, nofollow"')).toBe(true);
  expect(html.includes('<meta name="googlebot" content="noindex, nofollow"')).toBe(true);
  expect(html.includes("<title>Demo Dental Studio | Concept Website</title>")).toBe(true);
  expect(html.includes('href="https://acquisiflow.com/p/demo"')).toBe(true);
  expect(html.includes("Website design has not been created yet.")).toBe(true);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/p/");
});

test("unknown slugs return HTTP 404", async ({ request }) => {
  for (const path of ["/p/missing", "/p/constructor", "/p/Demo", "/p/demo--x", "/p/demo/extra"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    expect((await response.text()).includes("noindex")).toBe(true);
  }
});

test("notice and owner CTA surround the independent website without client errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/p/demo");
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Demo Dental Studio");
  await expect(page.getByRole("complementary", { name: "Unofficial preview notice" })).toContainText("unofficial preview");
  await expect(page.getByRole("complementary", { name: "For the business owner" })).toContainText("Demo Dental Studio");
  await expect(page.getByRole("link", { name: "Talk to AcquisiFlow" })).toHaveAttribute("href", "https://acquisiflow.com/#contact");
  expect(await page.locator("#main-content").evaluate(el => [...el.children].map(child => child.tagName))).toEqual(["ASIDE", "MAIN", "ASIDE"]);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(errors).toEqual([]);
});

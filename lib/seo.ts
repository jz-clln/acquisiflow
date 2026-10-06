import type { Metadata } from "next";
import { site } from "@/lib/site";

// Preview and development builds never opt into indexing.
export const isIndexable = process.env.NODE_ENV === "production"
  && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production")
  && process.env.SITE_NOINDEX !== "true";

// Register real public pages here when launched. Update dates only for substantive changes.
export const publicPages = [{ path: "/", lastModified: "2026-10-06", changeFrequency: "monthly" as const, priority: 1 }];

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, site.url).href;
  const image = { url: "/feat.png", width: 2033, height: 774, alt: "AcquisiFlow: custom software built around your business. Illustrative screens with example data." };
  return {
    title: { absolute: title }, description, alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: "en_US", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${site.url}/#organization`,
      name: site.name, url: site.url, description: site.description,
      logo: `${site.url}/acquisiflow-logo.png`,
      areaServed: [{ "@type": "Country", name: "Philippines" }, "International"],
      hasOfferCatalog: {
        "@type": "OfferCatalog", name: "Custom software services",
        itemListElement: ["Custom software development", "Workflow automation and AI", "Integrations and web platforms"].map(name => ({
          "@type": "Offer", itemOffered: { "@type": "Service", name, url: `${site.url}/#services`, provider: { "@id": `${site.url}/#organization` } },
        })),
      },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: site.url, inLanguage: "en", publisher: { "@id": `${site.url}/#organization` } },
  ],
};

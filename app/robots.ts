import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isIndexable } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, ...(isIndexable ? { sitemap: `${site.url}/sitemap.xml` } : {}) };
}

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isIndexable, publicPages } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexable ? publicPages.map(({ path, ...entry }) => ({ url: path === "/" ? site.url : new URL(path, site.url).href, ...entry })) : [];
}

import { previewRegistry } from "./registry";
import type { BusinessPreviewEntry } from "./types";

export function getBusiness(slug: string): BusinessPreviewEntry | undefined {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return undefined;
  // Prototype property names such as "constructor" are not registered businesses.
  if (!Object.prototype.hasOwnProperty.call(previewRegistry, slug)) return undefined;
  const entry = previewRegistry[slug];
  if (entry.business.slug !== slug) {
    throw new Error(`Preview registry key "${slug}" must match business.slug.`);
  }
  return entry;
}

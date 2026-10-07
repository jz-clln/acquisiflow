import type { Metadata } from "next";
import type { BusinessPreview } from "./types";
import { previewSettings } from "./settings";

// Infrastructure policy, never read from business configuration or environment.
export const previewRobots = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
} satisfies Metadata["robots"];

export function createPreviewMetadata(business: BusinessPreview): Metadata {
  const title = `${business.metadata?.title ?? business.name} | Concept Website`;
  const context = business.metadata?.description ?? business.description;
  const disclosure = `Unofficial concept website for ${business.name}, created by ${previewSettings.studioName}. Not the business's live website.`;
  const description = context ? `${context} ${disclosure}` : disclosure;
  const url = `${previewSettings.studioUrl}/p/${business.slug}`;

  return {
    title: { absolute: title },
    description,
    robots: previewRobots,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: `${previewSettings.studioName} Concepts`, images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

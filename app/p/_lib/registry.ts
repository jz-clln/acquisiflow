import { business as demoBusiness } from "../_businesses/demo/business";
import DemoWebsite from "../_businesses/demo/Website";
import type { BusinessPreviewEntry } from "./types";

// Register each prospect explicitly. The key must equal business.slug.
export const previewRegistry: Readonly<Record<string, BusinessPreviewEntry>> = {
  demo: { business: demoBusiness, Website: DemoWebsite },
};

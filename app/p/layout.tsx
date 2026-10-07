import type { Metadata } from "next";
import type { ReactNode } from "react";
import { previewRobots } from "./_lib/metadata";

// Applies even to unregistered paths within /p; business data cannot enable indexing.
export const metadata: Metadata = { robots: previewRobots };

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children;
}

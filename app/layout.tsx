import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { isIndexable } from "@/lib/seo";
import { site } from "@/lib/site";
import { ScrollFx } from "@/components/fx";

const sans = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "AcquisiFlow | Custom Software Development for Growing Businesses", template: "%s | AcquisiFlow" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Software development",
  robots: isIndexable ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } } : { index: false, follow: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  icons: {
    // Keep a stable favicon URL in server HTML for browsers and search crawlers.
    icon: [{ url: "/icon.png", type: "image/png", sizes: "1254x1254" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" }
  ]
};

// Runs before first paint: theme, a performance tier (data-perf "low" | "high") and a motion mode (data-motion "reduce" | "full").
// Test with ?perf=low|high and ?motion=on|off in the URL.
const themeScript = `try{var t=localStorage.getItem('af-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}
try{var n=navigator,c=n.connection||{},q=/[?&]perf=(low|high)/.exec(location.search),m=/[?&]motion=(on|off)/.exec(location.search),low=!!c.saveData||/^(slow-)?[23]g$/.test(c.effectiveType||'')||(n.deviceMemory>0&&n.deviceMemory<=2),d=document.documentElement.dataset;d.perf=q?q[1]:low?'low':'high';d.motion=m?(m[1]==='on'?'full':'reduce'):matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'full'}catch(e){document.documentElement.dataset.perf='high';document.documentElement.dataset.motion='full'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body suppressHydrationWarning className={`${sans.variable} ${display.variable}`}><a href="#main-content" className="skip-link">Skip to content</a>{children}<ScrollFx /></body>
    </html>
  );
}

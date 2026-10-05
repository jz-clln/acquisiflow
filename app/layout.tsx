import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ScrollFx } from "@/components/fx";

const sans = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"] });
const title = "AcquisiFlow | Custom software built around your business";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | AcquisiFlow" },
  description: site.description,
  icons: { icon: "/acquisiflow-symbol.png" },
  openGraph: { title, description: site.description, url: site.url, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title, description: site.description }
};
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f7f9" }, { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" }]
};

// Runs before first paint: theme, a performance tier (data-perf "low" | "high") and a motion mode (data-motion "reduce" | "full").
// Test with ?perf=low|high and ?motion=on|off in the URL.
const themeScript = `try{var t=localStorage.getItem('af-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}
try{var n=navigator,c=n.connection||{},q=/[?&]perf=(low|high)/.exec(location.search),m=/[?&]motion=(on|off)/.exec(location.search),apple=/iPhone|iPad|iPod/.test(n.userAgent)||(n.platform==='MacIntel'&&n.maxTouchPoints>1),low=!!c.saveData||/^(slow-)?[23]g$/.test(c.effectiveType||'')||(n.deviceMemory>0&&n.deviceMemory<=2)||(!apple&&n.hardwareConcurrency>0&&n.hardwareConcurrency<=2),d=document.documentElement.dataset;d.perf=q?q[1]:low?'low':'high';d.motion=m?(m[1]==='on'?'full':'reduce'):matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'full'}catch(e){document.documentElement.dataset.perf='high';document.documentElement.dataset.motion='full'}
document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${sans.variable} ${display.variable}`}>{children}<ScrollFx /></body>
    </html>
  );
}
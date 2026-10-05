// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--background)",
        ink: "var(--foreground)",
        body: "var(--secondary)",
        quiet: "var(--muted)",
        line: { DEFAULT: "var(--border)", strong: "var(--border-strong)" },
        brand: { DEFAULT: "var(--brand)", dark: "var(--brand-dark)", soft: "var(--brand-soft)" },
        "on-brand": "var(--on-brand)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: { DEFAULT: "var(--surface)", foreground: "var(--foreground)" },
        primary: { DEFAULT: "var(--brand)", foreground: "var(--on-brand)" },
        secondary: { DEFAULT: "var(--surface-soft)", foreground: "var(--foreground)" },
        muted: { DEFAULT: "var(--surface-soft)", foreground: "var(--muted)" },
        accent: { DEFAULT: "var(--brand-soft)", foreground: "var(--brand-dark)" },
        border: "var(--border)",
        ring: "var(--brand)"
      },
      fontFamily: {
        sans: ["var(--font-instrument)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-instrument)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

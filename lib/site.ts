export const site = {
  name: "AcquisiFlow",
  description: "AcquisiFlow is a small custom software studio in the Philippines. We build business systems around the way your team works.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://acquisiflow.com",
  email: process.env.CONTACT_EMAIL ?? "hello@acquisiflow.com",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Lab", href: "#lab" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" }
  ]
};

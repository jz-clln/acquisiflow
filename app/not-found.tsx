import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto grid min-h-screen max-w-xl place-content-center gap-6 px-6 text-center">
      <h1 className="display text-5xl">Page not found</h1>
      <p className="text-body">The page you asked for does not exist.</p>
      <Link href="/" className="btn mx-auto">Back to the homepage</Link>
    <Link href="/#services" className="underline underline-offset-4">Explore our services</Link>
      <Link href="/#contact" className="underline underline-offset-4">Start Your Project</Link>
    </main>
  );
}

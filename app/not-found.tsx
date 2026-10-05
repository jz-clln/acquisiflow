import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-screen max-w-xl place-content-center gap-6 px-6 text-center">
      <h1 className="display text-5xl">Page not found</h1>
      <p className="text-body">The page you asked for does not exist.</p>
      <Link href="/" className="btn mx-auto">Back to the homepage</Link>
    </main>
  );
}

"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto grid min-h-screen max-w-xl place-content-center gap-6 px-6 text-center">
      <h1 className="display text-5xl">Something went wrong</h1>
      <p className="text-body">Please try again, or return to the homepage to get in touch.</p>
      <button type="button" onClick={reset} className="btn mx-auto">Try again</button>
      <Link href="/" className="underline underline-offset-4">Back to the homepage</Link>
    </main>
  );
}

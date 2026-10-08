import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata(
  "Privacy Policy | AcquisiFlow",
  "How the AcquisiFlow website handles contact inquiries, technical information, and browser preferences.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Link href="/" className="underline underline-offset-4">Back to AcquisiFlow</Link>
      <h1 className="display mt-8 text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-body">Updated October 8, 2026</p>
      <p className="mt-6 text-body">This notice describes information handled through the AcquisiFlow website and its project inquiry form.</p>

      <section className="mt-8">
        <h2 className="display text-2xl">Contact inquiries</h2>
        <p className="mt-3 text-body">When you contact us through the form, you provide your name, email address, and message. The form sends those details to our contact inbox through Resend, our email delivery provider, so we can receive and respond to your inquiry. Information you include in an email is also available to the email services involved in delivering it.</p>
        <p className="mt-3 text-body">Please include only information needed to discuss your project. Do not submit passwords, payment details, or confidential customer records through the inquiry form.</p>
      </section>

      <section className="mt-8">
        <h2 className="display text-2xl">Technical information</h2>
        <p className="mt-3 text-body">Requests to the website include technical information such as an IP address and browser request headers. The contact endpoint uses an IP address and request timestamps to limit repeated submissions. Hosting and email providers process request and delivery information as part of operating their services.</p>
      </section>

      <section className="mt-8">
        <h2 className="display text-2xl">Browser preferences</h2>
        <p className="mt-3 text-body">The website saves your light or dark theme preference in your browser&apos;s local storage under the key <code>af-theme</code>. You can remove it by clearing this website&apos;s site data in your browser.</p>
      </section>

      <section className="mt-8">
        <h2 className="display text-2xl">Privacy questions and requests</h2>
        <p className="mt-3 text-body">To ask about information you sent us, request a correction or deletion, or discuss how your inquiry is handled, contact <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>. Please identify the inquiry you are referring to without sending additional sensitive information.</p>
      </section>
    </main>
  );
}

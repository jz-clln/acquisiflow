"use client";

import { Check, Copy, LoaderCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy email");
  async function copy() {
    try { await navigator.clipboard.writeText(email); setLabel("Copied"); } catch { setLabel("Press and hold to copy"); }
    window.setTimeout(() => setLabel("Copy email"), 2200);
  }
  return <button type="button" onClick={copy} className="btn btn-line">{label === "Copied" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}{label}</button>;
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Try again.");
      form.reset(); setState("sent"); setNote("Thanks. We will reply by email.");
    } catch (err) {
      setState("error"); setNote(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4" noValidate={false}>
      <label className="grid grid-cols-1 gap-1.5 text-sm text-body">Name
        <input name="name" required minLength={2} autoComplete="name" className="field" />
      </label>
      <label className="grid grid-cols-1 gap-1.5 text-sm text-body">Email
        <input name="email" type="email" required autoComplete="email" className="field" />
      </label>
      <label className="grid grid-cols-1 gap-1.5 text-sm text-body">What has your business outgrown?
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} className="field resize-y" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <button type="submit" disabled={state === "sending"} className="btn w-full sm:w-fit">{state === "sending" ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}{state === "sending" ? "Sending..." : "Send message"}</button>
      <p role="status" aria-live="polite" className={`min-h-6 text-sm ${state === "error" ? "text-ink font-medium" : "text-body"}`}>{note}</p>
    </form>
  );
}
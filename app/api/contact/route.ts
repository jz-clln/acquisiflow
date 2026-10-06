import { NextResponse } from "next/server";

const hits = new Map<string, number[]>();
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  if (recent.length >= 5) return fail("Too many messages. Try again in a few minutes.", 429);
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return fail("Invalid request.", 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail("Invalid request.", 400);
  if (body.company) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 5000) {
    return fail("Check your name, email, and message.", 400);
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? "support@acquisiflow.com";
  if (!key) return fail(`Email delivery is not set up yet. Write to ${to} instead.`, 503);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.CONTACT_FROM ?? "AcquisiFlow <onboarding@resend.dev>", to, reply_to: email, subject: `AcquisiFlow inquiry from ${name}`, text: `${name} <${email}>\n\n${message}` })
  });
  return res.ok ? NextResponse.json({ ok: true }) : fail("Could not send. Try again or email us.", 502);
}

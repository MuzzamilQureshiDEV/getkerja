"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { sendEmail } from "../email";
import { rateLimit } from "../security";
import { SITE } from "../constants";
import type { ActionState } from "../types";
import { contactSchema, fieldErrors, formObject, newsletterSchema } from "../validation";
import { LOCALES, type Locale } from "../i18n";

export async function contactAction(_: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse(formObject(fd));
  if (!parsed.success) {
    const fe = fieldErrors(parsed.error);
    // Honeypot tripped: pretend success so bots learn nothing.
    if (fe.company) return { ok: true, message: "Thanks! We'll get back to you within 1 business day." };
    return { ok: false, fieldErrors: fe };
  }
  // Humans take more than 3s to fill a form.
  if (Date.now() - parsed.data.startedAt < 3000) {
    return { ok: false, message: "That was quick! Please wait a moment and submit again." };
  }
  if (!(await rateLimit("contact", 3, 10 * 60_000))) {
    return { ok: false, message: "Too many messages. Please try again in a few minutes." };
  }
  // TODO(prod): verify Cloudflare Turnstile / reCAPTCHA token here — see README.
  const { name, email, topic, message } = parsed.data;
  db.messages.add({ name, email, topic, message });
  const sent = await sendEmail({ to: SITE.email, replyTo: email, subject: `[Contact:${topic}] ${name}`, text: `${name} <${email}>\n\n${message}` });
  if (!sent.ok) {
    return { ok: false, message: `We couldn’t send your message just now. Please email us directly at ${SITE.email}.` };
  }
  return { ok: true, message: "Thanks! We'll get back to you within 1 business day." };
}

export async function newsletterAction(_: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = newsletterSchema.safeParse(formObject(fd));
  if (!parsed.success) {
    const fe = fieldErrors(parsed.error);
    if (fe.website) return { ok: true, message: "You're subscribed!" };
    return { ok: false, message: fe.email?.[0] ?? "Enter a valid email" };
  }
  if (!(await rateLimit("newsletter", 5, 10 * 60_000))) return { ok: false, message: "Please try again later." };
  const added = db.newsletter.add(parsed.data.email);
  return { ok: true, message: added ? "You're subscribed! Watch your inbox for weekly job picks." : "You're already subscribed." };
}

export async function setLocaleAction(locale: Locale) {
  if (!LOCALES.includes(locale)) return;
  (await cookies()).set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  revalidatePath("/", "layout");
}

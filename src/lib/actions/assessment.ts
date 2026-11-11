"use server";

import { sendEmail } from "../email";
import { rateLimit } from "../security";
import { SITE, categoryName } from "../constants";
import type { ActionState } from "../types";
import { assessmentSchema, fieldErrors, formObject } from "../validation";

type Submitted = { email: string };

/**
 * Candidate assessment → email to the recruitment inbox (Reply-To = candidate, so the
 * team can reply with the interview link) plus a short confirmation to the candidate.
 */
export async function assessmentAction(_: ActionState<Submitted>, fd: FormData): Promise<ActionState<Submitted>> {
  const parsed = assessmentSchema.safeParse({ ...formObject(fd), equipment: fd.getAll("equipment") });
  if (!parsed.success) {
    const fe = fieldErrors(parsed.error);
    if (fe.website) return { ok: false, message: "Something went wrong. Please try again." }; // honeypot
    return { ok: false, fieldErrors: fe, message: "Please fix the highlighted fields." };
  }
  if (!(await rateLimit("assessment", 10, 60 * 60_000))) {
    return { ok: false, message: "You've sent several forms recently. Please try again later." };
  }
  const d = parsed.data;

  const text = [
    `New candidate assessment — ${d.name}`,
    "",
    `Name:                ${d.name}`,
    `Email:               ${d.email}`,
    `Phone:               ${d.phone}`,
    `Based in:            ${d.location}`,
    `Time in Malaysia:    ${d.timeInMalaysia}`,
    `Student:             ${d.student}`,
    `Highest education:   ${d.education}`,
    `English level:       ${d.english}`,
    `Interested in:       ${categoryName(d.role)}`,
    `Hours per week:      ${d.hours}`,
    `Has:                 ${d.equipment.length ? d.equipment.join(", ") : "None selected"}`,
    `Best interview time: ${d.interviewTime}`,
    "",
    "Anything else:",
    d.notes || "(none)",
    "",
    "→ Reply to this email to send the candidate their assessment interview link (it goes straight to them).",
  ].join("\n");

  const sent = await sendEmail({ to: SITE.applicationsEmail, replyTo: d.email, subject: `Assessment: ${d.name} — ${categoryName(d.role)}`, text });
  if (!sent.ok) {
    return { ok: false, message: `We couldn't send your form just now. Please try again, or email us at ${SITE.applicationsEmail}.` };
  }

  await sendEmail({
    to: d.email,
    replyTo: SITE.applicationsEmail,
    subject: "Your candidate assessment has been received",
    text: [
      `Hi ${d.name},`,
      "",
      "Thanks for completing your candidate assessment with getKerja.",
      `You'll receive your assessment interview meeting link by email from ${SITE.applicationsEmail}. Please keep an eye on your inbox (and spam folder).`,
      "",
      `— The ${SITE.name} team`,
    ].join("\n"),
  });

  return { ok: true, data: { email: d.email } };
}

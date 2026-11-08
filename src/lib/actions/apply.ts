"use server";

import { db } from "../db";
import { sendEmail } from "../email";
import { rateLimit, validateCv } from "../security";
import { EXPERIENCE_LEVELS, FEE_TEXT, JOB_TYPES, SAMPLE_JOBS, SELECTION, SITE, labelOf } from "../constants";
import { formatRM } from "../format";
import type { ActionState } from "../types";
import { applicationSchema, fieldErrors, formObject } from "../validation";

type Applied = { jobTitle: string; email: string };

/**
 * Candidate application → two emails:
 *  1. To the recruitment inbox (SITE.applicationsEmail) with the CV attached and
 *     Reply-To set to the candidate, so the team can reply with a Google Meet link.
 *  2. A confirmation to the candidate.
 * No account and no database needed.
 */
export async function applyAction(_: ActionState<Applied>, fd: FormData): Promise<ActionState<Applied>> {
  const parsed = applicationSchema.safeParse(formObject(fd));
  const cv = await validateCv(fd.get("cv") as File | null);
  if (!parsed.success || !cv.ok) {
    const fe = parsed.success ? {} : fieldErrors(parsed.error);
    if (fe.website) return { ok: false, message: "Something went wrong. Please try again." }; // honeypot
    if (!cv.ok) fe.cv = [cv.error];
    return { ok: false, fieldErrors: fe, message: "Please fix the highlighted fields." };
  }
  if (!(await rateLimit("apply", 10, 60 * 60_000))) {
    return { ok: false, message: "You've sent several applications recently. Please try again later." };
  }
  const d = parsed.data;
  const job = db.jobs.byId(d.jobId);
  if (!job || job.status !== "active") return { ok: false, fieldErrors: { jobId: ["This job is no longer open. Please choose another."] } };

  const salary = typeof d.expectedSalary === "number" ? `${formatRM(d.expectedSalary)} / month` : "Not stated";
  const recruiterText = [
    `New application: ${job.title} — ${job.company.name}`,
    `(${labelOf(JOB_TYPES, job.type)} · ${labelOf(EXPERIENCE_LEVELS, job.experience)} · Remote)`,
    "",
    `Name:            ${d.name}`,
    `Email:           ${d.email}`,
    `Phone:           ${d.phone}`,
    `Based in:        ${d.location}`,
    `Expected salary: ${salary}`,
    `Notice period:   ${d.noticePeriod || "Not stated"}`,
    `LinkedIn:        ${d.linkedin || "—"}`,
    "",
    "Cover letter:",
    d.coverLetter || "(none)",
    "",
    `CV attached: ${cv.name}`,
    "",
    "→ Reply to this email to invite the candidate to an interview (it goes straight to them).",
    `Job page: ${SITE.url}/jobs/${job.slug}`,
  ].join("\n");

  const sent = await sendEmail({
    to: SITE.applicationsEmail,
    replyTo: d.email,
    subject: `Application: ${job.title} — ${d.name}`,
    text: recruiterText,
    attachments: [{ filename: cv.name, content: cv.bytes }],
  });
  if (!sent.ok) {
    return { ok: false, message: `We couldn't send your application just now. Please try again, or email your CV to ${SITE.applicationsEmail}.` };
  }

  await sendEmail({
    to: d.email,
    replyTo: SITE.applicationsEmail,
    subject: `We've received your application — ${job.title}`,
    text: [
      `Hi ${d.name},`,
      "",
      SAMPLE_JOBS
        ? `Thanks for your interest in remote "${job.title}" roles. The listing you chose was an example, not a live vacancy — we've saved your CV and will only contact you about a real, open role that fits.`
        : `Thanks for applying for the remote role "${job.title}" at ${job.company.name}.`,
      "What happens next:",
      "1. Our recruitment team reviews your CV.",
      "2. If you're shortlisted, we'll reply to this email with a Google Meet link for your online interview.",
      `3. Based on your interview, a selection fee of ${FEE_TEXT} applies to lock in your place in the selection process. We'll confirm the exact amount by email before you pay.`,
      `4. Selected candidates receive their job offer within ${SELECTION.offerDays} working days and start working remotely.`,
      "",
      "Applying is free. Never pay anyone claiming to act for us except through the instructions we email you.",
      "",
      `— The ${SITE.name} team`,
    ].join("\n"),
  });

  return { ok: true, data: { jobTitle: job.title, email: d.email } };
}

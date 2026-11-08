import "server-only";
import nodemailer from "nodemailer";

export type EmailAttachment = { filename: string; content: Uint8Array };
type Mail = { to: string; subject: string; text: string; replyTo?: string; attachments?: EmailAttachment[] };
type Result = { ok: boolean; dev: boolean };

/**
 * Email adapter. Uses, in order of preference:
 *  1. SMTP (e.g. your Hostinger mailbox hr@getkerja.my) — set SMTP_HOST, SMTP_USER, SMTP_PASS
 *  2. Resend — set RESEND_API_KEY
 * In development with neither configured, emails are logged to the console.
 * In production with neither configured, sending fails so forms can show a fallback message.
 */
export async function sendEmail(mail: Mail): Promise<Result> {
  const smtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || `getKerja <${process.env.SMTP_USER || "hr@getkerja.my"}>`;

  if (smtp) return sendViaSmtp(mail, from);
  if (resendKey) return sendViaResend(mail, from, resendKey);

  if (process.env.NODE_ENV === "production") {
    // Never pretend an email was sent in production — the caller shows a fallback message instead.
    console.error(`[email] No SMTP or Resend settings — could not send "${mail.subject}" to ${mail.to}`);
    return { ok: false, dev: false };
  }
  const files = mail.attachments?.map((a) => `${a.filename} (${a.content.byteLength} bytes)`).join(", ");
  console.info(
    `\n[email:dev] to=${mail.to}${mail.replyTo ? ` reply-to=${mail.replyTo}` : ""} subject="${mail.subject}"${files ? `\nattachments: ${files}` : ""}\n${mail.text}\n`,
  );
  return { ok: true, dev: true };
}

let transporter: nodemailer.Transporter | null = null;

async function sendViaSmtp(mail: Mail, from: string): Promise<Result> {
  const port = Number(process.env.SMTP_PORT || 465);
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  try {
    await transporter.sendMail({
      from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      attachments: mail.attachments?.map((a) => ({ filename: a.filename, content: Buffer.from(a.content) })),
    });
    return { ok: true, dev: false };
  } catch (err) {
    console.error("[email] SMTP send failed:", err instanceof Error ? err.message : err);
    return { ok: false, dev: false };
  }
}

async function sendViaResend(mail: Mail, from: string, key: string): Promise<Result> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      reply_to: mail.replyTo,
      attachments: mail.attachments?.map((a) => ({ filename: a.filename, content: Buffer.from(a.content).toString("base64") })),
    }),
  });
  if (!res.ok) console.error("[email] Resend send failed", res.status, await res.text().catch(() => ""));
  return { ok: res.ok, dev: false };
}

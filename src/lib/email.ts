import "server-only";

export type EmailAttachment = { filename: string; content: Uint8Array };

/**
 * Email adapter (Resend REST API). Without RESEND_API_KEY, emails are logged to the
 * server console so you can test the flow locally. Swap the fetch for SES/Postmark/SMTP if preferred.
 */
export async function sendEmail({
  to,
  subject,
  text,
  replyTo,
  attachments,
}: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "getKerja <onboarding@resend.dev>";
  if (!key) {
    const files = attachments?.map((a) => `${a.filename} (${a.content.byteLength} bytes)`).join(", ");
    console.info(
      `\n[email:dev] to=${to}${replyTo ? ` reply-to=${replyTo}` : ""} subject="${subject}"${files ? `\nattachments: ${files}` : ""}\n${text}\n`,
    );
    return { ok: true, dev: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: replyTo,
      attachments: attachments?.map((a) => ({ filename: a.filename, content: Buffer.from(a.content).toString("base64") })),
    }),
  });
  if (!res.ok) console.error("[email] send failed", res.status, await res.text().catch(() => ""));
  return { ok: res.ok, dev: false };
}

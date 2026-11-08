import { z } from "zod";

// Malaysian mobile / landline: +60 or 0 prefix; spaces and dashes allowed.
const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .pipe(z.string().regex(/^(\+?60|0)1\d{7,9}$|^(\+?60|0)[3-9]\d{7,8}$/, "Enter a valid Malaysian phone number, e.g. 012-345 6789"));

const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(120);
const name = z.string().trim().min(2, "Please enter your full name").max(80);

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Please choose the job you're applying for"),
  name,
  email,
  phone,
  location: z.string().trim().min(2, "Which city / state are you based in?").max(80),
  expectedSalary: z.coerce.number().int().min(0).max(200000).optional().or(z.literal("").transform(() => undefined)),
  noticePeriod: z.string().trim().max(40).optional(),
  linkedin: z.string().trim().max(200).optional(),
  coverLetter: z.string().trim().max(4000, "Keep your cover letter under 4,000 characters").optional().default(""),
  consent: z.literal("on", { error: "Please consent so we can process your application" }),
  website: z.string().max(0).optional(), // honeypot
});

export const contactSchema = z.object({
  name,
  email,
  topic: z.enum(["candidate", "employer", "partnership", "media", "other"]),
  message: z.string().trim().min(20, "Please share a bit more detail (20+ characters)").max(3000),
  company: z.string().max(0, "Spam detected").optional(), // honeypot
  startedAt: z.coerce.number(),
});

export const newsletterSchema = z.object({ email, website: z.string().max(0).optional() });

export function fieldErrors(error: z.ZodError) {
  return z.flattenError(error).fieldErrors as Record<string, string[] | undefined>;
}

export function formObject(fd: FormData) {
  const o: Record<string, string> = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string") o[k] = v;
  return o;
}

import { z } from "zod";
import { MY_STATES, NOTICE_PERIODS, OTHER, SALARY_RANGES } from "./constants";
import { formatMyMobile, myMobileDigits } from "./phone";

// Malaysian mobile: 01X-XXX XXXX, or 011/015-XXXX XXXX. Stored as "+60 12-345 6789".
const phone = z
  .string()
  .trim()
  .transform(myMobileDigits)
  .pipe(z.string().regex(/^1(?:[0234689]\d{7}|[15]\d{8}|7\d{7})$/, "Enter a valid Malaysian mobile number, e.g. 12-345 6789"))
  .transform((d) => `+60 ${formatMyMobile(d)}`);

const pick = (list: readonly string[], msg: string) =>
  z.string().trim().max(40).optional().default("").refine((v) => v === "" || v === OTHER || list.includes(v), msg);

const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(120);
const name = z.string().trim().min(2, "Please enter your full name").max(80);

export const applicationSchema = z
  .object({
    jobId: z.string().min(1, "Please choose the job you're applying for"),
    name,
    email,
    phone,
    location: z.enum(MY_STATES, { error: "Choose the state you're based in" }),
    salary: pick(SALARY_RANGES, "Choose a salary range"),
    salaryOther: z.string().trim().max(12).optional().default(""),
    notice: pick(NOTICE_PERIODS, "Choose a notice period"),
    noticeOther: z.string().trim().max(40, "Keep it short, e.g. 6 weeks").optional().default(""),
    linkedin: z.string().trim().max(200).optional(),
    coverLetter: z.string().trim().max(4000, "Keep your cover letter under 4,000 characters").optional().default(""),
    consent: z.literal("on", { error: "Please consent so we can process your application" }),
    website: z.string().max(0).optional(), // honeypot
  })
  .superRefine((d, ctx) => {
    const amount = Number(d.salaryOther.replace(/[,\s]|^RM/gi, ""));
    if (d.salary === OTHER && !(Number.isInteger(amount) && amount >= 500 && amount <= 200000)) {
      ctx.addIssue({ code: "custom", path: ["salaryOther"], message: "Enter a monthly amount in RM, e.g. 3500" });
    }
    if (d.notice === OTHER && d.noticeOther.length < 2) {
      ctx.addIssue({ code: "custom", path: ["noticeOther"], message: "Type your notice period, e.g. 6 weeks" });
    }
  })
  .transform(({ salary, salaryOther, notice, noticeOther, ...d }) => ({
    ...d,
    expectedSalary:
      salary === OTHER ? `RM ${Number(salaryOther.replace(/[,\s]|^RM/gi, "")).toLocaleString("en-MY")} / month` : salary ? `${salary} / month` : "",
    noticePeriod: notice === OTHER ? noticeOther : notice,
  }));

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

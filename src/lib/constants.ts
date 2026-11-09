export const SITE = {
  name: "getKerja",
  tagline: "Remote jobs for Malaysians",
  // Canonical URLs, sitemap and email links. Override with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? "https://getkerja.my" : "http://localhost:3000"),
  description:
    "Find remote jobs open to candidates across Malaysia. Pick a role, send your CV in one simple form, and interview online — no account needed.",
  email: "hr@getkerja.my",
  /** Inbox for new applications (CV attached) and contact-form messages. Override with APPLICATIONS_EMAIL. */
  applicationsEmail: process.env.APPLICATIONS_EMAIL ?? "hr@getkerja.my",
} as const;

/**
 * Selection process terms shown across the site (How it works, Apply page, FAQ, Terms, emails).
 * Change the numbers here and every page updates.
 */
export const SELECTION = {
  feeMin: 50,
  feeMax: 70,
  offerDays: 5,
} as const;
// Non-breaking space + word joiners keep "RM 50–70" on one line.
export const FEE_TEXT = `RM ${SELECTION.feeMin}⁠–⁠${SELECTION.feeMax}`;

/** All roles are remote. Candidates must be based in Malaysia. */
export const REMOTE_LABEL = "Remote · Malaysia";

export const CATEGORIES = [
  { slug: "writing-content", name: "Writing & Content", icon: "PenLine" },
  { slug: "customer-service", name: "Customer Support", icon: "Headset" },
  { slug: "hr-admin", name: "HR & Admin", icon: "Users" },
  { slug: "design-creative", name: "Design & Creative", icon: "Palette" },
  { slug: "healthcare", name: "Healthcare Admin", icon: "HeartPulse" },
  { slug: "education", name: "Education & Tutoring", icon: "GraduationCap" },
  { slug: "it-software", name: "IT & Software", icon: "Code2" },
  { slug: "finance-accounting", name: "Finance & Accounting", icon: "Calculator" },
  { slug: "sales-marketing", name: "Sales & Marketing", icon: "Megaphone" },
  { slug: "engineering", name: "Engineering & CAD", icon: "Cog" },
  { slug: "logistics", name: "Logistics & Supply Chain", icon: "Truck" },
] as const;

/** Experience levels treated as "easy to start" (no or little experience needed). */
export const EASY_LEVELS = ["entry", "junior"] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
] as const;
export type JobType = (typeof JOB_TYPES)[number]["value"];

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry level / Fresh grad" },
  { value: "junior", label: "Junior (1–3 yrs)" },
  { value: "mid", label: "Mid-level (3–5 yrs)" },
  { value: "senior", label: "Senior (5+ yrs)" },
  { value: "manager", label: "Manager / Lead" },
] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]["value"];

export const SALARY_FILTERS = [
  { value: "3000", label: "RM 3,000+" },
  { value: "5000", label: "RM 5,000+" },
  { value: "8000", label: "RM 8,000+" },
  { value: "12000", label: "RM 12,000+" },
] as const;

export const POSTED_FILTERS = [
  { value: "1", label: "Last 24 hours" },
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
  { value: "30", label: "Last 30 days" },
] as const;

export const SORT_OPTIONS = [
  { value: "relevance", label: "Most relevant" },
  { value: "newest", label: "Newest first" },
  { value: "salary", label: "Highest salary" },
] as const;

/** Apply form: where the candidate is based (13 states + 3 federal territories). */
export const MY_STATES = [
  "Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis",
  "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Putrajaya", "Labuan",
] as const;

/** Apply form: expected monthly salary. "other" lets the candidate type an amount. */
export const SALARY_RANGES = [
  "Below RM 2,000", "RM 2,000 – 3,000", "RM 3,000 – 4,000", "RM 4,000 – 5,000",
  "RM 5,000 – 7,000", "RM 7,000 – 10,000", "RM 10,000+", "Negotiable",
] as const;

/** Apply form: notice period. "other" lets the candidate type their own. */
export const NOTICE_PERIODS = ["Immediately", "1 week", "2 weeks", "1 month", "2 months", "3 months"] as const;

export const OTHER = "other";

export const JOBS_PER_PAGE = 8;
// Vercel rejects request bodies over 4.5 MB, so the CV (plus form fields) must stay under that.
export const CV_MAX_MB = 4;
export const CV_MAX_BYTES = CV_MAX_MB * 1024 * 1024;

export function labelOf<T extends { value: string; label: string }>(list: readonly T[], value: string | undefined | null) {
  return list.find((i) => i.value === value)?.label ?? value ?? "";
}
export function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

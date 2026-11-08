import type { CategorySlug, ExperienceLevel, JobType } from "./constants";

export interface Company {
  id: string;
  slug: string;
  name: string;
  industry: string;
  size: string;
  website: string;
  about: string;
  verified: boolean;
  /** Brand colour for generated monogram logos. */
  color: string;
  /** Optional logo image path, e.g. "/logos/lumina.png" in /public. Falls back to a monogram. */
  logo?: string;
  founded?: number;
}

export type JobStatus = "active" | "closed";

/** Every job is remote (open to candidates based anywhere in Malaysia). */
export interface Job {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  category: CategorySlug;
  type: JobType;
  experience: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  salaryHidden?: boolean;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  postedAt: string;
  deadline?: string;
  status: JobStatus;
  featured?: boolean;
  urgent?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "CV Writing" | "Interview Tips" | "Salary Insights" | "Hiring Trends" | "Job Search";
  author: { name: string; role: string };
  publishedAt: string;
  readMinutes: number;
  cover: string;
  body: string; // trusted HTML from CMS (sanitise if user-generated)
}

export type JobWithCompany = Job & { company: Company };

export interface JobSearchParams {
  q?: string;
  category?: string;
  type?: string;
  experience?: string;
  salary?: string;
  posted?: string;
  sort?: string;
  page?: string;
}

export type ActionState<T = undefined> = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  data?: T;
};

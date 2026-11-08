import "server-only";
/**
 * Data access layer. Jobs come from placeholder seed data (src/lib/data/seed.ts);
 * swap these functions for a CMS or database query when you're ready — see README.
 * Applications are NOT stored: they are emailed straight to your recruitment inbox.
 */
import { JOBS_PER_PAGE } from "./constants";
import { buildSeedJobs, seedCompanies } from "./data/seed";
import type { Job, JobSearchParams, JobWithCompany } from "./types";

interface Store {
  jobs: Job[];
  messages: { name: string; email: string; topic: string; message: string; createdAt: string }[];
  newsletter: { email: string; createdAt: string }[];
}

const g = globalThis as unknown as { __getkerjaStore?: Store };
const s: Store = (g.__getkerjaStore ??= { jobs: buildSeedJobs(), messages: [], newsletter: [] });

const withCompany = (j: Job): JobWithCompany => ({ ...j, company: seedCompanies.find((c) => c.id === j.companyId)! });
const sortNewest = (a: Job, b: Job) => +new Date(b.postedAt) - +new Date(a.postedAt);
const activeJobs = () => s.jobs.filter((j) => j.status === "active");

export const db = {
  jobs: {
    active: () => activeJobs().map(withCompany).sort(sortNewest),
    featured: (n = 6) => {
      const act = activeJobs().sort(sortNewest);
      return [...act.filter((j) => j.featured), ...act.filter((j) => !j.featured)].slice(0, n).map(withCompany);
    },
    /** Entry-level / junior roles — "easy to start" jobs for the home page. */
    easy: (n = 6) =>
      activeJobs()
        .filter((j) => j.experience === "entry" || j.experience === "junior")
        .sort((a, b) => Number(b.experience === "entry") - Number(a.experience === "entry") || sortNewest(a, b))
        .slice(0, n)
        .map(withCompany),
    bySlug: (slug: string) => {
      const j = s.jobs.find((x) => x.slug === slug);
      return j ? withCompany(j) : undefined;
    },
    byId: (id: string) => {
      const j = s.jobs.find((x) => x.id === id);
      return j ? withCompany(j) : undefined;
    },
    similar: (job: Job, n = 3) =>
      activeJobs()
        .filter((j) => j.id !== job.id)
        .map((j) => ({ j, score: (j.category === job.category ? 3 : 0) + (j.experience === job.experience ? 1 : 0) }))
        .sort((a, b) => b.score - a.score || sortNewest(a.j, b.j))
        .slice(0, n)
        .map(({ j }) => withCompany(j)),
    countByCategory: () => {
      const m: Record<string, number> = {};
      for (const j of activeJobs()) m[j.category] = (m[j.category] ?? 0) + 1;
      return m;
    },
    search(p: JobSearchParams) {
      const terms = p.q?.trim().toLowerCase().split(/\s+/).filter(Boolean) ?? [];
      const minSalary = p.salary ? Number(p.salary) : 0;
      const postedDays = p.posted ? Number(p.posted) : 0;
      const now = Date.now();
      let rows = activeJobs()
        .map(withCompany)
        .map((j) => {
          let score = 0;
          const title = j.title.toLowerCase();
          const skills = j.skills.join(" ").toLowerCase();
          const rest = `${j.summary} ${j.company.name} ${j.company.industry}`.toLowerCase();
          for (const t of terms) {
            // Match at the start of a word, so "ui" finds "UI Designer" but not "recruit".
            const re = new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
            if (re.test(title)) score += 5;
            if (re.test(skills)) score += 3;
            if (re.test(rest)) score += 1;
          }
          return { j, score };
        })
        .filter(({ j, score }) => {
          if (terms.length && score === 0) return false;
          if (p.category && j.category !== p.category) return false;
          if (p.type && j.type !== p.type) return false;
          if (p.experience && j.experience !== p.experience) return false;
          if (minSalary && (j.salaryMax ?? j.salaryMin ?? 0) < minSalary) return false;
          if (postedDays && now - +new Date(j.postedAt) > postedDays * 86400000) return false;
          return true;
        });

      const sort = p.sort ?? (terms.length ? "relevance" : "newest");
      rows.sort((a, b) => {
        if (sort === "salary") return (b.j.salaryMax ?? 0) - (a.j.salaryMax ?? 0);
        if (sort === "relevance") return b.score - a.score || sortNewest(a.j, b.j);
        return sortNewest(a.j, b.j);
      });

      const total = rows.length;
      const pages = Math.max(1, Math.ceil(total / JOBS_PER_PAGE));
      const page = Math.min(pages, Math.max(1, Number(p.page) || 1));
      rows = rows.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);
      return { items: rows.map((r) => r.j), total, page, pages };
    },
  },

  messages: {
    add(m: { name: string; email: string; topic: string; message: string }) {
      s.messages.push({ ...m, createdAt: new Date().toISOString() });
    },
  },

  newsletter: {
    add(email: string) {
      if (s.newsletter.some((n) => n.email === email)) return false;
      s.newsletter.push({ email, createdAt: new Date().toISOString() });
      return true;
    },
  },
};

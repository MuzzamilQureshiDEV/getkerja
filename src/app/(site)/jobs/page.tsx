import type { Metadata } from "next";
import Link from "next/link";
import { SearchX, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobRow } from "@/components/jobs/job-card";
import { JobFilters, JobFiltersSidebar } from "@/components/jobs/job-filters";
import { Pagination } from "@/components/jobs/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHero } from "@/components/shared/page-hero";
import { categoryName } from "@/lib/constants";
import { db } from "@/lib/db";
import type { JobSearchParams } from "@/lib/types";

const KEYS: (keyof JobSearchParams)[] = ["q", "category", "type", "experience", "salary", "posted", "sort", "page"];

async function parse(searchParams: PageProps<"/jobs">["searchParams"]): Promise<JobSearchParams> {
  const sp = await searchParams;
  const out: JobSearchParams = {};
  for (const k of KEYS) {
    const v = sp[k];
    const s = Array.isArray(v) ? v[0] : v;
    if (s) out[k] = s.slice(0, 100);
  }
  return out;
}

export async function generateMetadata({ searchParams }: PageProps<"/jobs">): Promise<Metadata> {
  const p = await parse(searchParams);
  const parts = [p.q, p.category && categoryName(p.category)].filter(Boolean).join(" ");
  const title = `Remote ${parts ? `${parts} ` : ""}Jobs in Malaysia`;
  return {
    title,
    description: `Browse the latest remote ${parts || ""} jobs open to candidates across Malaysia. Filter by category, salary and job type, then apply with your CV in minutes.`,
    alternates: { canonical: "/jobs" },
  };
}

export default async function JobsPage({ searchParams }: PageProps<"/jobs">) {
  const params = await parse(searchParams);
  const result = db.jobs.search(params);

  const buildHref = (page: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...params, page: page > 1 ? String(page) : undefined })) if (v) sp.set(k, v);
    return `/jobs${sp.size ? `?${sp}` : ""}`;
  };

  return (
    <>
      <PageHero
        eyebrow="100% remote"
        title={<>Remote roles we <span className="text-gradient">recruit for</span></>}
        description="Pick the kind of remote work that suits you and send your CV in 2 minutes — no account needed. We’ll contact you when a real opening matches."
      />
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <JobFiltersSidebar params={params} />
        </div>
        <div className="min-w-0">
          <JobFilters params={params} total={result.total} />
          <p className="mt-6 mb-4 text-sm text-muted-foreground" role="status" aria-live="polite">
            Showing <strong className="text-foreground">{result.total}</strong> {result.total === 1 ? "role" : "roles"}
            {result.pages > 1 && <> · Page {result.page} of {result.pages}</>}
          </p>

          {result.items.length ? (
            <ul className="flex flex-col gap-4">
              {result.items.map((j) => (
                <li key={j.id}><JobRow job={j} /></li>
              ))}
            </ul>
          ) : (
            <EmptyState
              Icon={SearchX}
              title="No jobs match your search… yet"
              description="Try removing a filter or using a broader keyword like “engineer” or “admin”. New remote jobs are added every day — or send us your CV anyway."
            >
              <Button asChild><Link href="/jobs">Clear all filters</Link></Button>
              <Button asChild variant="outline"><Link href="/apply"><Send /> Send your CV</Link></Button>
            </EmptyState>
          )}

          <Pagination page={result.page} pages={result.pages} buildHref={buildHref} />
        </div>
      </div>
    </>
  );
}

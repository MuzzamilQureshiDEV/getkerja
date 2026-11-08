import Link from "next/link";
import { Briefcase, Globe2, Send, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/shared/category-icon";
import { CATEGORIES, JOB_TYPES, REMOTE_LABEL, categoryName, labelOf } from "@/lib/constants";
import { formatSalary } from "@/lib/format";
import type { Job } from "@/lib/types";
import { cn } from "@/lib/utils";

const applyHref = (id: string) => `/apply?job=${id}`;

/** Category icon tile — roles are shown by type of work, not by employer. */
function RoleIcon({ category }: { category: string }) {
  const icon = CATEGORIES.find((c) => c.slug === category)?.icon ?? "Briefcase";
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary" aria-hidden>
      <CategoryIcon name={icon} className="size-6" />
    </span>
  );
}

export function JobCard({ job, className }: { job: Job; className?: string }) {
  return (
    <article className={cn("group relative flex h-full flex-col gap-4 rounded-3xl border bg-card p-5 card-hover sm:p-6", className)}>
      <div className="flex items-start gap-4">
        <RoleIcon category={job.category} />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg leading-snug font-semibold">
            <Link href={`/jobs/${job.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50">
              {job.title}
            </Link>
          </h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">{categoryName(job.category)}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">{job.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="secondary">{labelOf(JOB_TYPES, job.type)}</Badge>
        <Badge className="gap-1 bg-teal-soft text-teal"><Globe2 className="size-3" aria-hidden />Remote</Badge>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <Wallet className="size-4 shrink-0 text-teal" aria-hidden />
          <span><span className="sr-only">Typical salary: </span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</span>
        </span>
        <Button asChild size="sm" className="relative z-10">
          <Link href={applyHref(job.id)} aria-label={`Send your CV for ${job.title}`}>
            <Send /> Send CV
          </Link>
        </Button>
      </div>
    </article>
  );
}

/** Compact horizontal variant for listings. */
export function JobRow({ job }: { job: Job }) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-3xl border bg-card p-5 card-hover sm:flex-row sm:items-center sm:p-6">
      <RoleIcon category={job.category} />
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-lg font-semibold">
          <Link href={`/jobs/${job.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50">
            {job.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{categoryName(job.category)}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{job.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5"><Globe2 className="size-4 text-coral" aria-hidden />{REMOTE_LABEL}</li>
          <li className="flex items-center gap-1.5"><Briefcase className="size-4 text-primary" aria-hidden />{labelOf(JOB_TYPES, job.type)}</li>
          <li className="flex items-center gap-1.5 font-medium text-foreground"><Wallet className="size-4 text-teal" aria-hidden /><span className="sr-only">Typical salary: </span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</li>
        </ul>
      </div>
      <Button asChild size="sm" className="relative z-10 self-start sm:self-center">
        <Link href={applyHref(job.id)} aria-label={`Send your CV for ${job.title}`}><Send /> Send CV</Link>
      </Button>
    </article>
  );
}

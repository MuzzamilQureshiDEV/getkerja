import Link from "next/link";
import { BadgeCheck, Briefcase, Clock, Flame, Globe2, Send, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompanyLogo } from "@/components/shared/company-logo";
import { JOB_TYPES, REMOTE_LABEL, labelOf, SAMPLE_JOBS } from "@/lib/constants";
import { formatSalary, timeAgo } from "@/lib/format";
import type { JobWithCompany } from "@/lib/types";
import { cn } from "@/lib/utils";

const applyHref = (id: string) => `/apply?job=${id}`;

export function JobCard({ job, className }: { job: JobWithCompany; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-3xl border bg-card p-5 card-hover sm:p-6",
        job.featured && "border-primary/20 bg-gradient-to-br from-card via-card to-secondary/60",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <CompanyLogo company={job.company} />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg leading-snug font-semibold">
            <Link href={`/jobs/${job.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50">
              {job.title}
            </Link>
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="truncate">{job.company.name}</span>
            {job.company.verified && <BadgeCheck className="size-4 shrink-0 text-teal" aria-label="Verified employer" />}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.urgent && <Badge className="gap-1 bg-coral-soft text-coral"><Flame className="size-3" aria-hidden />Urgent</Badge>}
        {job.featured && <Badge className="bg-primary/10 text-primary">Featured</Badge>}
          {SAMPLE_JOBS && <Badge variant="outline">Example</Badge>}
        <Badge variant="secondary">{labelOf(JOB_TYPES, job.type)}</Badge>
        <Badge className="gap-1 bg-teal-soft text-teal"><Globe2 className="size-3" aria-hidden />Remote</Badge>
      </div>

      <dl className="grid gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Location</dt>
          <Globe2 className="size-4 shrink-0 text-coral" aria-hidden />
          <dd>{REMOTE_LABEL}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Salary</dt>
          <Wallet className="size-4 shrink-0 text-teal" aria-hidden />
          <dd className="font-medium text-foreground">{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden />
          <time dateTime={job.postedAt}>{timeAgo(job.postedAt)}</time>
        </span>
        <Button asChild size="sm" className="relative z-10">
          <Link href={applyHref(job.id)} aria-label={`Apply for ${job.title} at ${job.company.name}`}>
            <Send /> Apply
          </Link>
        </Button>
      </div>
    </article>
  );
}

/** Compact horizontal variant for listings. */
export function JobRow({ job }: { job: JobWithCompany }) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-3xl border bg-card p-5 card-hover sm:flex-row sm:items-center sm:p-6">
      <CompanyLogo company={job.company} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-heading text-lg font-semibold">
            <Link href={`/jobs/${job.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50">
              {job.title}
            </Link>
          </h3>
          {job.urgent && <Badge className="gap-1 bg-coral-soft text-coral"><Flame className="size-3" aria-hidden />Urgent</Badge>}
          {job.featured && <Badge className="bg-primary/10 text-primary">Featured</Badge>}
          {SAMPLE_JOBS && <Badge variant="outline">Example</Badge>}
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          {job.company.name}
          {job.company.verified && <BadgeCheck className="size-4 text-teal" aria-label="Verified employer" />}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{job.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5"><Globe2 className="size-4 text-coral" aria-hidden />{REMOTE_LABEL}</li>
          <li className="flex items-center gap-1.5"><Briefcase className="size-4 text-primary" aria-hidden />{labelOf(JOB_TYPES, job.type)}</li>
          <li className="flex items-center gap-1.5 font-medium text-foreground"><Wallet className="size-4 text-teal" aria-hidden />{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</li>
        </ul>
      </div>
      <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="size-3.5" aria-hidden /><time dateTime={job.postedAt}>{timeAgo(job.postedAt)}</time></span>
        <Button asChild size="sm" className="relative z-10"><Link href={applyHref(job.id)} aria-label={`Apply for ${job.title}`}><Send /> Apply</Link></Button>
      </div>
    </article>
  );
}

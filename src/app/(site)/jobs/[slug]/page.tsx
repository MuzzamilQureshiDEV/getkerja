import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Gift,
  Globe2,
  GraduationCap,
  Send,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { ShareButtons } from "@/components/jobs/share-buttons";
import { CompanyLogo } from "@/components/shared/company-logo";
import { JsonLd } from "@/components/shared/json-ld";
import { SongketPattern } from "@/components/shared/songket-pattern";
import { EXPERIENCE_LEVELS, JOB_TYPES, REMOTE_LABEL, SITE, categoryName, labelOf } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate, formatSalary, timeAgo } from "@/lib/format";
import type { JobWithCompany } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = db.jobs.bySlug(slug);
  if (!job) return { title: "Job not found" };
  const title = `${job.title} at ${job.company.name} — Remote, Malaysia`;
  return {
    title,
    description: `${job.summary} ${formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}. ${labelOf(JOB_TYPES, job.type)}, 100% remote. Apply with your CV on getKerja.`,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { title, description: job.summary, type: "article" },
    robots: job.status === "active" ? undefined : { index: false },
  };
}

const EMPLOYMENT_TYPE: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
  freelance: "CONTRACTOR",
};

function jobPostingLd(job: JobWithCompany) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.description.replace(/</g, "&lt;").replace(/\n+/g, "</p><p>")}</p><h3>Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul><h3>Requirements</h3><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    identifier: { "@type": "PropertyValue", name: job.company.name, value: job.id },
    datePosted: job.postedAt,
    validThrough: job.deadline,
    employmentType: EMPLOYMENT_TYPE[job.type],
    hiringOrganization: { "@type": "Organization", name: job.company.name, sameAs: job.company.website || undefined },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "Malaysia" },
    ...(job.salaryMin || job.salaryMax
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "MYR",
            value: { "@type": "QuantitativeValue", minValue: job.salaryMin, maxValue: job.salaryMax, unitText: "MONTH" },
          },
        }
      : {}),
    skills: job.skills.join(", "),
    industry: job.company.industry,
    directApply: true,
  };
}

export default async function JobDetailPage({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = db.jobs.bySlug(slug);
  if (!job) notFound();

  const similar = db.jobs.similar(job, 3);
  const url = `${SITE.url}/jobs/${job.slug}`;
  const closed = job.status !== "active";
  const applyHref = `/apply?job=${job.id}`;

  const overview = [
    { Icon: Wallet, label: "Salary", value: formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden) },
    { Icon: Briefcase, label: "Job type", value: labelOf(JOB_TYPES, job.type) },
    { Icon: Globe2, label: "Location", value: REMOTE_LABEL },
    { Icon: GraduationCap, label: "Experience", value: labelOf(EXPERIENCE_LEVELS, job.experience) },
    { Icon: Video, label: "Interview", value: "Online via Google Meet" },
    { Icon: Clock, label: "Posted", value: `${timeAgo(job.postedAt)} (${formatDate(job.postedAt)})` },
    ...(job.deadline ? [{ Icon: CalendarClock, label: "Apply before", value: formatDate(job.deadline) }] : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b bg-mesh">
        <SongketPattern id="jd-songket" className="text-primary/[0.06] [mask-image:radial-gradient(60%_80%_at_80%_0%,black,transparent)]" />
        <div className="relative container-page py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/jobs" className="hover:text-foreground">Jobs</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`/jobs?category=${job.category}`} className="hover:text-foreground">{categoryName(job.category)}</Link></li>
            </ol>
          </nav>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <CompanyLogo company={job.company} size="lg" />
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {job.urgent && <Badge className="bg-coral-soft text-coral">Urgent hiring</Badge>}
                  {job.featured && <Badge className="bg-primary/10 text-primary">Featured</Badge>}
                  {closed && <Badge variant="destructive">No longer accepting applications</Badge>}
                </div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{job.title}</h1>
                <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Building2 className="size-4" aria-hidden />{job.company.name}
                    {job.company.verified && <BadgeCheck className="size-4 text-teal" aria-label="Verified employer" />}
                  </span>
                  <span className="flex items-center gap-1.5"><Globe2 className="size-4 text-coral" aria-hidden />{REMOTE_LABEL}</span>
                  <span className="flex items-center gap-1.5"><Wallet className="size-4 text-teal" aria-hidden />{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</span>
                </p>
              </div>
            </div>
            <div className="hidden flex-col gap-3 lg:flex lg:items-end">
              <Button size="lg" variant="accent" asChild={!closed} disabled={closed} className="px-8">
                {closed ? <span>Applications closed</span> : <Link href={applyHref}><Send /> Apply now</Link>}
              </Button>
              <ShareButtons url={url} title={`${job.title} at ${job.company.name}`} />
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px] lg:py-14">
        <article className="flex min-w-0 flex-col gap-10">
          <section aria-labelledby="desc">
            <h2 id="desc" className="mb-4 text-2xl font-semibold">About the role</h2>
            {job.description.split(/\n\n+/).map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-foreground/85">{p}</p>
            ))}
          </section>
          <ListSection id="resp" title="Key responsibilities" items={job.responsibilities} />
          <ListSection id="req" title="Requirements" items={job.requirements} />
          {job.skills.length > 0 && (
            <section aria-labelledby="skills">
              <h2 id="skills" className="mb-4 text-2xl font-semibold">Skills</h2>
              <ul className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <li key={s}><Link href={`/jobs?q=${encodeURIComponent(s)}`} className="inline-block rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">{s}</Link></li>
                ))}
              </ul>
            </section>
          )}
          {job.benefits.length > 0 && (
            <section aria-labelledby="ben">
              <h2 id="ben" className="mb-4 text-2xl font-semibold">Benefits</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 rounded-2xl border bg-card p-4"><Gift className="size-5 shrink-0 text-coral" aria-hidden />{b}</li>
                ))}
              </ul>
            </section>
          )}
          <div className="flex flex-col gap-3 rounded-3xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-lg font-semibold">Share this job</p>
              <p className="text-sm text-muted-foreground">Know someone who’d be perfect? Send it their way.</p>
            </div>
            <ShareButtons url={url} title={`${job.title} at ${job.company.name}`} />
          </div>
        </article>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-3xl border bg-card p-6" aria-labelledby="ov">
            <h2 id="ov" className="mb-5 font-heading text-lg font-semibold">Job overview</h2>
            <dl className="flex flex-col gap-4">
              {overview.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="size-5" aria-hidden /></span>
                  <div>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            {!closed && (
              <>
                <Button asChild size="lg" variant="accent" className="mt-6 w-full"><Link href={applyHref}><Send /> Apply now</Link></Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">No account needed · takes 2 minutes</p>
              </>
            )}
          </section>

          <section className="rounded-3xl border bg-card p-6" aria-labelledby="co">
            <div className="mb-4 flex items-center gap-3">
              <CompanyLogo company={job.company} />
              <div>
                <h2 id="co" className="font-heading font-semibold">{job.company.name}</h2>
                <p className="text-sm text-muted-foreground">{job.company.industry}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{job.company.about || "Company profile coming soon."}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-secondary/60 p-3"><dt className="text-xs text-muted-foreground">Company size</dt><dd className="flex items-center gap-1 font-medium"><Users className="size-3.5" aria-hidden />{job.company.size}</dd></div>
              <div className="rounded-xl bg-secondary/60 p-3"><dt className="text-xs text-muted-foreground">Industry</dt><dd className="font-medium">{job.company.industry}</dd></div>
            </dl>
            {job.company.verified && (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-teal-soft p-3 text-sm font-medium text-teal"><BadgeCheck className="size-4" aria-hidden /> SSM-verified employer</p>
            )}
            <Button asChild variant="outline" className="mt-4 w-full"><Link href={`/jobs?q=${encodeURIComponent(job.company.name.split(" ")[0]!)}`}>More jobs from this company</Link></Button>
          </section>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="border-t bg-secondary/40 py-14" aria-labelledby="sim">
          <div className="container-page">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 id="sim" className="text-2xl font-bold sm:text-3xl">Similar jobs</h2>
              <Link href={`/jobs?category=${job.category}`} className="text-sm font-semibold text-primary hover:underline">View all <span className="sr-only">{categoryName(job.category)} jobs</span></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky apply bar */}
      <div className="sticky bottom-0 z-40 flex items-center gap-2 border-t bg-background/90 p-3 backdrop-blur-xl lg:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <Button asChild variant="ghost" size="icon" aria-label="Back to jobs"><Link href="/jobs"><ArrowLeft /></Link></Button>
        <Button asChild={!closed} size="lg" variant="accent" className="flex-1" disabled={closed}>
          {closed ? <span>Closed</span> : <Link href={applyHref}><Send /> Apply now</Link>}
        </Button>
      </div>

      {!closed && <JsonLd data={jobPostingLd(job)} />}
    </>
  );
}

function ListSection({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 text-2xl font-semibold">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((r) => (
          <li key={r} className="flex gap-3 leading-relaxed text-foreground/85">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
            {r}
          </li>
        ))}
      </ul>
    </section>
  );
}

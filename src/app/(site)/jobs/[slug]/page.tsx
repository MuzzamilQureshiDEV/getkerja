import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Gift,
  Globe2,
  GraduationCap,
  Send,
  Video,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { ShareButtons } from "@/components/jobs/share-buttons";
import { CategoryIcon } from "@/components/shared/category-icon";
import { SongketPattern } from "@/components/shared/songket-pattern";
import { CATEGORIES, EXPERIENCE_LEVELS, JOB_TYPES, REMOTE_LABEL, SITE, categoryName, labelOf } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatSalary } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = db.jobs.bySlug(slug);
  if (!job) return { title: "Job not found" };
  const title = `${job.title} — Remote role in Malaysia`;
  return {
    title,
    description: `${job.summary} ${formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}. ${labelOf(JOB_TYPES, job.type)}, 100% remote. Send your CV on getKerja.`,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { title, description: job.summary, type: "article" },
    robots: job.status === "active" ? undefined : { index: false },
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
  const icon = CATEGORIES.find((c) => c.slug === job.category)?.icon ?? "Briefcase";

  const overview = [
    { Icon: Wallet, label: "Typical salary", value: formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden) },
    { Icon: Briefcase, label: "Job type", value: labelOf(JOB_TYPES, job.type) },
    { Icon: Globe2, label: "Location", value: REMOTE_LABEL },
    { Icon: GraduationCap, label: "Experience", value: labelOf(EXPERIENCE_LEVELS, job.experience) },
    { Icon: Video, label: "Interview", value: "Online via Google Meet" },
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
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-coral text-white" aria-hidden><CategoryIcon name={icon} className="size-7" /></span>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {closed && <Badge variant="destructive">No longer accepting applications</Badge>}
                </div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{job.title}</h1>
                <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Briefcase className="size-4" aria-hidden />{categoryName(job.category)}
                  </span>
                  <span className="flex items-center gap-1.5"><Globe2 className="size-4 text-coral" aria-hidden />{REMOTE_LABEL}</span>
                  <span className="flex items-center gap-1.5"><Wallet className="size-4 text-teal" aria-hidden />{formatSalary(job.salaryMin, job.salaryMax, job.salaryHidden)}</span>
                </p>
              </div>
            </div>
            <div className="hidden flex-col gap-3 lg:flex lg:items-end">
              <Button size="lg" variant="accent" asChild={!closed} disabled={closed} className="px-8">
                {closed ? <span>Applications closed</span> : <Link href={applyHref}><Send /> Send your CV</Link>}
              </Button>
              <ShareButtons url={url} title={`${job.title} — remote role on ${SITE.name}`} />
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
              <h2 id="ben" className="mb-4 text-2xl font-semibold">What to expect</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 rounded-2xl border bg-card p-4"><Gift className="size-5 shrink-0 text-coral" aria-hidden />{b}</li>
                ))}
              </ul>
            </section>
          )}
          <div className="flex flex-col gap-3 rounded-3xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-lg font-semibold">Share this role</p>
              <p className="text-sm text-muted-foreground">Know someone who’d be perfect? Send it their way.</p>
            </div>
            <ShareButtons url={url} title={`${job.title} — remote role on ${SITE.name}`} />
          </div>
        </article>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-3xl border bg-card p-6" aria-labelledby="ov">
            <h2 id="ov" className="mb-5 font-heading text-lg font-semibold">Role overview</h2>
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
                <Button asChild size="lg" variant="accent" className="mt-6 w-full"><Link href={applyHref}><Send /> Send your CV</Link></Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">No account needed · takes 2 minutes</p>
              </>
            )}
          </section>

          <section className="rounded-3xl border bg-card p-6" aria-labelledby="how">
            <h2 id="how" className="mb-3 font-heading text-lg font-semibold">How it works</h2>
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Send your CV for this role — it takes 2 minutes.</li>
              <li>We match you with real openings for this kind of role as they come in.</li>
              <li>If one fits, we email you a Google Meet link for an online interview.</li>
              <li>The employer, exact salary and benefits are confirmed with you before any offer.</li>
            </ol>
          </section>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="border-t bg-secondary/40 py-14" aria-labelledby="sim">
          <div className="container-page">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 id="sim" className="text-2xl font-bold sm:text-3xl">Similar roles</h2>
              <Link href={`/jobs?category=${job.category}`} className="text-sm font-semibold text-primary hover:underline">View all <span className="sr-only">{categoryName(job.category)} roles</span></Link>
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
          {closed ? <span>Closed</span> : <Link href={applyHref}><Send /> Send your CV</Link>}
        </Button>
      </div>

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

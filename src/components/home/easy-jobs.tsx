import Link from "next/link";
import { ArrowRight, GraduationCap, Headset, HeartPulse, Palette, PenLine, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import type { JobWithCompany } from "@/lib/types";

const QUICK = [
  { label: "Content Writer", href: "/jobs?category=writing-content", Icon: PenLine },
  { label: "Copywriter", href: "/jobs?q=copywriter", Icon: PenLine },
  { label: "Support Agent", href: "/jobs?category=customer-service", Icon: Headset },
  { label: "HR & Admin", href: "/jobs?category=hr-admin", Icon: Users },
  { label: "UI Designer", href: "/jobs?q=designer", Icon: Palette },
  { label: "Healthcare Admin", href: "/jobs?category=healthcare", Icon: HeartPulse },
  { label: "Education", href: "/jobs?category=education", Icon: GraduationCap },
];

export function EasyJobs({ jobs }: { jobs: JobWithCompany[] }) {
  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="easy-title">
      <SectionHeading
        align="left"
        eyebrow="Easy to start"
        title={<span id="easy-title">Easy remote jobs — no experience needed</span>}
        description="Beginner-friendly roles with training provided. Perfect for fresh grads, students and career switchers."
        action={
          <Button asChild variant="outline" size="lg" className="group shrink-0">
            <Link href="/jobs?experience=entry">All entry-level jobs <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
          </Button>
        }
      />
      <ul className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Popular easy remote jobs">
        {QUICK.map(({ label, href, Icon }) => (
          <li key={label} className="shrink-0">
            <Link href={href} className="flex min-h-11 items-center gap-2 rounded-full border bg-card px-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
              <Icon className="size-4 text-coral" aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Stagger className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((j) => (
          <StaggerItem key={j.id}>
            <JobCard job={j} />
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="size-4 text-amber-500" aria-hidden />
        Not sure which to pick? Apply for the one that fits best — we’ll suggest other roles at your interview.
      </p>
    </section>
  );
}

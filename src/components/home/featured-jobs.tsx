import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import type { Job } from "@/lib/types";

export function FeaturedJobs({ jobs }: { jobs: Job[] }) {
  return (
    <section className="relative bg-secondary/40 py-20 sm:py-24" aria-labelledby="fj-title">
      <div className="container-page">
        <SectionHeading
          align="left"
          eyebrow="Popular"
          title={<span id="fj-title">Popular remote roles</span>}
          description="Types of remote work we recruit for — do them from anywhere in Malaysia."
          action={
            <Button asChild variant="outline" size="lg" className="group shrink-0">
              <Link href="/jobs">View all roles <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          }
        />
        <Stagger className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <StaggerItem key={j.id}>
              <JobCard job={j} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

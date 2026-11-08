import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryIcon } from "@/components/shared/category-icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { CATEGORIES } from "@/lib/constants";

const tones = [
  "bg-primary/10 text-primary",
  "bg-coral-soft text-coral",
  "bg-teal-soft text-teal",
  "bg-amber-500/10 text-amber-600 dark:text-amber-300",
];

export function Categories({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="cat-title">
      <SectionHeading
        eyebrow="Explore"
        title={<span id="cat-title">Remote job categories</span>}
        description="Work from home in tech, finance, marketing, support, education and more."
      />
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <StaggerItem key={c.slug}>
            <Link
              href={`/jobs?category=${c.slug}`}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border bg-card p-4 card-hover sm:p-6"
            >
              <span className={`grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tones[i % tones.length]}`}>
                <CategoryIcon name={c.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-heading text-base leading-tight font-semibold sm:text-lg">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {counts[c.slug] ?? 0} open {(counts[c.slug] ?? 0) === 1 ? "job" : "jobs"}
                </p>
              </div>
              <ArrowUpRight className="absolute top-5 right-5 size-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" aria-hidden />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

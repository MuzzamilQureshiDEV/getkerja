import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/section-heading";
import { SongketPattern } from "@/components/shared/songket-pattern";
import { JobSearchForm } from "@/components/jobs/job-search-form";
import type { Dictionary } from "@/lib/i18n";
import { HeroVisual } from "./hero-visual";
import { HeroIntro } from "./hero-intro";

const POPULAR = ["Content Writer", "Support Agent", "HR Admin", "UI Designer", "Tutor"];

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16 lg:-mt-[72px] lg:pt-[72px]" aria-labelledby="hero-title">
      {/* Background layers */}
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <SongketPattern id="hero-songket" className="text-primary/[0.07] [mask-image:radial-gradient(80%_70%_at_70%_30%,black,transparent)]" />
      <div className="absolute -top-40 -right-40 size-[520px] rounded-full bg-coral/20 blur-[120px]" aria-hidden />
      <div className="absolute top-60 -left-40 size-[420px] rounded-full bg-primary/20 blur-[120px]" aria-hidden />
      <Skyline className="absolute inset-x-0 bottom-0 h-40 w-full text-primary/[0.06] sm:h-56" />

      <div className="relative container-page grid items-center gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:pt-20 lg:pb-28">
        <HeroIntro>
          <Eyebrow className="self-start">{t.badge}</Eyebrow>
          <h1 id="hero-title" className="text-[2.6rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4.25rem]">
            {t.title1} <span className="text-gradient">{t.title2}</span> {t.title3}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">{t.subtitle}</p>

          <JobSearchForm labels={{ keyword: t.keyword, type: t.type, search: t.search }} className="mt-2" />

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-muted-foreground">{t.popular}</span>
            {POPULAR.map((p) => (
              <Link
                key={p}
                href={`/jobs?q=${encodeURIComponent(p)}`}
                className="rounded-full border bg-background/70 px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {p}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="/jobs">
                {t.browse}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#how-it-works"><ListChecks /> {t.howItWorks}</Link>
            </Button>
          </div>
        </HeroIntro>

        <HeroVisual />
      </div>
    </section>
  );
}

/** Abstract Kuala Lumpur skyline silhouette (decorative). */
function Skyline({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className={className} fill="currentColor">
      <path d="M0 220V160h40v-30h30v30h20v-60h46v60h24v-40h30v40h40V90h20l10-30 10 30h20v130h20V120h50v100h30v-70h36v70h30V70h14V40h6V10h4v30h6v30h14v150h10V70h14V40h6V10h4v30h6v30h14v150h30v-90h50v90h30v-50h40v50h26V100h44v120h30v-70h30v70h40v-40h50v40h30V130h40v90h30v-60h50v60h40v-30h30v30h44V220z" />
    </svg>
  );
}

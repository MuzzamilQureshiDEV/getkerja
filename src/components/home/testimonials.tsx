import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { testimonials as all } from "@/lib/data/seed";
import { initials } from "@/lib/format";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col gap-5 rounded-3xl border bg-card p-6 sm:p-7", className)}>
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`} role="img">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("size-4", i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted")} aria-hidden />
          ))}
        </div>
        <Quote className="size-8 text-primary/15" aria-hidden />
      </div>
      <blockquote className="flex-1 text-base leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="flex items-center gap-3 border-t pt-5">
        <span className={cn("grid size-11 place-items-center rounded-full text-sm font-bold text-white", t.type === "employer" ? "bg-gradient-to-br from-teal to-primary" : "bg-gradient-to-br from-coral to-primary")} aria-hidden>
          {initials(t.name)}
        </span>
        <div>
          <p className="font-semibold">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
        </div>
        <span className={cn("ml-auto rounded-full px-2.5 py-1 text-xs font-semibold", t.type === "employer" ? "bg-teal-soft text-teal" : "bg-coral-soft text-coral")}>
          {t.type === "employer" ? "Employer" : "Candidate"}
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ type }: { type?: Testimonial["type"] }) {
  const list = type ? all.filter((t) => t.type === type) : all;
  return (
    <section className="container-page py-20 sm:py-24" aria-labelledby="t-title">
      <SectionHeading
        eyebrow="Success stories"
        title={<span id="t-title">Loved by candidates & employers</span>}
        description="Rated 4.8/5 from 1,100+ reviews across Malaysia."
      />
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {list.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.06}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { blogPosts } from "@/lib/data/seed";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Career Advice — CV Tips, Interview Guides & Salary Insights",
  description: "Practical career advice for Malaysian job seekers and employers: CV writing, interview tips, salary guides, hiring trends and job-search strategies.",
  alternates: { canonical: "/blog" },
};

const CATS = ["All", "CV Writing", "Interview Tips", "Salary Insights", "Hiring Trends", "Job Search"] as const;

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const sp = await searchParams;
  const cat = typeof sp.category === "string" && CATS.includes(sp.category as (typeof CATS)[number]) ? sp.category : "All";
  const posts = cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero eyebrow="Career advice" title="Grow your career with confidence" description="Expert guides on CVs, interviews, salaries and hiring — written for the Malaysian job market." />
      <div className="container-page py-12">
        <nav aria-label="Article categories" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1">
          {CATS.map((c) => (
            <Link key={c} href={c === "All" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`} aria-current={cat === c ? "page" : undefined}
              className={cn("flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors", cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/40")}>
              {c}
            </Link>
          ))}
        </nav>

        {lead && (
          <Link href={`/blog/${lead.slug}`} className="group mb-10 grid overflow-hidden rounded-[32px] border bg-card card-hover md:grid-cols-2">
            <div className="relative aspect-[1200/630] overflow-hidden md:aspect-auto md:min-h-80">
              <Image src={lead.cover} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
              <Badge className="self-start bg-coral-soft text-coral">{lead.category}</Badge>
              <h2 className="text-2xl font-bold sm:text-3xl">{lead.title}</h2>
              <p className="text-muted-foreground">{lead.excerpt}</p>
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                {lead.author.name} · {formatDate(lead.publishedAt)} · <Clock className="size-4" aria-hidden />{lead.readMinutes} min read
              </p>
              <span className="flex items-center gap-1 font-semibold text-primary">Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
            </div>
          </Link>
        )}

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-card card-hover">
                <div className="relative aspect-[1200/630] overflow-hidden">
                  <Image src={p.cover} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <Badge variant="secondary" className="self-start">{p.category}</Badge>
                  <h2 className="font-heading text-lg leading-snug font-semibold group-hover:text-primary">{p.title}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground"><Clock className="size-3.5" aria-hidden />{p.readMinutes} min read · {formatDate(p.publishedAt)}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Eye, HeartHandshake, Lightbulb, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhyChoose } from "@/components/home/why-choose";
import { FEE_TEXT, SELECTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "getKerja is a Malaysian recruitment platform on a mission to make hiring fair, fast and transparent for every job seeker and employer.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { Icon: ShieldCheck, title: "Trust first", body: "Honest listings, salary ranges upfront and zero spam. Trust is the product." },
  { Icon: HeartHandshake, title: "People over posts", body: "Behind every CV is a person and a family. We design with empathy." },
  { Icon: Lightbulb, title: "Simple by design", body: "Fewer clicks, clearer screens and forms that work on any phone." },
  { Icon: Compass, title: "Proudly Malaysian", body: "Built for Malaysia — from Perlis to Sabah, in English and BM." },
];

const PROCESS = [
  { step: "Discover", body: "Employers share what they need; we help shape clear, inclusive job ads with fair salary ranges." },
  { step: "Attract", body: "We publish clear remote job ads so job seekers in every Malaysian state can find and apply for them." },
  { step: "Screen", body: "Candidates apply with one simple form; our recruiters review every CV that lands in our inbox." },
  { step: "Interview", body: `Shortlisted candidates get an email from us with a Google Meet link. Based on the interview, a ${FEE_TEXT} selection fee locks in their place in the selection process.` },
  { step: "Select & hire", body: `Selected candidates receive their job offer within ${SELECTION.offerDays} working days and start working remotely.` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={<>Making work <span className="text-gradient">work better</span> for Malaysia</>}
        description="Job hunting in Malaysia can be slow, opaque and stressful. We’re trying to make it simpler, one honest job post at a time."
      />

      <section className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <Reveal className="flex flex-col gap-5 text-lg leading-relaxed text-foreground/85">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">A simpler way to find remote work</h2>
          <p>
            getKerja is a new, small recruitment service for remote jobs in Malaysia. Job hunting here is often slow and opaque: CVs go
            unanswered and salaries are hidden until the last interview. We want to do it differently.
          </p>
          <p>
            You fill in one form with your CV, we read every application ourselves, and if you’re shortlisted we interview you online over
            Google Meet. No account, no app — and you can live anywhere in Malaysia.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal className="rounded-3xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--coral)_40%)] p-8 text-white">
            <Target className="mb-4 size-10" aria-hidden />
            <h3 className="mb-2 text-2xl font-semibold text-white">Our mission</h3>
            <p className="text-white/85">Help every Malaysian find meaningful work — and every employer find the right people — faster and more fairly.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border bg-card p-8 sm:translate-y-10">
            <Eye className="mb-4 size-10 text-coral" aria-hidden />
            <h3 className="mb-2 text-2xl font-semibold">Our vision</h3>
            <p className="text-muted-foreground">A transparent job market where salaries are shared, every applicant hears back, and talent is judged on skills.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <SectionHeading eyebrow="What we stand for" title="Our values" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.05} className="rounded-3xl border bg-card p-6 card-hover">
              <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-6" aria-hidden /></span>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChoose />

      <section className="container-page py-20 sm:py-24" aria-labelledby="process">
        <SectionHeading eyebrow="How we recruit" title={<span id="process">Our recruitment process</span>} description="A transparent, five-stage process designed to respect everyone's time." />
        <ol className="relative mx-auto flex max-w-3xl flex-col gap-6 before:absolute before:top-2 before:bottom-2 before:left-6 before:w-px before:bg-gradient-to-b before:from-primary before:to-coral">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05}>
              <li className="relative flex gap-5">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-4 border-background bg-primary font-heading font-bold text-primary-foreground">{i + 1}</span>
                <div className="flex-1 rounded-3xl border bg-card p-5">
                  <h3 className="font-semibold">{p.step}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-page grid gap-5 py-20 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-[32px] border bg-card p-8 sm:p-10">
          <Users className="size-10 text-primary" aria-hidden />
          <h2 className="text-2xl font-bold sm:text-3xl">Looking for your next role?</h2>
          <p className="text-muted-foreground">Pick a remote job, send your CV in one form and interview online — no account needed.</p>
          <Button asChild size="lg" className="mt-auto self-start"><Link href="/jobs">Find jobs <ArrowRight /></Link></Button>
        </div>
        <div className="flex flex-col gap-4 rounded-[32px] bg-ink p-8 text-white sm:p-10">
          <Sparkles className="size-10 text-coral" aria-hidden />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Hiring in Malaysia?</h2>
          <p className="text-white/75">Tell us who you need — we screen and interview remote candidates for you.</p>
          <Button asChild size="lg" variant="accent" className="mt-auto self-start"><Link href="/employers">Hire with us <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}

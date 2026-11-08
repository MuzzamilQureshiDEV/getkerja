import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, ClipboardList, Clock, FileSearch, Globe2, Send, Users, Video, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EmployerCta } from "@/components/home/employer-cta";
import { TestimonialCard } from "@/components/home/testimonials";
import { Eyebrow, SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { SongketPattern } from "@/components/shared/songket-pattern";
import { testimonials } from "@/lib/data/seed";

export const metadata: Metadata = {
  title: "For Employers — Hire Remote Talent in Malaysia",
  description: "Tell us who you need. getKerja advertises your remote role, screens CVs and interviews candidates online, then sends you a shortlist.",
  alternates: { canonical: "/employers" },
};

const SERVICES = [
  { Icon: ClipboardList, title: "Brief us", body: "Share the role, salary range and must-haves. We write and publish a clear remote job ad." },
  { Icon: FileSearch, title: "We screen CVs", body: "Applications arrive in our inbox; our recruiters review every CV against your brief." },
  { Icon: Video, title: "We interview online", body: "Shortlisted candidates are interviewed by our team over Google Meet." },
  { Icon: Users, title: "You meet the best", body: "Receive a shortlist with interview notes, then make your final pick." },
];

const BENEFITS = [
  { Icon: Globe2, stat: "13", label: "States + 3 territories to hire from — fully remote" },
  { Icon: Zap, stat: "5 days", label: "Typical time to your first shortlist" },
  { Icon: BadgeCheck, stat: "100%", label: "Shortlisted candidates already interviewed" },
  { Icon: Clock, stat: "0", label: "Hours your team spends screening CVs" },
];

const FAQ = [
  { q: "How much does it cost?", a: "Pricing depends on the number and seniority of roles. Contact us for a quote — there’s no charge until we send you a shortlist." },
  { q: "Are all roles remote?", a: "Yes. getKerja focuses on remote roles, so you can hire talented people from anywhere in Malaysia." },
  { q: "How are candidates interviewed?", a: "Our recruiters invite shortlisted candidates by email and interview them over Google Meet, then share notes with you." },
  { q: "How is candidate data protected?", a: "We process candidate data under our PDPA-compliant Privacy Notice and share CVs only with the hiring company, solely for recruitment." },
];

export default function EmployersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <SongketPattern id="emp-songket" className="text-white/[0.05]" />
        <div className="absolute -top-40 right-0 size-[520px] rounded-full bg-primary/50 blur-[140px]" aria-hidden />
        <div className="absolute -bottom-40 left-10 size-[420px] rounded-full bg-coral/30 blur-[140px]" aria-hidden />
        <div className="relative container-page grid gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
          <div className="flex flex-col gap-6">
            <Eyebrow className="self-start border-white/20 bg-white/10 text-white">For employers</Eyebrow>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Hire Malaysia’s best <span className="text-gradient">remote</span> talent</h1>
            <p className="max-w-xl text-lg text-white/75">You tell us who you need. We advertise, screen CVs and interview candidates online — then send you a shortlist of people ready to start.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent"><Link href="/contact?topic=employer"><Send /> Request a quote</Link></Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white"><Link href="#process">How it works</Link></Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {BENEFITS.map(({ Icon, stat, label }) => (
              <div key={label} className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <Icon className="size-6 text-coral" aria-hidden />
                <dd className="font-heading text-3xl font-bold text-white">{stat}</dd>
                <dt className="text-sm text-white/70">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="process" className="container-page scroll-mt-24 py-20 sm:py-24" aria-labelledby="svc">
        <SectionHeading eyebrow="Our recruitment service" title={<span id="svc">We do the hiring legwork</span>} description="A simple, done-for-you process — no software to learn, no CVs to sort." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.05} className="rounded-3xl border bg-card p-6 card-hover">
              <div className="flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-coral text-white"><Icon className="size-6" aria-hidden /></span>
                  <span className="font-heading text-4xl font-bold text-muted-foreground/15" aria-hidden>0{i + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 rounded-[32px] border bg-card p-8 text-center sm:p-10">
          <CalendarCheck className="size-10 text-coral" aria-hidden />
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to hire?</h2>
          <p className="max-w-lg text-muted-foreground">Send us your role details and we’ll get back to you within one business day with a quote and timeline.</p>
          <Button asChild size="lg" className="mt-2"><Link href="/contact?topic=employer">Request a quote <ArrowRight /></Link></Button>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 sm:py-24" aria-labelledby="etest">
        <div className="container-page">
          <SectionHeading eyebrow="Employer stories" title={<span id="etest">Teams that hire with getKerja</span>} />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.filter((t) => t.type === "employer").map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      <section className="container-page max-w-3xl py-16" aria-labelledby="efaq">
        <h2 id="efaq" className="mb-6 text-center text-3xl font-bold">Employer FAQ</h2>
        <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6">
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <EmployerCta />
    </>
  );
}

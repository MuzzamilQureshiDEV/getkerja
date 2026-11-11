import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BadgeCheck,
  Briefcase,
  Check,
  CircleDollarSign,
  GraduationCap,
  Laptop,
  Mail,
  MapPin,
  MessageSquareOff,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Shuffle,
  UserRoundCheck,
  Video,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { FEE_TEXT, SELECTION, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "getKerja is a small Malaysian recruitment service that matches Malaysians with remote jobs — one simple form, online interviews and a clear process from start to offer.",
  alternates: { canonical: "/about" },
};

const BADGES = ["100% remote roles", "Free to apply", "No account needed", "Online interviews"];

const PROBLEMS = [
  { Icon: ShieldAlert, title: "Too many “work from home” scams", body: "Remote job ads on social media often ask for money first, promise unrealistic pay or disappear after you reply. It’s hard to know who is real." },
  { Icon: MapPin, title: "Good jobs feel locked to the big cities", body: "Many Malaysians outside the Klang Valley — or at home caring for family — have the skills, but most openings still expect you to commute." },
  { Icon: MessageSquareOff, title: "CVs go into a black hole", body: "You apply, wait, and never hear back. Salaries stay hidden until the last round. Nobody tells you what happens next." },
];

const COMPARE = {
  typical: [
    "Hundreds of listings, little help choosing",
    "Create an account and fill in long profiles",
    "Salary often hidden until the end",
    "No reply if you’re not picked",
    "Nobody to ask when something feels wrong",
  ],
  us: [
    "Clear remote role types with typical salary shown",
    "One form, your CV, about 2 minutes — no account",
    "A real person reads every application",
    "Interviews online over Google Meet, from anywhere in Malaysia",
    `Every step and every cost explained in writing, by email (${SITE.email})`,
  ],
};

const STEPS = [
  { Icon: Send, title: "You send your CV", body: "Pick the kind of remote work you want and fill in one short form. Applying is free." },
  { Icon: Search, title: "We review it ourselves", body: "Our recruitment team reads your CV and matches it with real openings as they come in." },
  { Icon: Video, title: "Online interview", body: "When an opening fits, we email you a Google Meet link. We tell you the hiring company’s name before your interview." },
  { Icon: Wallet, title: "Platform fee after interview", body: `If you continue in the selection process after your interview, a fee of ${FEE_TEXT} applies. We confirm the exact amount by email before you pay — never before the interview.` },
  { Icon: BadgeCheck, title: "Offer & start", body: `Selected candidates receive their job offer within ${SELECTION.offerDays} working days and start working remotely.` },
];

const PROMISES = [
  { Icon: Send, title: "Nothing to pay to apply", body: "Sending your CV and being interviewed costs nothing." },
  { Icon: CircleDollarSign, title: "Fee stated upfront", body: `The ${FEE_TEXT} fee is written on our site and confirmed by email — no surprise charges.` },
  { Icon: UserRoundCheck, title: "You know the employer first", body: "We name the hiring company before your interview, and the salary and benefits before any offer." },
  { Icon: ShieldCheck, title: "Your data stays private", body: "Your CV is only shared with the employer for the role you’re shortlisted for. We never sell personal data." },
];

const AUDIENCE = [
  { Icon: Briefcase, title: "Working Malaysians", body: "Looking for a remote job or extra income." },
  { Icon: Baby, title: "Parents at home", body: "Who want flexible work around family." },
  { Icon: GraduationCap, title: "Students & fresh grads", body: "Starting out, with no experience needed for many roles." },
  { Icon: Shuffle, title: "Between jobs", body: "Looking for the next step without moving cities." },
  { Icon: Laptop, title: "Freelancers", body: "Wanting steadier remote work." },
];

function Num({ n, label }: { n: number; label: string }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide text-primary uppercase">
      <span className="font-heading text-2xl tabular-nums">{String(n).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-primary/40" aria-hidden />
      {label}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About getKerja"
        title={<>Remote work for Malaysians, <span className="text-gradient">done honestly</span></>}
        description="getKerja is a small Malaysian recruitment service. We match job seekers anywhere in Malaysia with remote jobs — one simple form, a real person reading your CV, and online interviews."
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <li key={b} className="flex items-center gap-1.5 rounded-full border bg-card/80 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
              <Check className="size-4 text-teal" aria-hidden />{b}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* 01 — Why we started */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="why">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <Num n={1} label="Why we started" />
            <h2 id="why" className="text-3xl font-bold sm:text-4xl">Finding real remote work in Malaysia shouldn’t be this hard</h2>
            <p className="mt-4 text-lg text-muted-foreground">We started getKerja because we kept seeing the same three problems.</p>
          </Reveal>
          <div className="flex flex-col gap-4">
            {PROBLEMS.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.05} className="flex gap-4 rounded-3xl border bg-card p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-coral/10 text-coral"><Icon className="size-6" aria-hidden /></span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — What we actually do */}
      <section className="border-y bg-secondary/40 py-20 sm:py-24" aria-labelledby="what">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <Num n={2} label="What we actually do" />
            <h2 id="what" className="text-3xl font-bold sm:text-4xl">Not just another job board</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal className="rounded-3xl border bg-card p-7">
              <h3 className="mb-5 text-lg font-semibold text-muted-foreground">A typical job board</h3>
              <ul className="flex flex-col gap-3">
                {COMPARE.typical.map((t) => (
                  <li key={t} className="flex gap-3 text-muted-foreground"><X className="mt-0.5 size-5 shrink-0 text-muted-foreground/60" aria-hidden />{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="rounded-3xl border-2 border-primary bg-card p-7 shadow-lg shadow-primary/10">
              <h3 className="mb-5 text-lg font-semibold text-primary">getKerja</h3>
              <ul className="flex flex-col gap-3">
                {COMPARE.us.map((t) => (
                  <li key={t} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — How it works */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="how">
        <Reveal className="max-w-2xl">
          <Num n={3} label="How it works" />
          <h2 id="how" className="text-3xl font-bold sm:text-4xl">From CV to offer in five steps</h2>
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.05} className="flex h-full flex-col gap-3 rounded-3xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-5" aria-hidden /></span>
                  <span className="font-heading text-3xl font-bold text-muted-foreground/30 tabular-nums">{i + 1}</span>
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 — Our promises */}
      <section className="bg-ink py-20 text-white sm:py-24" aria-labelledby="promises">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-wide text-coral uppercase">
              <span className="font-heading text-2xl tabular-nums">04</span><span className="h-px w-8 bg-coral/50" aria-hidden />Our promises
            </p>
            <h2 id="promises" className="text-3xl font-bold text-white sm:text-4xl">Clear about money, clear about every step</h2>
            <p className="mt-4 text-lg text-white/70">If anything ever feels off, email us at <a href={`mailto:${SITE.email}`} className="font-medium text-white underline underline-offset-4">{SITE.email}</a>.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p.Icon className="mb-3 size-6 text-teal" aria-hidden />
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-white/70">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Who we serve */}
      <section className="container-page py-20 sm:py-24" aria-labelledby="who">
        <Reveal className="max-w-2xl">
          <Num n={5} label="Who we serve" />
          <h2 id="who" className="text-3xl font-bold sm:text-4xl">Built for Malaysians who want to work from home</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AUDIENCE.map(({ Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.04} className="h-full rounded-3xl border bg-card p-6 card-hover">
                <span className="mb-4 grid size-11 place-items-center rounded-2xl bg-teal-soft text-teal"><Icon className="size-5" aria-hidden /></span>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 06 — Get in touch */}
      <section className="container-page pb-24" aria-labelledby="contact">
        <Reveal className="max-w-2xl">
          <Num n={6} label="Get in touch" />
          <h2 id="contact" className="text-3xl font-bold sm:text-4xl">Ready when you are</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-[32px] bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),var(--coral)_40%)] p-8 text-white sm:p-10">
            <Send className="size-9" aria-hidden />
            <h3 className="text-2xl font-bold text-white">Looking for remote work?</h3>
            <p className="text-white/85">Send your CV in about 2 minutes — no account needed. We reply by email.</p>
            <Button asChild size="lg" variant="secondary" className="mt-auto self-start"><Link href="/apply">Send your CV <ArrowRight /></Link></Button>
          </div>
          <div className="flex flex-col gap-4 rounded-[32px] border bg-card p-8 sm:p-10">
            <Mail className="size-9 text-primary" aria-hidden />
            <h3 className="text-2xl font-bold">Employers & questions</h3>
            <p className="text-muted-foreground">Hiring remote staff, or have a question about how we work? Email our team.</p>
            <div className="mt-auto flex flex-wrap gap-3">
              <Button asChild size="lg"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></Button>
              <Button asChild size="lg" variant="outline"><Link href="/employers">For employers <ArrowRight /></Link></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

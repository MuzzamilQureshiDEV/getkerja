import type { Metadata } from "next";
import { CalendarCheck, FileText, Lock, MailCheck, Trophy } from "lucide-react";
import { ApplyForm } from "@/components/jobs/apply-form";
import { PageHero } from "@/components/shared/page-hero";
import { db } from "@/lib/db";
import { FEE_TEXT, SELECTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Apply for a Remote Job",
  description: "Apply for remote jobs in Malaysia in minutes: fill one form, attach your CV, choose the job and interview online. No account needed.",
  alternates: { canonical: "/apply" },
};

const STEPS = [
  { Icon: FileText, title: "Fill the form with your CV", body: "Takes about 2 minutes." },
  { Icon: MailCheck, title: "Select the job", body: "Pick the remote role you want." },
  { Icon: CalendarCheck, title: "Get interviewed", body: `We email you a Google Meet link. After the interview, a ${FEE_TEXT} selection fee locks in your place.` },
  { Icon: Trophy, title: "Get selected", body: `Receive your offer within ${SELECTION.offerDays} working days and start remotely.` },
];

export default async function ApplyPage({ searchParams }: PageProps<"/apply">) {
  const sp = await searchParams;
  const jobs = db.jobs.active().map((j) => ({ id: j.id, title: j.title, company: j.company.name }));
  const defaultJobId = typeof sp.job === "string" ? sp.job : undefined;

  return (
    <>
      <PageHero eyebrow="Apply" title={<>Apply in <span className="text-gradient">2 minutes</span></>} description="No account, no long forms. Send your CV and we’ll be in touch by email." />
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <div className="relative min-w-0">
          <ApplyForm jobs={jobs} defaultJobId={defaultJobId} />
        </div>
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold">What happens next</h2>
            <ol className="flex flex-col gap-4">
              {STEPS.map(({ Icon, title, body }, i) => (
                <li key={title} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-coral text-white"><Icon className="size-5" aria-hidden /></span>
                  <div>
                    <p className="font-medium">{i + 1}. {title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-foreground">
            <strong>Applying is free.</strong> The {FEE_TEXT} selection fee is only requested after your interview — we confirm the exact amount by email first.
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-secondary/60 p-4 text-xs text-muted-foreground">
            <Lock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            Your CV is only shared with our recruitment team and the hiring company. We never sell your data.
          </div>
        </aside>
      </div>
    </>
  );
}

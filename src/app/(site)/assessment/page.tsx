import type { Metadata } from "next";
import { ClipboardCheck, Lock, MailCheck, Video } from "lucide-react";
import { AssessmentForm } from "@/components/forms/assessment-form";
import { PageHero } from "@/components/shared/page-hero";
import { FEE_TEXT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Candidate Assessment",
  description: "Complete the getKerja candidate assessment in a few minutes and receive your assessment interview link by email.",
  alternates: { canonical: "/assessment" },
};

const STEPS = [
  { Icon: ClipboardCheck, title: "Fill in the assessment", body: "Mostly tap-to-choose — takes about 3 minutes." },
  { Icon: MailCheck, title: "Check your email", body: "We send your assessment interview meeting link by email." },
  { Icon: Video, title: "Join the interview", body: `Meet our team online. After the interview, a ${FEE_TEXT} selection fee locks in your place.` },
];

export default function AssessmentPage() {
  return (
    <>
      <PageHero title={<>Assessment <span className="text-gradient">Form</span></>} />
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <div className="relative min-w-0">
          <AssessmentForm />
        </div>
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold">How it works</h2>
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
            <strong>The assessment is free.</strong> The {FEE_TEXT} selection fee is only requested after your interview — we confirm the exact amount by email first.
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-secondary/60 p-4 text-xs text-muted-foreground">
            <Lock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            Your answers are only seen by our recruitment team. We never sell your data.
          </div>
        </aside>
      </div>
    </>
  );
}

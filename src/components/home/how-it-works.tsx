import Link from "next/link";
import { ArrowRight, CalendarCheck, FileText, MousePointerClick, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { FEE_TEXT, SELECTION } from "@/lib/constants";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

const STEPS = [
  { Icon: FileText, title: "Fill the form with your CV", body: "Enter your details and attach your CV — PDF or Word. No account or sign-up needed." },
  { Icon: MousePointerClick, title: "Select the job", body: "Choose the remote role you want. Your application lands straight in our recruiters’ inbox." },
  { Icon: CalendarCheck, title: "Get interviewed", body: `If you’re shortlisted, we email you a Google Meet link. Based on your interview, a selection fee of ${FEE_TEXT} applies to lock in your place in the selection process.` },
  { Icon: Trophy, title: "Get selected", body: `Selected candidates receive their job offer within ${SELECTION.offerDays} working days and start working remotely.` },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-page scroll-mt-24 py-20 sm:py-24" aria-labelledby="hiw-title">
      <SectionHeading
        eyebrow="Simple process"
        title={<span id="hiw-title">How getKerja works</span>}
        description="Four simple steps from your CV to your new remote job."
      />
      <Stagger className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 lg:block" aria-hidden />
        {STEPS.map(({ Icon, title, body }, i) => (
          <StaggerItem key={title} className="h-full">
            <div className="relative flex h-full flex-col gap-4 rounded-3xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-coral text-white shadow-lg shadow-primary/20">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="font-heading text-5xl font-bold text-muted-foreground/15" aria-hidden>0{i + 1}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mx-auto mt-8 max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-center text-sm text-foreground">
        <strong>Applying and interviewing are free.</strong> The {FEE_TEXT} selection fee is only requested after your interview, and the exact amount is
        confirmed by email before you pay. <a href="/faq" className="font-medium text-primary underline underline-offset-4">Learn more</a>
      </p>
      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" variant="accent" className="group">
          <Link href="/apply">Apply now <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
        </Button>
      </div>
    </section>
  );
}

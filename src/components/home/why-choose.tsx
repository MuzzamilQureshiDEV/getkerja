import { Headset, MapPinned, MousePointerClick, ShieldCheck, Upload, Video } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  { Icon: ShieldCheck, title: "Free to apply", body: "Applying costs nothing. Any selection fee is only discussed by email after your interview, and you can say no.", className: "lg:col-span-2 lg:row-span-2", big: true },
  { Icon: MousePointerClick, title: "No account needed", body: "One simple form — no sign-up, no passwords, no profiles to maintain." },
  { Icon: Upload, title: "CV upload", body: "Attach your CV as PDF or Word and you’re done." },
  { Icon: Video, title: "Online interviews", body: "Shortlisted? We email you a Google Meet link — interview from home." },
  { Icon: MapPinned, title: "100% remote", body: "Every job is remote — work from anywhere in Malaysia, with salaries in RM." },
  { Icon: Headset, title: "Fast support", body: "Email us any time — we aim to reply within one business day, in BM or English.", className: "lg:col-span-2" },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24" aria-labelledby="why-title">
      <div className="absolute -top-32 left-1/3 size-[480px] rounded-full bg-primary/40 blur-[140px]" aria-hidden />
      <div className="absolute -right-20 bottom-0 size-[360px] rounded-full bg-coral/25 blur-[120px]" aria-hidden />
      <div className="relative container-page">
        <SectionHeading
          eyebrow="Why getKerja"
          title={<span id="why-title" className="text-white">Built for how Malaysia hires</span>}
          description={<span className="text-white/70">Everything candidates and employers need, without the noise.</span>}
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon, title, body, className, big }, i) => (
            <Reveal key={title} delay={i * 0.05} className={cn("h-full", className)}>
              <div
                className={cn(
                  "group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.07]",
                  big && "justify-between bg-gradient-to-br from-primary/40 to-white/[0.03] p-8",
                )}
              >
                <span className={cn("grid size-12 place-items-center rounded-2xl bg-white/10 text-coral transition-transform group-hover:scale-110", big && "size-16 bg-white text-primary")}>
                  <Icon className={cn("size-6", big && "size-8")} aria-hidden />
                </span>
                <div>
                  <h3 className={cn("font-heading text-lg font-semibold text-white", big && "text-3xl")}>{title}</h3>
                  <p className={cn("mt-2 text-sm text-white/70", big && "max-w-sm text-base")}>{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SongketPattern } from "@/components/shared/songket-pattern";
import { Reveal } from "@/components/shared/reveal";

export function EmployerCta() {
  return (
    <section className="container-page py-12 sm:py-16" aria-labelledby="ecta-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-primary via-[color-mix(in_oklch,var(--primary),var(--coral)_35%)] to-coral px-6 py-14 text-white sm:px-12 sm:py-20">
          <SongketPattern id="cta-songket" className="text-white/10" />
          <div className="absolute -right-24 -bottom-24 size-80 rounded-full border-[40px] border-white/10" aria-hidden />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-5">
              <h2 id="ecta-title" className="text-4xl font-bold text-white sm:text-5xl">Hire Top Talent in Malaysia</h2>
              <p className="max-w-xl text-lg text-white/85">
                Tell us who you need. We find, screen and interview remote candidates from across Malaysia, and send you a shortlist.
              </p>
              <ul className="grid gap-2 text-white/90 sm:grid-cols-2">
                {["Remote talent from all states", "CV screening done for you", "Online interviews handled", "Shortlist in days, not weeks"].map((x) => (
                  <li key={x} className="flex items-center gap-2"><Check className="size-5 rounded-full bg-white/20 p-0.5" aria-hidden />{x}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Button asChild size="lg" className="group h-14 bg-white px-8 text-base text-primary hover:bg-white/90">
                <Link href="/contact?topic=employer">Talk to our team <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-14 px-8 text-base text-white hover:bg-white/15 hover:text-white">
                <Link href="/employers">How we hire for you</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

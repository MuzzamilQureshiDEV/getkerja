import { seedCompanies } from "@/lib/data/seed";
import { CompanyLogo } from "@/components/shared/company-logo";

export function CompanyMarquee() {
  const list = [...seedCompanies, ...seedCompanies];
  return (
    <section aria-label="Companies hiring on getKerja" className="py-14">
      <p className="mb-6 text-center text-sm font-medium text-muted-foreground">Trusted by fast-growing Malaysian employers</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {list.map((c, i) => (
            <li key={`${c.id}-${i}`} className="flex items-center gap-3 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" aria-hidden={i >= seedCompanies.length}>
              <CompanyLogo company={c} size="sm" />
              <span className="font-heading text-base font-semibold whitespace-nowrap">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

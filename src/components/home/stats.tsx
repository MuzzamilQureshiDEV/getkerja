import { BadgeCheck, Laptop, UserX, Video } from "lucide-react";

// Facts about how the service works — not performance figures.
// Only add numbers here once you can back them with real records.
const FACTS = [
  { value: "Free", label: "to apply", Icon: BadgeCheck, tone: "text-primary bg-primary/10" },
  { value: "No account", label: "just one form", Icon: UserX, tone: "text-coral bg-coral-soft" },
  { value: "Online", label: "interviews on Google Meet", Icon: Video, tone: "text-teal bg-teal-soft" },
  { value: "100%", label: "remote roles", Icon: Laptop, tone: "text-amber-600 bg-amber-500/10 dark:text-amber-300" },
];

export function Stats() {
  return (
    <section aria-label="How getKerja works at a glance" className="relative z-10 container-page -mt-10">
      <dl className="grid grid-cols-2 gap-3 rounded-[28px] border bg-card/90 p-3 shadow-xl shadow-primary/5 backdrop-blur-xl sm:gap-4 sm:p-4 lg:grid-cols-4">
        {FACTS.map(({ value, label, Icon, tone }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4">
            <span className={`grid size-11 shrink-0 place-items-center rounded-2xl sm:size-12 ${tone}`}>
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col-reverse">
              <dt className="truncate text-xs text-muted-foreground sm:text-sm">{label}</dt>
              <dd className="font-heading text-xl font-bold sm:text-2xl">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

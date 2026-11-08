"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Briefcase, Building2, Layers, Trophy } from "lucide-react";

// Placeholder marketing figures — replace with live counts from your database/analytics.
const STATS = [
  { value: 1200, suffix: "+", label: "Remote jobs posted", Icon: Briefcase, tone: "text-primary bg-primary/10" },
  { value: 350, suffix: "+", label: "Companies hiring", Icon: Building2, tone: "text-coral bg-coral-soft" },
  { value: 4800, suffix: "+", label: "Online interviews held", Icon: Trophy, tone: "text-teal bg-teal-soft" },
  { value: 100, suffix: "%", label: "Remote, all states", Icon: Layers, tone: "text-amber-600 bg-amber-500/10 dark:text-amber-300" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("en-MY")}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="getKerja in numbers" className="relative z-10 container-page -mt-10">
      <dl className="grid grid-cols-2 gap-3 rounded-[28px] border bg-card/90 p-3 shadow-xl shadow-primary/5 backdrop-blur-xl sm:gap-4 sm:p-4 lg:grid-cols-4">
        {STATS.map(({ value, suffix, label, Icon, tone }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4">
            <span className={`grid size-11 shrink-0 place-items-center rounded-2xl sm:size-12 ${tone}`}>
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col-reverse">
              <dt className="truncate text-xs text-muted-foreground sm:text-sm">{label}</dt>
              <dd className="font-heading text-xl font-bold sm:text-3xl">
                <Counter to={value} suffix={suffix} />
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

import { Info } from "lucide-react";
import { SAMPLE_JOBS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Shown while SAMPLE_JOBS is true: tells visitors the listings are examples,
 * not live vacancies from named employers. Renders nothing once real jobs are live.
 */
export function SampleNotice({ className }: { className?: string }) {
  if (!SAMPLE_JOBS) return null;
  return (
    <p role="note" className={cn("flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground", className)}>
      <Info className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden />
      <span>
        <strong>Example listings.</strong> These roles show the kind of remote work we recruit for. The company names are illustrative, not
        real employers, and these are not open vacancies yet. Send us your CV and we’ll only contact you about a real role.
      </span>
    </p>
  );
}

import { CircleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Accessible form field: visible label, hint and error wired up via aria-describedby. */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string[] | string;
  required?: boolean;
  className?: string;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string; required?: boolean }) => React.ReactNode;
}) {
  const err = Array.isArray(error) ? error[0] : error;
  const describedBy = [hint && `${id}-hint`, err && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span className="text-coral" aria-hidden>*</span>}
      </Label>
      {children({ id, "aria-invalid": err ? true : undefined, "aria-describedby": describedBy, required })}
      {hint && !err && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
      {err && (
        <p id={`${id}-err`} className="flex items-center gap-1.5 text-sm font-medium text-destructive">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {err}
        </p>
      )}
    </div>
  );
}

export function FormMessage({ ok, message }: { ok?: boolean; message?: string }) {
  if (!message) return <div role="status" aria-live="polite" className="sr-only" />;
  return (
    <div
      role={ok ? "status" : "alert"}
      aria-live="polite"
      className={cn(
        "rounded-2xl border p-4 text-sm font-medium",
        ok ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive",
      )}
    >
      {message}
    </div>
  );
}

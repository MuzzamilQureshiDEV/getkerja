import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  Icon,
  title,
  description,
  children,
  className,
}: {
  Icon: LucideIcon;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-4 rounded-3xl border border-dashed bg-card/50 px-6 py-16 text-center", className)}>
      <span className="relative grid size-20 place-items-center">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-coral/15" />
        <Icon className="relative size-9 text-primary" aria-hidden />
      </span>
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      {description && <p className="max-w-md text-muted-foreground">{description}</p>}
      {children && <div className="mt-2 flex flex-wrap justify-center gap-2">{children}</div>}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-coral/25 bg-coral-soft px-3 py-1 text-xs font-semibold tracking-wide text-coral uppercase",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-coral" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center" ? "items-center text-center" : "items-start md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">{title}</h2>
        {description && <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>}
      </div>
      {action}
    </div>
  );
}

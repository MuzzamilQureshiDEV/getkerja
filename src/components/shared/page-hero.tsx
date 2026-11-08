import { cn } from "@/lib/utils";
import { Eyebrow } from "./section-heading";
import { SongketPattern } from "./songket-pattern";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b bg-mesh", className)}>
      <SongketPattern id="ph-songket" className="text-primary/[0.06] [mask-image:radial-gradient(70%_80%_at_50%_0%,black,transparent)]" />
      <div className="relative container-page py-14 sm:py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrow && <Eyebrow className="self-start">{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="text-lg text-muted-foreground sm:text-xl">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

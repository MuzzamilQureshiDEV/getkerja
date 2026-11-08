import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({ page, pages, buildHref }: { page: number; pages: number; buildHref: (p: number) => string }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter((n) => n === 1 || n === pages || Math.abs(n - page) <= 1);
  const items: (number | "…")[] = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1]! > 1) items.push("…");
    items.push(n);
  });
  const btn = "grid h-11 min-w-11 place-items-center rounded-xl border px-3 text-sm font-medium transition-colors";
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link href={buildHref(page - 1)} className={cn(btn, "bg-card hover:bg-muted")} aria-label="Previous page"><ChevronLeft className="size-4" /></Link>
      ) : (
        <span className={cn(btn, "opacity-40")} aria-hidden><ChevronLeft className="size-4" /></span>
      )}
      {items.map((n, i) =>
        n === "…" ? (
          <span key={`e${i}`} className="px-2 text-muted-foreground" aria-hidden>…</span>
        ) : (
          <Link
            key={n}
            href={buildHref(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(btn, n === page ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted")}
          >
            {n}
          </Link>
        ),
      )}
      {page < pages ? (
        <Link href={buildHref(page + 1)} className={cn(btn, "bg-card hover:bg-muted")} aria-label="Next page"><ChevronRight className="size-4" /></Link>
      ) : (
        <span className={cn(btn, "opacity-40")} aria-hidden><ChevronRight className="size-4" /></span>
      )}
    </nav>
  );
}

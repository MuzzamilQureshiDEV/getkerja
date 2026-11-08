"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  CATEGORIES,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
  SALARY_FILTERS,
  SORT_OPTIONS,
} from "@/lib/constants";
import type { JobSearchParams } from "@/lib/types";
import { cn } from "@/lib/utils";

const ANY = "__any";
type Key = keyof JobSearchParams;

function useFilterNav(params: JobSearchParams) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const go = (patch: Partial<JobSearchParams>) => {
    const next = new URLSearchParams();
    const merged = { ...params, ...patch, page: patch.page ?? undefined };
    for (const [k, v] of Object.entries(merged)) if (v && v !== ANY) next.set(k, String(v));
    start(() => router.push(`/jobs${next.size ? `?${next}` : ""}`, { scroll: false }));
  };
  return { go, pending };
}

const GROUPS: { key: Key; label: string; options: readonly { value: string; label: string }[] }[] = [
  { key: "category", label: "Job category", options: CATEGORIES.map((c) => ({ value: c.slug, label: c.name })) },
  { key: "type", label: "Job type", options: JOB_TYPES },
  { key: "experience", label: "Experience level", options: EXPERIENCE_LEVELS },
  { key: "salary", label: "Minimum salary", options: SALARY_FILTERS },
];

function FilterFields({ params, go }: { params: JobSearchParams; go: (p: Partial<JobSearchParams>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map((g) => (
        <div key={g.key} className="flex flex-col gap-2">
          <Label htmlFor={`f-${g.key}`} className="text-sm font-semibold">{g.label}</Label>
          <Select value={params[g.key] ?? ANY} onValueChange={(v) => go({ [g.key]: v === ANY ? undefined : v })}>
            <SelectTrigger id={`f-${g.key}`} className="w-full bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value={ANY}>Any</SelectItem>
              {g.options.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}

export function JobFilters({ params, total }: { params: JobSearchParams; total: number }) {
  const { go, pending } = useFilterNav(params);
  const [q, setQ] = useState(params.q ?? "");
  const active = GROUPS.filter((g) => params[g.key]);
  const clearAll = () => {
    setQ("");
    go({ q: undefined, category: undefined, type: undefined, experience: undefined, salary: undefined, posted: undefined });
  };

  return (
    <>
      {/* Search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form
          role="search"
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            go({ q: q.trim() || undefined });
          }}
        >
          <label htmlFor="jobs-q" className="sr-only">Search jobs by keyword</label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input id="jobs-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Role or skill" className="h-12 rounded-2xl bg-card pr-28 pl-12" />
          <Button type="submit" className="absolute top-1/2 right-1.5 -translate-y-1/2" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : null} Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="h-12 flex-1 lg:hidden">
                <SlidersHorizontal /> Filters
                {active.length > 0 && <span className="grid size-5 place-items-center rounded-full bg-coral text-[11px] text-white">{active.length}</span>}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter jobs</SheetTitle>
                <SheetDescription>{total} jobs match your filters</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-6">
                <FilterFields params={params} go={go} />
                {active.length > 0 && (
                  <Button variant="ghost" className="mt-4 w-full" onClick={clearAll}>Clear all filters</Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <label htmlFor="jobs-sort" className="sr-only">Sort by</label>
          <Select value={params.sort ?? (params.q ? "relevance" : "newest")} onValueChange={(v) => go({ sort: v })}>
            <SelectTrigger id="jobs-sort" className="h-12! flex-1 bg-card sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" align="end">
              {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active chips */}
      {(active.length > 0 || params.q) && (
        <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
          {params.q && (
            <Chip onRemove={() => { setQ(""); go({ q: undefined }); }}>“{params.q}”</Chip>
          )}
          {active.map((g) => (
            <Chip key={g.key} onRemove={() => go({ [g.key]: undefined })}>
              {g.options.find((o) => o.value === params[g.key])?.label ?? params[g.key]}
            </Chip>
          ))}
          <button onClick={clearAll} className="min-h-9 cursor-pointer px-2 text-sm font-medium text-primary hover:underline">Clear all</button>
        </div>
      )}
    </>
  );
}

export function JobFiltersSidebar({ params }: { params: JobSearchParams }) {
  const { go, pending } = useFilterNav(params);
  return (
    <aside aria-label="Job filters" className={cn("sticky top-24 hidden rounded-3xl border bg-card p-6 transition-opacity lg:block", pending && "opacity-70")}>
      <h2 className="mb-5 flex items-center gap-2 font-heading text-lg font-semibold"><SlidersHorizontal className="size-5 text-primary" aria-hidden /> Filters</h2>
      <FilterFields params={params} go={go} />
    </aside>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-secondary py-1 pr-1 pl-3 text-sm font-medium">
      {children}
      <button onClick={onRemove} aria-label={`Remove filter ${typeof children === "string" ? children : ""}`} className="grid size-7 cursor-pointer place-items-center rounded-full hover:bg-background">
        <X className="size-3.5" aria-hidden />
      </button>
    </span>
  );
}

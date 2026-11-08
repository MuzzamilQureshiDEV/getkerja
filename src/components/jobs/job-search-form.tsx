"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOB_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Labels = { keyword: string; type: string; search: string };
const ALL = "__all";

export function JobSearchForm({
  labels = { keyword: "Job title or keyword", type: "Job type", search: "Search" },
  className,
}: {
  labels?: Labels;
  className?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [type, setType] = useState(ALL);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (type !== ALL) p.set("type", type);
    router.push(`/jobs${p.size ? `?${p}` : ""}`);
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn(
        "grid gap-2 rounded-3xl border bg-card/90 p-2 shadow-2xl shadow-primary/10 backdrop-blur-xl md:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_auto] md:gap-0 md:rounded-full md:p-2",
        className,
      )}
    >
      <label className="relative flex items-center md:border-r">
        <span className="sr-only">{labels.keyword}</span>
        <Search className="pointer-events-none absolute left-4 size-5 text-muted-foreground" aria-hidden />
        <input
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.keyword}
          autoComplete="off"
          className="h-13 w-full rounded-2xl bg-transparent pr-3 pl-12 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/40 md:rounded-full"
        />
      </label>
      <div className="relative flex items-center">
        <Briefcase className="pointer-events-none absolute left-4 z-10 size-5 text-teal" aria-hidden />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger aria-label={labels.type} className="h-13! w-full min-w-0 rounded-2xl border-0 bg-transparent! pl-12 text-base shadow-none md:rounded-full md:pl-11">
            <SelectValue placeholder={labels.type} />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value={ALL}>Any job type</SelectItem>
            {JOB_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" size="lg" variant="accent" className="h-13 rounded-2xl px-8 md:rounded-full md:px-7">
        <Search className="size-5" /> {labels.search}
      </Button>
    </form>
  );
}

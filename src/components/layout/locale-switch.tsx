"use client";

import { useTransition } from "react";
import { setLocaleAction } from "@/lib/actions/site";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitch({ locale, className }: { locale: Locale; className?: string }) {
  const [pending, start] = useTransition();
  return (
    <div role="group" aria-label="Language" className={cn("inline-flex rounded-full border bg-background/60 p-0.5 text-xs font-semibold", pending && "opacity-60", className)}>
      {(["en", "ms"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={locale === l}
          onClick={() => start(() => setLocaleAction(l))}
          className={cn(
            "min-h-8 min-w-9 cursor-pointer rounded-full px-2 uppercase transition-colors",
            locale === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l === "en" ? "EN" : "BM"}
        </button>
      ))}
    </div>
  );
}

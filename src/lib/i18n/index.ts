import { en } from "./en";
import { ms } from "./ms";

export const LOCALES = ["en", "ms"] as const;
export type Locale = (typeof LOCALES)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ms };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

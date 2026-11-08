import "server-only";
import { cookies } from "next/headers";
import { getDictionary, isLocale, type Locale } from ".";

export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get("locale")?.value;
  return isLocale(v) ? v : "en";
}

export async function getT() {
  const locale = await getLocale();
  return { locale, t: getDictionary(locale) };
}

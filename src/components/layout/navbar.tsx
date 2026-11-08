import { getT } from "@/lib/i18n/server";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const { t, locale } = await getT();
  return <NavbarClient t={t.nav} locale={locale} />;
}

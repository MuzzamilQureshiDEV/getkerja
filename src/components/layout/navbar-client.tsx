"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

export function NavbarClient({ t, locale }: { t: Dictionary["nav"]; locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.home },
    { href: "/jobs", label: t.jobs },
    { href: "/employers", label: t.employers },
    { href: "/about", label: t.about },
    { href: "/blog", label: t.blog },
    { href: "/contact", label: t.contact },
  ];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b bg-background/80 shadow-sm shadow-primary/[0.03] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(l.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LocaleSwitch locale={locale} className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button asChild variant="accent" className="hidden sm:inline-flex">
            <Link href="/apply"><Send /> {t.apply}</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86vw] max-w-sm flex-col gap-0 p-0">
              <SheetHeader className="border-b p-5">
                <SheetTitle asChild>
                  <div><Logo /></div>
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 p-4">
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                    <SheetClose asChild>
                      <Link
                        href={l.href}
                        aria-current={isActive(l.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors",
                          isActive(l.href) ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {l.label}
                      </Link>
                    </SheetClose>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t p-4">
                <LocaleSwitch locale={locale} className="self-start sm:hidden" />
                <SheetClose asChild>
                  <Button asChild variant="accent" size="lg"><Link href="/apply"><Send /> {t.apply}</Link></Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

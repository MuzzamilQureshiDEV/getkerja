import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SongketPattern } from "@/components/shared/songket-pattern";
import { CATEGORIES, JOB_TYPES, SITE } from "@/lib/constants";
import { getT } from "@/lib/i18n/server";

export async function Footer() {
  const { t } = await getT();
  const quick = [
    { href: "/jobs", label: t.nav.jobs },
    { href: "/employers", label: t.nav.employers },
    { href: "/apply", label: t.nav.apply },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/faq", label: t.footer.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-white/80">
      <SongketPattern id="ft-songket" className="text-white/[0.035]" />
      <div className="relative container-page py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-12">
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-3 lg:col-span-1">
            <div className="[&_span]:text-white"><Logo /></div>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">{t.footer.blurb}</p>
          </div>

          <FooterCol title={t.footer.quickLinks}>
            {quick.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </FooterCol>
          <FooterCol title={t.footer.categories}>
            {CATEGORIES.slice(0, 7).map((c) => <FooterLink key={c.slug} href={`/jobs?category=${c.slug}`}>{c.name}</FooterLink>)}
          </FooterCol>
          <FooterCol title={t.footer.jobTypes}>
            {JOB_TYPES.map((j) => (
              <FooterLink key={j.value} href={`/jobs?type=${j.value}`}>Remote {j.label.toLowerCase()} jobs</FooterLink>
            ))}
          </FooterCol>
          <FooterCol title={t.footer.contact} className="col-span-2 sm:col-span-1">
            <li className="flex gap-2.5 text-sm text-white/65">
              <MapPin className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden />
              <address className="not-italic">{SITE.address.street}, {SITE.address.postcode} {SITE.address.city}</address>
            </li>
            <li><a className="flex items-center gap-2.5 text-sm text-white/65 hover:text-white" href={`mailto:${SITE.email}`}><Mail className="size-4 text-coral" aria-hidden />{SITE.email}</a></li>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name} Sdn. Bhd. (Reg. No. 20260111) · {t.footer.rights}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link className="hover:text-white" href="/privacy">{t.footer.privacy}</Link></li>
            <li><Link className="hover:text-white" href="/terms">{t.footer.terms}</Link></li>
            <li><Link className="hover:text-white" href="/privacy#pdpa">{t.footer.pdpa}</Link></li>
            <li><Link className="hover:text-white" href="/faq">{t.footer.faq}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-heading text-sm font-semibold tracking-wide text-white uppercase">{title}</h2>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-white/65 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}

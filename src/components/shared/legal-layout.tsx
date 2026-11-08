import { PageHero } from "./page-hero";

export function LegalLayout({
  title,
  updated,
  toc,
  children,
}: {
  title: string;
  updated: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={`Last updated: ${updated}`} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">On this page</p>
            <ol className="flex flex-col gap-1 border-l text-sm">
              {toc.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-muted-foreground hover:border-primary hover:text-foreground">{t.label}</a></li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="prose-article max-w-3xl [&_h2]:scroll-mt-24">
          <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground">
            <strong>Template notice:</strong> This document is placeholder content to help you get started. Have it reviewed by a Malaysian legal professional before launch.
          </p>
          {children}
        </div>
      </div>
    </>
  );
}

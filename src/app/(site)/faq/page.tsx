import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FEE_TEXT, SELECTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Answers to common questions from job seekers and employers using getKerja in Malaysia.",
  alternates: { canonical: "/faq" },
};

const GROUPS = [
  {
    title: "Applying for a job",
    items: [
      { q: "Is getKerja free for job seekers?", a: `Browsing jobs, applying and your first online interview are free. Based on your interview, a selection fee of ${FEE_TEXT} (depending on the role) applies to lock in your place in the selection process.` },
      { q: "When do I pay the selection fee, and how much?", a: `Only after your interview. We confirm the exact amount (${FEE_TEXT}) and how to pay by email from our official address before you pay anything. You’re never asked to pay to apply, and you can choose not to continue.` },
      { q: "When will I know if I’m selected?", a: `Selected candidates receive their job offer by email within ${SELECTION.offerDays} working days and can then start working remotely.` },
      { q: "Do I need an account to apply?", a: "No. Just fill in the application form, attach your CV and choose the job. There’s nothing to sign up for." },
      { q: "Are all jobs remote?", a: "Yes. Every job on getKerja is remote, open to candidates based anywhere in Malaysia." },
      { q: "What CV formats are accepted?", a: "PDF, DOC and DOCX up to 5 MB. PDF is recommended so your formatting stays intact." },
      { q: "What happens after I apply?", a: `You’ll get a confirmation email straight away. Our recruiters review your CV, and if you’re shortlisted we reply with a Google Meet link for your online interview. Based on the interview, a ${FEE_TEXT} selection fee locks in your place in the selection process, and selected candidates receive their offer within ${SELECTION.offerDays} working days.` },
      { q: "How long until I hear back?", a: "Usually within 2–3 working days. If you haven’t heard from us after a week, the role may have been filled — feel free to apply for others." },
      { q: "Can I apply for more than one job?", a: "Yes — submit the form once for each job you’re interested in." },
    ],
  },
  {
    title: "Interviews",
    items: [
      { q: "How are interviews held?", a: "All interviews are online via Google Meet. You just need a laptop or phone with a camera, a stable internet connection and a quiet spot." },
      { q: "How do I know an employer is genuine?", a: "Look for the verified badge — it means we’ve checked the company’s SSM registration. We never charge to apply or to be interviewed; the only fee is the selection fee confirmed by email after your interview. Ignore any other payment request claiming to be from us and report it." },
    ],
  },
  {
    title: "Privacy",
    items: [
      { q: "Who can see my CV?", a: "Only our recruitment team and the company hiring for the role you applied to. We never sell your data. Read our Privacy Notice for details on how we comply with the PDPA 2010." },
      { q: "How do I ask you to delete my data?", a: "Email privacy@getkerja.my and we’ll delete your application and CV within 21 days, as required by the PDPA." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Help centre" title="Frequently asked questions" description="Can't find what you're looking for? Our team is happy to help." />
      <div className="container-page max-w-3xl py-12">
        {GROUPS.map((g, gi) => (
          <section key={g.title} className="mb-10" aria-labelledby={`faq-g${gi}`}>
            <h2 id={`faq-g${gi}`} className="mb-4 text-2xl font-bold">{g.title}</h2>
            <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6">
              {g.items.map((f, i) => (
                <AccordionItem key={i} value={`${g.title}-${i}`}>
                  <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
        <div className="flex flex-col items-center gap-4 rounded-3xl border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">Still have questions?</h2>
          <Button asChild size="lg"><Link href="/contact">Contact support</Link></Button>
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}

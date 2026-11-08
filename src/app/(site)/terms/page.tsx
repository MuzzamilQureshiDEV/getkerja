import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/legal-layout";
import { FEE_TEXT, SELECTION, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using getKerja as a candidate or employer.",
  alternates: { canonical: "/terms" },
};

const TOC = [
  { id: "accept", label: "Acceptance" },
  { id: "applications", label: "Applications" },
  { id: "candidates", label: "Candidates" },
  { id: "employers", label: "Employers" },
  { id: "prohibited", label: "Prohibited use" },
  { id: "fees", label: "Selection fee" },
  { id: "liability", label: "Liability" },
  { id: "law", label: "Governing law" },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="8 November 2026" toc={TOC}>
      <h2 id="accept">1. Acceptance of terms</h2>
      <p>By accessing or using {SITE.name}, you agree to these Terms and our Privacy Notice. If you do not agree, please do not use the service.</p>
      <h2 id="applications">2. Applications</h2>
      <p>You must be at least 16 years old and based in Malaysia to apply. Information and CVs you submit must be accurate and your own. Submitting an application does not guarantee an interview or employment.</p>
      <h2 id="candidates">3. Candidates</h2>
      <ul>
        <li>Information in your profile and CV must be truthful.</li>
        <li>{SITE.name} does not guarantee interviews or employment.</li>
        <li>Applying and interviewing are free. The only fee {SITE.name} charges candidates is the selection fee described in section 6. Never pay anyone else claiming to act for us — report such requests.</li>
      </ul>
      <h2 id="employers">4. Employers</h2>
      <ul>
        <li>Job postings must be for genuine vacancies and comply with the Employment Act 1955, anti-discrimination best practices and all applicable laws.</li>
        <li>Salary information must be accurate where provided.</li>
        <li>Candidate data may be used solely for recruitment and must be handled in compliance with the PDPA.</li>
        <li>We may verify your business with SSM and remove listings that breach these Terms.</li>
      </ul>
      <h2 id="prohibited">5. Prohibited use</h2>
      <p>You must not post fraudulent, misleading, discriminatory or illegal content; scrape or harvest data; send spam; or attempt to compromise the platform’s security.</p>
      <h2 id="fees">6. Selection fee</h2>
      <ul>
        <li>After your online interview, and based on its outcome and the role, you may be invited to continue in the selection process. A selection fee of <strong>{FEE_TEXT}</strong> applies to lock in your place.</li>
        <li>The exact amount and payment instructions are confirmed by email from our official address before any payment. You are free to decline and withdraw at no cost.</li>
        <li>Selected candidates receive their job offer within <strong>{SELECTION.offerDays} working days</strong> of completing the selection process.</li>
        <li>Fees are in Ringgit Malaysia (MYR). Employer service fees are agreed separately in writing.</li>
      </ul>
      <h2 id="liability">7. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, {SITE.name} is not liable for indirect or consequential losses, or for the conduct of Candidates or Employers.</p>
      <h2 id="law">8. Governing law</h2>
      <p>These Terms are governed by the laws of Malaysia, and disputes are subject to the exclusive jurisdiction of the courts of Kuala Lumpur.</p>
    </LegalLayout>
  );
}

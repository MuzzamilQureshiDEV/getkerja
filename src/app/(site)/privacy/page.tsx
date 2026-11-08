import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/legal-layout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy & PDPA Notice",
  description: "How getKerja collects, uses and protects personal data of candidates and employers under Malaysia's Personal Data Protection Act 2010 (PDPA).",
  alternates: { canonical: "/privacy" },
};

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "data", label: "Data we collect" },
  { id: "purpose", label: "Why we use it" },
  { id: "sharing", label: "Disclosure" },
  { id: "pdpa", label: "PDPA notice (7 principles)" },
  { id: "rights", label: "Your rights" },
  { id: "retention", label: "Retention & security" },
  { id: "cookies", label: "Cookies" },
  { id: "transfer", label: "Cross-border transfer" },
  { id: "contact", label: "Contact our DPO" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy & PDPA Notice" updated="8 November 2026" toc={TOC}>
      <h2 id="intro">1. Introduction</h2>
      <p>
        {SITE.name} (“we”, “us”) respects your privacy. This Privacy Notice explains how we process personal data of job
        seekers who apply through our website (“Candidates”), hiring companies (“Employers”) and visitors in accordance with the <strong>Personal Data Protection Act 2010 (PDPA)</strong> of Malaysia
        and its amendments. This notice is available in English and Bahasa Malaysia; in case of inconsistency, the English version prevails.
      </p>

      <h2 id="data">2. Personal data we collect</h2>
      <ul>
        <li><strong>Candidates (via the application form):</strong> name, email, phone number, city/state, CV/résumé, cover letter, LinkedIn or portfolio link, expected salary and notice period, and any personal data inside your CV.</li>
        <li><strong>Interviews:</strong> the email correspondence we exchange with you and notes our recruiters make during online interviews. We do not record interviews without your consent.</li>
        <li><strong>Employers and enquiries:</strong> name, work email, phone, company name and the details you send via our contact form.</li>
        <li><strong>Everyone:</strong> basic device and usage data, IP address (for spam prevention) and cookies. We do not operate user accounts.</li>
      </ul>
      <p>We do not ask for sensitive personal data (e.g. religion, health, political opinions) and recommend you do not include your MyKad number or photo in your CV unless an employer specifically requests it.</p>

      <h2 id="purpose">3. Purposes of processing</h2>
      <ol>
        <li>To receive and assess your job application and CV.</li>
        <li>To contact you by email, including sending a Google Meet link for an online interview.</li>
        <li>To share shortlisted applications with the hiring company for the role you applied to.</li>
        <li>To send newsletters you have subscribed to (you can unsubscribe anytime).</li>
        <li>To verify Employers and prevent fraud, spam and misuse.</li>
        <li>To improve our services through aggregated, anonymised analytics.</li>
        <li>To comply with legal obligations.</li>
      </ol>

      <h2 id="sharing">4. Disclosure of personal data</h2>
      <p>
        Your application is emailed to our recruitment team. If you are shortlisted, your CV and interview notes are disclosed <strong>only to the Employer for that job</strong>.
        We use service providers to run our website, email and video interviews (e.g. hosting, email delivery, Google Workspace / Google Meet) under written contracts,
        and may disclose data to authorities where required by law. <strong>We never sell personal data.</strong>
      </p>

      <h2 id="pdpa">5. PDPA notice — the 7 principles</h2>
      <ul>
        <li><strong>General Principle:</strong> we process personal data only with your consent or where otherwise permitted by the PDPA.</li>
        <li><strong>Notice and Choice:</strong> this notice tells you what we collect and why. Providing data is voluntary, but without it we may be unable to process your application.</li>
        <li><strong>Disclosure:</strong> we disclose data only for the purposes stated above, or with your consent.</li>
        <li><strong>Security:</strong> we take practical steps to protect data from loss, misuse, modification and unauthorised access, including encryption in transit and restricted access to our recruitment inbox.</li>
        <li><strong>Retention:</strong> we keep data only as long as necessary for the purposes collected.</li>
        <li><strong>Data Integrity:</strong> we take reasonable steps to keep data accurate, complete and up to date — email us to update your details or send a new CV.</li>
        <li><strong>Access:</strong> you may request access to and correction of your personal data.</li>
      </ul>
      <p>Employers who receive candidate data act as independent data users and must process it in compliance with the PDPA, solely for recruitment.</p>

      <h2 id="rights">6. Your rights</h2>
      <p>You may request to access, correct, or delete your data, withdraw consent, or limit processing (including opting out of marketing emails via the unsubscribe link). We respond within 21 days as required by the PDPA. A reasonable fee may apply for data access requests as permitted by regulations.</p>

      <h2 id="retention">7. Retention & security</h2>
      <p>Applications, CVs and related emails are retained for up to 24 months after submission so we can consider you for future remote roles, then deleted. You can ask us to delete them sooner at any time.</p>

      <h2 id="cookies">8. Cookies</h2>
      <p>We use essential cookies (e.g. to remember your language and theme), and — with your consent — analytics cookies. You can control cookies in your browser settings.</p>

      <h2 id="transfer">9. Cross-border transfer</h2>
      <p>Our service providers may store data outside Malaysia. Where this occurs, we ensure the transfer complies with section 129 of the PDPA and that comparable protection applies.</p>

      <h2 id="contact">10. Contact our Data Protection Officer</h2>
      <p>
        Email: <a href="mailto:hr@getkerja.my">hr@getkerja.my</a>
      </p>
    </LegalLayout>
  );
}

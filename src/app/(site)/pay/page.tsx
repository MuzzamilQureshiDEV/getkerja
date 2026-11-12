import type { Metadata } from "next";
import { Mail, ShieldAlert } from "lucide-react";
import { TngPay } from "@/components/pay/tng-pay";
import { PageHero } from "@/components/shared/page-hero";
import { FEE_TEXT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pay Selection Fee",
  description: "Pay your getKerja selection fee with Touch 'n Go eWallet or any DuitNow QR banking app.",
  alternates: { canonical: "/pay" },
  robots: { index: false, follow: false },
};

const STEPS = [
  "Tap “Save QR to your phone”.",
  "Open Touch ’n Go eWallet (or any banking app with DuitNow QR) and tap Scan.",
  "Tap the gallery / photo icon and choose the saved QR.",
  "Check the name shows QURESHI MUZAMMIL AHMED GETKERJA, enter the amount we emailed you, and pay.",
  `Email a screenshot of your receipt with your full name to ${SITE.applicationsEmail}.`,
];

export default function PayPage() {
  return (
    <>
      <PageHero title={<>Pay your <span className="text-gradient">selection fee</span></>} />
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:py-14">
        <TngPay />

        <div className="flex flex-col gap-5">
          <div className="flex gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
            <p>
              <strong>Only pay after your interview</strong>, and only the exact amount we confirmed to you by email from {SITE.applicationsEmail} (between{" "}
              {FEE_TEXT}). If you haven’t had an interview with us yet, please don’t pay.
            </p>
          </div>

          <div className="rounded-3xl border bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold">How to pay on your phone</h2>
            <ol className="flex flex-col gap-3">
              {STEPS.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">On a computer? Just scan the QR with your phone’s eWallet or banking app.</p>
          </div>

          <a href={`mailto:${SITE.applicationsEmail}?subject=Selection%20fee%20payment%20receipt`} className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-4 text-sm font-medium hover:bg-secondary">
            <Mail className="size-5 shrink-0 text-primary" aria-hidden />
            Send your receipt to {SITE.applicationsEmail}
          </a>
        </div>
      </div>
    </>
  );
}

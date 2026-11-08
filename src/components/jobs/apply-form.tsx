"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormMessage } from "@/components/forms/field";
import { FileDrop } from "@/components/forms/file-drop";
import { useFormAction } from "@/hooks/use-form-action";
import { applyAction } from "@/lib/actions/apply";
import { CV_MAX_BYTES, FEE_TEXT, SELECTION } from "@/lib/constants";
import type { ActionState } from "@/lib/types";

export type JobOption = { id: string; title: string; company: string };
type Applied = { jobTitle: string; email: string };

export function ApplyForm({ jobs, defaultJobId }: { jobs: JobOption[]; defaultJobId?: string }) {
  const [state, onSubmit, pending] = useFormAction<ActionState<Applied>>(applyAction, { ok: false });
  const [jobId, setJobId] = useState(jobs.some((j) => j.id === defaultJobId) ? defaultJobId! : "");
  const [coverLen, setCoverLen] = useState(0);
  const fe = state.fieldErrors ?? {};

  if (state.ok && state.data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 rounded-3xl border bg-card px-6 py-14 text-center"
        role="status"
        aria-live="polite"
      >
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }} className="grid size-20 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-10" aria-hidden />
        </motion.span>
        <h2 className="text-3xl font-bold">Application sent!</h2>
        <p className="max-w-md text-muted-foreground">
          Thanks — we’ve received your application for <strong className="text-foreground">{state.data.jobTitle}</strong>. A confirmation is on its way to{" "}
          <strong className="text-foreground">{state.data.email}</strong>.
        </p>
        <ol className="grid w-full max-w-md gap-3 text-left text-sm">
          <li className="flex gap-3 rounded-2xl bg-secondary/60 p-4"><Mail className="size-5 shrink-0 text-primary" aria-hidden />Our team reviews your CV, usually within 2–3 working days.</li>
          <li className="flex gap-3 rounded-2xl bg-secondary/60 p-4"><CalendarCheck className="size-5 shrink-0 text-coral" aria-hidden />If you’re shortlisted, we’ll reply by email with a Google Meet link for your online interview. Based on the interview, a {FEE_TEXT} selection fee locks in your place.</li>
          <li className="flex gap-3 rounded-2xl bg-secondary/60 p-4"><CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden />Selected candidates receive their job offer within {SELECTION.offerDays} working days.</li>
        </ol>
        <Button asChild size="lg" variant="outline"><Link href="/jobs">Browse more remote jobs</Link></Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <FormMessage ok={state.ok} message={state.message} />
      {/* Honeypot: hidden from people, bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Section n={1} title="Fill in your details & attach your CV">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full name" required error={fe.name}>
            {(p) => <Input {...p} name="name" autoComplete="name" />}
          </Field>
          <Field id="email" label="Email" required error={fe.email} hint="We’ll send your interview link here">
            {(p) => <Input {...p} name="email" type="email" autoComplete="email" inputMode="email" />}
          </Field>
          <Field id="phone" label="Mobile number" required error={fe.phone} hint="e.g. 012-345 6789">
            {(p) => <Input {...p} name="phone" type="tel" autoComplete="tel" inputMode="tel" />}
          </Field>
          <Field id="location" label="Where are you based?" required error={fe.location} hint="City / state, e.g. Ipoh, Perak">
            {(p) => <Input {...p} name="location" autoComplete="address-level2" />}
          </Field>
        </div>
        <Field id="cv" label="CV / résumé" required error={fe.cv}>
          {(p) => (
            <FileDrop
              id={p.id}
              name="cv"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              maxBytes={CV_MAX_BYTES}
              label="Drag & drop your CV here, or"
              hint="PDF, DOC or DOCX · max 5 MB"
              invalid={p["aria-invalid"]}
              describedBy={p["aria-describedby"]}
            />
          )}
        </Field>
      </Section>

      <Section n={2} title="Select the job">
        <Field id="jobId" label="Which remote job are you applying for?" required error={fe.jobId}>
          {(p) => (
            <>
              <input type="hidden" name="jobId" value={jobId} />
              <Select value={jobId} onValueChange={setJobId}>
                <SelectTrigger id={p.id} aria-invalid={p["aria-invalid"]} aria-describedby={p["aria-describedby"]} className="w-full">
                  <SelectValue placeholder="Choose a job" />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-80">
                  {jobs.map((j) => (
                    <SelectItem key={j.id} value={j.id}>{j.title} — {j.company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="expectedSalary" label="Expected salary (RM / month)" error={fe.expectedSalary}>
            {(p) => <Input {...p} name="expectedSalary" type="number" inputMode="numeric" min={0} step={100} placeholder="e.g. 5000" />}
          </Field>
          <Field id="noticePeriod" label="Notice period" error={fe.noticePeriod}>
            {(p) => <Input {...p} name="noticePeriod" placeholder="e.g. 1 month / Immediate" />}
          </Field>
          <Field id="linkedin" label="LinkedIn / portfolio" error={fe.linkedin}>
            {(p) => <Input {...p} name="linkedin" type="url" inputMode="url" placeholder="Optional" />}
          </Field>
        </div>
        <Field id="coverLetter" label="Why are you a good fit?" error={fe.coverLetter} hint={`Optional · ${coverLen}/4000`}>
          {(p) => <Textarea {...p} name="coverLetter" rows={5} maxLength={4000} onChange={(e) => setCoverLen(e.target.value.length)} placeholder="A few lines about your experience and why this role interests you." />}
        </Field>
      </Section>

      <div className="flex flex-col gap-4 rounded-3xl border bg-card p-5 sm:p-7">
        <label className="flex items-start gap-3 text-sm">
          <Checkbox name="consent" value="on" id="consent" className="mt-0.5" aria-invalid={fe.consent ? true : undefined} aria-describedby={fe.consent ? "consent-err" : undefined} />
          <span>
            I understand that applying is free and that, after an interview, a {FEE_TEXT} selection fee applies if I choose to continue. I agree that getKerja may process my details and CV for this application and share them with the hiring company, in line with the{" "}
            <Link href="/privacy#pdpa" className="font-medium text-primary underline underline-offset-4" target="_blank">Privacy Notice (PDPA 2010)</Link>.
          </span>
        </label>
        {fe.consent && <p id="consent-err" className="text-sm font-medium text-destructive">{fe.consent[0]}</p>}
        <Button type="submit" size="lg" variant="accent" disabled={pending} className="sm:self-end sm:min-w-60">
          {pending ? <><Loader2 className="animate-spin" /> Sending…</> : <><Send /> Send application</>}
        </Button>
      </div>
    </form>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5 rounded-3xl border bg-card p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <h2 className="flex items-center gap-3 font-heading text-lg font-semibold">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground" aria-hidden>{n}</span>
        {title}
      </h2>
      {children}
    </fieldset>
  );
}

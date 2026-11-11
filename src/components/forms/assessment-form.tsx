"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormMessage } from "@/components/forms/field";
import { useFormAction } from "@/hooks/use-form-action";
import { assessmentAction } from "@/lib/actions/assessment";
import {
  CATEGORIES, EDUCATION_LEVELS, ENGLISH_LEVELS, EQUIPMENT, INTERVIEW_TIMES, MY_STATES, SITE, STUDENT_STATUS, TIME_IN_MALAYSIA, WEEKLY_HOURS,
} from "@/lib/constants";
import { formatMyMobile, myMobileDigits } from "@/lib/phone";
import type { ActionState } from "@/lib/types";
import { cn } from "@/lib/utils";

type Submitted = { email: string };

export function AssessmentForm() {
  const [state, onSubmit, pending] = useFormAction<ActionState<Submitted>>(assessmentAction, { ok: false });
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [closed, setClosed] = useState<object | null>(null);
  const fe = state.ok ? {} : (state.fieldErrors ?? {});
  const open = state.ok && closed !== state;

  const close = () => {
    setClosed(state);
    formRef.current?.reset();
    setPhone("");
    setLocation("");
    setRole("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
        {!state.ok && <FormMessage ok={false} message={state.message} />}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Section n={1} title="About you">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" required error={fe.name}>
              {(p) => <Input {...p} name="name" autoComplete="name" />}
            </Field>
            <Field id="email" label="Email" required error={fe.email} hint="Your interview link will be sent here">
              {(p) => <Input {...p} name="email" type="email" autoComplete="email" inputMode="email" />}
            </Field>
            <Field id="phone" label="Mobile number" required error={fe.phone} hint="Malaysian mobile, e.g. 12-345 6789">
              {(p) => (
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r px-3.5 text-sm font-medium text-muted-foreground">+60</span>
                  <Input {...p} name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="12-345 6789" value={phone}
                    onChange={(e) => setPhone(formatMyMobile(myMobileDigits(e.target.value)))} className="pl-16" />
                </div>
              )}
            </Field>
            <Field id="location" label="Which state are you in?" required error={fe.location}>
              {(p) => <SimpleSelect {...p} name="location" value={location} onChange={setLocation} placeholder="Choose your state" options={MY_STATES.map((s) => [s, s])} />}
            </Field>
          </div>
          <Pills name="timeInMalaysia" label="How long have you been in Malaysia?" options={TIME_IN_MALAYSIA} error={fe.timeInMalaysia} />
          <Pills name="student" label="Are you a student?" options={STUDENT_STATUS} error={fe.student} />
        </Section>

        <Section n={2} title="Your skills">
          <Pills name="education" label="Highest education" options={EDUCATION_LEVELS} error={fe.education} />
          <Pills name="english" label="Your English level" options={ENGLISH_LEVELS} error={fe.english} />
          <Field id="role" label="What kind of remote work do you want?" required error={fe.role}>
            {(p) => <SimpleSelect {...p} name="role" value={role} onChange={setRole} placeholder="Choose a type of work" options={CATEGORIES.map((c) => [c.slug, c.name])} />}
          </Field>
        </Section>

        <Section n={3} title="Your availability">
          <Pills name="hours" label="How many hours a week can you work?" options={WEEKLY_HOURS} error={fe.hours} />
          <Pills name="equipment" label="What do you have? (tick all that apply)" options={EQUIPMENT} multiple required={false} />
          <Pills name="interviewTime" label="Best time for your interview" options={INTERVIEW_TIMES} error={fe.interviewTime} />
          <Field id="notes" label="Anything else we should know?" error={fe.notes} hint="Optional">
            {(p) => <Textarea {...p} name="notes" rows={3} maxLength={1000} placeholder="e.g. experience, skills or questions" />}
          </Field>
        </Section>

        <div className="flex flex-col gap-4 rounded-3xl border bg-card p-5 sm:p-7">
          <label className="flex items-start gap-3 text-sm">
            <Checkbox name="consent" value="on" id="consent" className="mt-0.5" aria-invalid={fe.consent ? true : undefined} aria-describedby={fe.consent ? "consent-err" : undefined} />
            <span>
              I agree that getKerja may process my details for this assessment, in line with the{" "}
              <Link href="/privacy#pdpa" className="font-medium text-primary underline underline-offset-4" target="_blank">Privacy Notice (PDPA 2010)</Link>.
            </span>
          </label>
          {fe.consent && <p id="consent-err" className="text-sm font-medium text-destructive">{fe.consent[0]}</p>}
          <Button type="submit" size="lg" variant="accent" disabled={pending} className="sm:self-end sm:min-w-60">
            {pending ? <><Loader2 className="animate-spin" /> Submitting…</> : <><Send /> Submit assessment</>}
          </Button>
        </div>
      </form>

      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 pt-2 text-center">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="size-9" aria-hidden />
            </motion.span>
            <DialogTitle className="text-2xl font-bold">Your assessment form is submitted</DialogTitle>
            <DialogDescription className="text-base">
              You will receive your assessment interview meeting link via email
              {state.data?.email && <> at <strong className="text-foreground">{state.data.email}</strong></>}.
            </DialogDescription>
            <p className="flex items-start gap-2 rounded-2xl bg-secondary/60 p-3 text-left text-sm text-muted-foreground">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              It will come from {SITE.applicationsEmail}. Please check your spam folder too.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button size="lg" onClick={close} className="w-full sm:w-auto">Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-6 rounded-3xl border bg-card p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <h2 className="flex items-center gap-3 font-heading text-lg font-semibold">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground" aria-hidden>{n}</span>
        {title}
      </h2>
      {children}
    </fieldset>
  );
}

/** Tap-to-choose buttons (native radios/checkboxes, so they post with the form). */
function Pills({
  name, label, options, error, multiple = false, required = true,
}: {
  name: string;
  label: string;
  options: readonly string[];
  error?: string[];
  multiple?: boolean;
  required?: boolean;
}) {
  const errId = `${name}-err`;
  return (
    <fieldset className="flex flex-col gap-2.5" aria-describedby={error ? errId : undefined}>
      <legend className="mb-2.5 text-sm font-semibold">
        {label}
        {required && <span className="text-coral" aria-hidden>*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type={multiple ? "checkbox" : "radio"} name={name} value={o} className="peer sr-only" aria-invalid={error ? true : undefined} />
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full border bg-background px-4 py-2.5 text-sm font-medium transition-colors select-none",
                "hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
                "peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 [&>svg]:hidden peer-checked:[&>svg]:block",
                error && "border-destructive/60",
              )}
            >
              <Check className="size-4" aria-hidden />
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && <p id={errId} className="text-sm font-medium text-destructive">{error[0]}</p>}
    </fieldset>
  );
}

function SimpleSelect({
  id, name, value, onChange, placeholder, options, ...aria
}: {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: [string, string][];
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  required?: boolean;
}) {
  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} aria-invalid={aria["aria-invalid"]} aria-describedby={aria["aria-describedby"]} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-72">
          {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
        </SelectContent>
      </Select>
    </>
  );
}

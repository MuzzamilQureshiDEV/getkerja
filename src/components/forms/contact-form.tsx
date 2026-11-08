"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormMessage } from "@/components/forms/field";
import { useFormAction } from "@/hooks/use-form-action";
import { contactAction } from "@/lib/actions/site";
import type { ActionState } from "@/lib/types";

const TOPICS = [
  { value: "candidate", label: "I'm a job seeker" },
  { value: "employer", label: "I'm an employer / hiring" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media enquiry" },
  { value: "other", label: "Something else" },
];

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [state, onSubmit, pending] = useFormAction<ActionState>(contactAction, { ok: false });
  const [startedAt] = useState(() => Date.now());
  const [topic, setTopic] = useState(TOPICS.some((t) => t.value === defaultTopic) ? defaultTopic! : "candidate");
  const fe = state.fieldErrors ?? {};

  if (state.ok) {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="size-14 text-success" aria-hidden />
        <p className="text-xl font-semibold">Message sent</p>
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <FormMessage message={state.message} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from humans & assistive tech; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Your name" required error={fe.name}>{(p) => <Input {...p} name="name" autoComplete="name" />}</Field>
        <Field id="c-email" label="Email" required error={fe.email}>{(p) => <Input {...p} name="email" type="email" autoComplete="email" inputMode="email" />}</Field>
      </div>
      <Field id="c-topic" label="How can we help?" required error={fe.topic}>
        {(p) => (
          <>
            <input type="hidden" name="topic" value={topic} />
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id={p.id} className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent position="popper">{TOPICS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
            </Select>
          </>
        )}
      </Field>
      <Field id="c-message" label="Message" required error={fe.message}>{(p) => <Textarea {...p} name="message" rows={6} maxLength={3000} />}</Field>
      <p className="text-xs text-muted-foreground">We’ll use your details only to respond to your enquiry, in line with our Privacy Notice (PDPA 2010).</p>
      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? <Loader2 className="animate-spin" /> : <Send />} Send message
      </Button>
    </form>
  );
}

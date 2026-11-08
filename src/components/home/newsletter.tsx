"use client";


import { useFormAction } from "@/hooks/use-form-action";
import { Loader2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterAction } from "@/lib/actions/site";
import type { ActionState } from "@/lib/types";

export function Newsletter() {
  const [state, onSubmit, pending] = useFormAction<ActionState>(newsletterAction, { ok: false });
  return (
    <section className="container-page py-16 sm:py-20" aria-labelledby="nl-title">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-coral-soft text-coral"><Mail className="size-6" aria-hidden /></span>
        <h2 id="nl-title" className="text-3xl font-bold sm:text-4xl">Get the best jobs in your inbox</h2>
        <p className="text-muted-foreground sm:text-lg">One email a week. Hand-picked roles, salary insights and career tips. Unsubscribe anytime.</p>
        <form onSubmit={onSubmit} className="flex w-full max-w-lg flex-col gap-2 sm:flex-row" noValidate>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <Input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="h-12 flex-1 bg-card" aria-describedby="nl-msg" />
          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : <Send />} Subscribe
          </Button>
        </form>
        <p id="nl-msg" role="status" aria-live="polite" className={state.message ? (state.ok ? "text-sm font-medium text-success" : "text-sm font-medium text-destructive") : "sr-only"}>
          {state.message}
        </p>
        <p className="text-xs text-muted-foreground">By subscribing you agree to our Privacy Notice under the PDPA 2010.</p>
      </div>
    </section>
  );
}

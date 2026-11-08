"use client";

import { motion } from "motion/react";
import { Bell, CalendarCheck, Globe2, Sparkles } from "lucide-react";

/** Decorative product preview. Hidden from assistive tech — content is illustrative only. */
export function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[480px]">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.6, 0.35, 1] }}
        className="absolute top-10 left-1/2 w-[88%] -translate-x-1/2 rounded-[28px] border bg-card p-6 shadow-2xl shadow-primary/15"
      >
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-800 font-heading font-bold text-white">CW</div>
          <div>
            <p className="font-heading font-semibold">Content Writer</p>
            <p className="text-sm text-muted-foreground">Writing &amp; Content</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-secondary px-3 py-1">Full-time</span>
          <span className="rounded-full bg-secondary px-3 py-1">No account needed</span>
          <span className="flex items-center gap-1 rounded-full bg-coral-soft px-3 py-1 text-coral"><Globe2 className="size-3" />Remote</span>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Monthly salary</p>
            <p className="font-heading text-2xl font-bold">RM 2.5k – 3.5k</p>
          </div>
          <span className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Apply now</span>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-coral" initial={{ width: "0%" }} animate={{ width: "78%" }} transition={{ duration: 1.4, delay: 0.8 }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Application progress · Interview stage</p>
      </motion.div>

      {/* Interview chip */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-0 right-0"
      >
        <div className="flex animate-float items-center gap-3 rounded-2xl border bg-card/95 px-4 py-3 shadow-xl backdrop-blur">
          <span className="grid size-9 place-items-center rounded-xl bg-teal-soft text-teal"><CalendarCheck className="size-5" /></span>
          <div className="text-sm">
            <p className="font-semibold">Interview scheduled</p>
            <p className="text-xs text-muted-foreground">Thu, 10:00 AM · Google Meet</p>
          </div>
        </div>
      </motion.div>

      {/* Alerts chip */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-24 -left-2 sm:-left-6"
      >
        <div className="flex animate-float-delayed items-center gap-3 rounded-2xl border bg-card/95 px-4 py-3 shadow-xl backdrop-blur">
          <span className="relative grid size-9 place-items-center rounded-xl bg-coral-soft text-coral">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-card bg-coral" />
          </span>
          <div className="text-sm">
            <p className="font-semibold">Application received</p>
            <p className="text-xs text-muted-foreground">We’ll email you within 3 days</p>
          </div>
        </div>
      </motion.div>

      {/* Offer card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute right-2 bottom-0 w-64 rounded-3xl bg-ink p-5 text-white shadow-2xl sm:right-0"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/70">Selected after interview?</p>
          <Sparkles className="size-4 text-amber-300" />
        </div>
        <p className="mt-1 font-heading text-2xl font-bold">Offer in 5 working days</p>
        <p className="mt-2 text-xs text-white/70">Then start working from home.</p>
      </motion.div>
    </div>
  );
}

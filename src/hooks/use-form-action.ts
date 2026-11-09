"use client";

import { startTransition, useActionState, type FormEvent } from "react";

const NETWORK_ERROR =
  "We couldn’t reach our server. Please check your internet connection and try again. If it keeps happening, refresh the page or email us at hr@getkerja.my.";

/**
 * Wraps useActionState but submits via onSubmit, so React does not auto-reset
 * the form after the action — users keep their input when validation fails.
 * If the request itself fails (offline, upload rejected, site redeployed while
 * the page was open), the form shows a friendly message instead of crashing.
 */
export function useFormAction<S>(fn: (state: Awaited<S>, fd: FormData) => S | Promise<S>, initial: Awaited<S>) {
  const [state, dispatch, pending] = useActionState(async (prev: Awaited<S>, fd: FormData): Promise<Awaited<S>> => {
    try {
      return await fn(prev, fd);
    } catch (err) {
      console.error("[form] submit failed:", err);
      return { ...(prev as object), ok: false, message: NETWORK_ERROR } as Awaited<S>;
    }
  }, initial);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.name) fd.set(submitter.name, submitter.value);
    startTransition(() => dispatch(fd));
  };
  return [state, onSubmit, pending] as const;
}

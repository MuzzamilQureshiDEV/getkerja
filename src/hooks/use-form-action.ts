"use client";

import { startTransition, useActionState, type FormEvent } from "react";

/**
 * Wraps useActionState but submits via onSubmit, so React does not auto-reset
 * the form after the action — users keep their input when validation fails.
 */
export function useFormAction<S>(fn: (state: Awaited<S>, fd: FormData) => S | Promise<S>, initial: Awaited<S>) {
  const [state, dispatch, pending] = useActionState(fn, initial);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.name) fd.set(submitter.name, submitter.value);
    startTransition(() => dispatch(fd));
  };
  return [state, onSubmit, pending] as const;
}

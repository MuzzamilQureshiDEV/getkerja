"use client";

import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Drag-and-drop file input that still works as a plain <input type="file"> (progressive enhancement). */
export function FileDrop({
  id,
  name,
  accept,
  maxBytes,
  label,
  hint,
  invalid,
  describedBy,
  required,
  onChange,
}: {
  id: string;
  name: string;
  accept: string;
  maxBytes: number;
  label: string;
  hint: string;
  invalid?: boolean;
  describedBy?: string;
  required?: boolean;
  onChange?: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  const pick = (f: File | null) => {
    setLocalErr(null);
    if (f && f.size > maxBytes) {
      setLocalErr(`File is too large (max ${formatBytes(maxBytes)})`);
      if (ref.current) ref.current.value = "";
      f = null;
    }
    setFile(f);
    onChange?.(f);
  };

  return (
    <div>
      <label
        htmlFor={id}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f && ref.current) {
            const dt = new DataTransfer();
            dt.items.add(f);
            ref.current.files = dt.files;
            pick(f);
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed bg-card px-6 py-8 text-center transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/40 hover:border-primary/50 hover:bg-secondary/40",
          drag && "border-primary bg-secondary/60",
          (invalid || localErr) && "border-destructive/60",
        )}
      >
        {file ? (
          <span className="flex w-full items-center gap-3 text-left">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="size-6" aria-hidden /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{file.name}</span>
              <span className="text-sm text-muted-foreground">{formatBytes(file.size)}</span>
            </span>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); if (ref.current) ref.current.value = ""; pick(null); }}
              className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-muted"
              aria-label="Remove file"
            >
              <X className="size-4" />
            </button>
          </span>
        ) : (
          <>
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-coral/15 text-primary"><UploadCloud className="size-7" aria-hidden /></span>
            <span className="font-medium">{label} <span className="text-primary underline underline-offset-4">browse</span></span>
            <span className="text-sm text-muted-foreground">{hint}</span>
          </>
        )}
        <input
          ref={ref}
          id={id}
          name={name}
          type="file"
          accept={accept}
          required={required}
          aria-invalid={invalid || !!localErr || undefined}
          aria-describedby={describedBy}
          className="sr-only"
          onChange={(e) => pick(e.target.files?.[0] ?? null)}
        />
      </label>
      {localErr && <p className="mt-2 text-sm font-medium text-destructive" role="alert">{localErr}</p>}
    </div>
  );
}

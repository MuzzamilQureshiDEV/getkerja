"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/** Subtle fade-up on scroll. Respects prefers-reduced-motion via MotionConfig. */
export function Reveal({
  delay = 0,
  y = 18,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.21, 0.6, 0.35, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { Children } from "react";
import { motion } from "motion/react";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.6, 0.35, 1] as const } },
};

/** Staggered entrance for the hero copy; each child animates in sequence. */
export function HeroIntro({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative z-10 flex flex-col gap-6"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {Children.toArray(children).map((c, i) => (
        <motion.div key={i} variants={item} className="flex flex-col">
          {c}
        </motion.div>
      ))}
    </motion.div>
  );
}

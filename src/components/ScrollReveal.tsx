"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import {
  fadeUp,
  motionTransition,
  motionViewport,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variants?: Variants;
};

export function ScrollReveal({
  children,
  delay = 0,
  variants = fadeUp,
  ...props
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={motionViewport}
      variants={variants}
      transition={{ ...motionTransition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type ScrollStaggerProps = HTMLMotionProps<"div"> & {
  itemVariants?: Variants;
};

export function ScrollStagger({ children, ...props }: ScrollStaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={motionViewport}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  variants = staggerItem,
  ...props
}: HTMLMotionProps<"div"> & { variants?: Variants }) {
  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  );
}

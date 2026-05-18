"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MotionWrapProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export default function MotionWrap({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  ...props
}: MotionWrapProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40, x: 0 };
      case "down":
        return { y: -40, x: 0 };
      case "left":
        return { y: 0, x: 40 };
      case "right":
        return { y: 0, x: -40 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 1.02, 0.43, 1.01], // custom smooth cubic bezier
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}

/** Fade-up-on-view wrapper. Fires once on load if already in viewport (hero), or on scroll-into-view (sections). */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

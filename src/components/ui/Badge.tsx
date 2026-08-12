import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "orange" | "outline" | "muted";

const toneClasses: Record<Tone, string> = {
  orange: "bg-hava-orange text-hava-black",
  outline: "border border-hava-orange text-hava-orange",
  muted: "bg-hava-surface-2 text-hava-gray",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "orange", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}

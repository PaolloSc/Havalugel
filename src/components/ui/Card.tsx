import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-hava-surface border border-hava-line clip-corner-sm",
        className
      )}
      {...props}
    />
  );
}

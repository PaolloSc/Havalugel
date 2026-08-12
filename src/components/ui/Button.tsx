import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-hava-orange text-hava-black hover:bg-hava-orange-light active:bg-hava-orange-deep shadow-[4px_4px_0_0_var(--hava-white)] hover:shadow-[6px_6px_0_0_var(--hava-white)] active:shadow-[2px_2px_0_0_var(--hava-white)] active:translate-x-[2px] active:translate-y-[2px]",
  outline:
    "bg-transparent text-hava-white border border-hava-line-strong hover:border-hava-orange hover:text-hava-orange",
  ghost: "bg-transparent text-hava-white hover:text-hava-orange",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-body font-bold uppercase tracking-wide text-sm transition-all duration-150 ease-out clip-corner disabled:opacity-40 disabled:pointer-events-none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  children: ReactNode;
}

export function Button({ variant = "primary", href, className, children, ...props }: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

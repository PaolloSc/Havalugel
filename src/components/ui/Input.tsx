import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-left" htmlFor={id}>
      {label && (
        <span className="text-xs font-bold uppercase tracking-widest text-hava-gray">{label}</span>
      )}
      <input
        id={id}
        className={cn(
          "bg-hava-surface border border-hava-line px-4 py-3 text-hava-white placeholder:text-hava-gray/60 outline-none transition-colors focus:border-hava-orange",
          error && "border-hava-orange",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-hava-orange-light">{error}</span>}
    </label>
  );
}

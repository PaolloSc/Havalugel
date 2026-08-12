import type { ReactNode, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export function Select({ label, id, className, children, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-left" htmlFor={id}>
      {label && (
        <span className="text-xs font-bold uppercase tracking-widest text-hava-gray">{label}</span>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            "w-full appearance-none bg-hava-surface border border-hava-line px-4 py-3 pr-10 text-hava-white outline-none transition-colors focus:border-hava-orange",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-hava-gray"
        />
      </div>
    </label>
  );
}

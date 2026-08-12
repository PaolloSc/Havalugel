import Link from "next/link";
import { cn } from "@/lib/utils";

/** Top-down scooter icon echoing the Havalugue mark, until the client's real logo file is supplied. */
function MotoIconTop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden="true">
      <path
        d="M18 6 C18 2 22 0 30 0 C38 0 42 2 42 6 C42 9 38 11 30 11 C22 11 18 9 18 6 Z"
        fill="currentColor"
      />
      <path d="M8 8 L18 10 L14 16 L4 15 Z" fill="currentColor" />
      <path d="M52 8 L42 10 L46 16 L56 15 Z" fill="currentColor" />
      <circle cx="30" cy="8" r="7" fill="currentColor" />
      <path
        d="M13 18 C13 14 20 12 30 12 C40 12 47 14 47 18 L47 60 C47 70 42 76 30 78 C18 76 13 70 13 60 Z"
        fill="currentColor"
      />
      <rect x="21" y="24" width="18" height="12" rx="3" fill="var(--hava-black)" />
      <rect x="24" y="82" width="12" height="8" rx="2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <MotoIconTop className="h-10 w-auto text-hava-orange transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-[0.78]">
        <span className="font-display text-2xl tracking-tight text-hava-white">HAVA</span>
        <span className="font-display text-2xl tracking-tight text-hava-white">LUGUE</span>
      </span>
    </Link>
  );
}

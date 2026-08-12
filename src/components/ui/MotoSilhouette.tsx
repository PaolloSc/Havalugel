import { cn } from "@/lib/utils";

interface MotoSilhouetteProps {
  className?: string;
  tone?: "orange" | "white" | "outline";
}

/** Stylized side-profile motorcycle icon, used as a placeholder in place of real product photography. */
export function MotoSilhouette({ className, tone = "orange" }: MotoSilhouetteProps) {
  const fill =
    tone === "orange" ? "var(--hava-orange)" : tone === "white" ? "var(--hava-white)" : "none";
  const stroke = tone === "outline" ? "var(--hava-white)" : "none";

  return (
    <svg
      viewBox="0 0 220 120"
      fill="none"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      <circle cx="42" cy="92" r="22" stroke={tone === "outline" ? stroke : fill} strokeWidth="5" fill="none" />
      <circle cx="178" cy="92" r="22" stroke={tone === "outline" ? stroke : fill} strokeWidth="5" fill="none" />
      <circle cx="42" cy="92" r="5" fill={tone === "outline" ? stroke : fill} />
      <circle cx="178" cy="92" r="5" fill={tone === "outline" ? stroke : fill} />
      <path
        d="M42 92 L88 58 L118 58 L134 92"
        stroke={tone === "outline" ? stroke : fill}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M118 58 L150 40 M150 40 L172 40 M150 40 L142 30"
        stroke={tone === "outline" ? stroke : fill}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M134 92 L178 92"
        stroke={tone === "outline" ? stroke : fill}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M88 58 L70 42 L48 42"
        stroke={tone === "outline" ? stroke : fill}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="94" y="48" width="34" height="12" rx="4" fill={tone === "outline" ? stroke : fill} />
      <circle cx="44" cy="40" r="7" fill={tone === "outline" ? stroke : fill} />
    </svg>
  );
}

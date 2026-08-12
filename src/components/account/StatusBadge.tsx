import type { BookingStatus } from "@/types/booking";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<BookingStatus, { label: string; classes: string }> = {
  pendente: { label: "Pendente", classes: "bg-yellow-400/15 text-yellow-300 border-yellow-400/40" },
  confirmada: { label: "Confirmada", classes: "bg-hava-orange/15 text-hava-orange border-hava-orange/40" },
  em_andamento: { label: "Em andamento", classes: "bg-emerald-400/15 text-emerald-300 border-emerald-400/40" },
  finalizada: { label: "Finalizada", classes: "bg-hava-gray/15 text-hava-gray border-hava-gray/40" },
  atrasada: { label: "Atrasada", classes: "bg-red-500/15 text-red-400 border-red-500/40" },
  cancelada: { label: "Cancelada", classes: "bg-hava-gray/10 text-hava-gray/70 border-hava-gray/30 line-through" },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest",
        config.classes
      )}
    >
      {config.label}
    </span>
  );
}

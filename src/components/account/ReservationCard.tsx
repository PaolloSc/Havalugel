import Link from "next/link";
import type { Reservation } from "@/types/booking";
import { StatusBadge } from "./StatusBadge";
import { MotoSilhouette } from "@/components/ui/MotoSilhouette";
import { formatBRL, formatDataBR } from "@/lib/format";

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <Link
      href={`/conta/reservas/${reservation.id}`}
      className="flex items-center gap-4 border border-hava-line bg-hava-black-soft p-4 transition-colors hover:border-hava-orange"
    >
      <MotoSilhouette tone="outline" className="h-12 w-20 shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl leading-none text-hava-white">{reservation.motoNome}</h3>
          <StatusBadge status={reservation.status} />
        </div>
        <p className="text-xs text-hava-gray">
          {formatDataBR(reservation.dataRetirada)} — {formatDataBR(reservation.dataDevolucao)}
        </p>
      </div>

      <span className="font-mono text-lg font-semibold text-hava-orange">
        {formatBRL(reservation.budget.totalReserva)}
      </span>
    </Link>
  );
}

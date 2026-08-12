"use client";

import { use } from "react";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { getReservation } from "@/lib/reservations-mock";
import { StatusBadge } from "@/components/account/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatBRL, formatDataBR } from "@/lib/format";

export default function ConfirmacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reservation = getReservation(id);
  if (!reservation) notFound();

  return (
    <div className="mx-auto max-w-lg px-5 py-20 text-center">
      <CheckCircle2 size={56} className="mx-auto mb-6 text-hava-orange" strokeWidth={1.5} />
      <span className="text-xs font-bold uppercase tracking-widest text-hava-orange">
        Reserva confirmada
      </span>
      <h1 className="mt-2 mb-6 font-display text-4xl leading-none text-hava-white md:text-5xl">
        {reservation.motoNome}
      </h1>

      <div className="mb-8 flex justify-center">
        <StatusBadge status={reservation.status} />
      </div>

      <div className="mb-8 space-y-2 border border-hava-line bg-hava-black-soft px-6 py-5 text-left">
        <div className="flex justify-between text-sm text-hava-gray">
          <span>Retirada</span>
          <span className="text-hava-white">{formatDataBR(reservation.dataRetirada)}</span>
        </div>
        <div className="flex justify-between text-sm text-hava-gray">
          <span>Devolução</span>
          <span className="text-hava-white">{formatDataBR(reservation.dataDevolucao)}</span>
        </div>
        <div className="flex justify-between border-t border-hava-line pt-3 text-sm text-hava-gray">
          <span>Total</span>
          <span className="font-mono text-hava-orange">{formatBRL(reservation.budget.totalReserva)}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/conta">Ver minhas reservas</Button>
        <Button href="/motos" variant="outline">
          Alugar outra moto
        </Button>
      </div>
    </div>
  );
}

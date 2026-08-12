"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getReservation } from "@/lib/reservations-mock";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { StatusBadge } from "@/components/account/StatusBadge";
import { BudgetBreakdown } from "@/components/booking/BudgetBreakdown";
import { Button } from "@/components/ui/Button";
import { calcularReembolso } from "@/lib/pricing";
import { diasDeAntecedencia } from "@/lib/dates";
import { formatBRL, formatDataBR } from "@/lib/format";

export default function ReservaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const { cancel } = useReservations(user?.id);
  const [cancelando, setCancelando] = useState(false);

  const reservation = getReservation(id);
  if (!reservation) notFound();
  if (user && reservation.userId !== user.id) notFound();

  const antecedencia = diasDeAntecedencia(new Date(`${reservation.dataRetirada}T00:00:00`));
  const reembolso = calcularReembolso(antecedencia, reservation.budget.totalReserva);
  const podeCancelar = !["cancelada", "finalizada"].includes(reservation.status);

  function handleCancelar() {
    setCancelando(true);
    cancel(reservation!.id);
    router.refresh();
    setCancelando(false);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-hava-gray">Reserva #{reservation.id.slice(0, 8)}</span>
          <h1 className="font-display text-4xl leading-none text-hava-white md:text-5xl">
            {reservation.motoNome}
          </h1>
        </div>
        <StatusBadge status={reservation.status} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-hava-line bg-hava-line sm:grid-cols-4">
            {[
              { label: "Retirada", value: formatDataBR(reservation.dataRetirada) },
              { label: "Devolução", value: formatDataBR(reservation.dataDevolucao) },
              { label: "Local", value: reservation.localRetirada === "loja" ? "Loja" : "Entrega" },
              { label: "Pagamento", value: reservation.formaPagamento === "online" ? "Online" : "Na retirada" },
            ].map((s) => (
              <div key={s.label} className="bg-hava-black-soft px-4 py-4">
                <span className="block text-[11px] uppercase tracking-widest text-hava-gray">{s.label}</span>
                <span className="mt-1 block font-mono text-sm text-hava-white">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="border border-hava-line bg-hava-black-soft p-5">
            <BudgetBreakdown resultado={reservation.budget} />
          </div>
        </div>

        {podeCancelar && (
          <div className="h-fit border border-hava-line bg-hava-black-soft p-5">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-hava-orange">
              Cancelar reserva
            </h2>
            <p className="mb-1 text-sm text-hava-gray">
              {antecedencia >= 7
                ? "Mais de 7 dias de antecedência"
                : antecedencia >= 3
                  ? "Entre 3 e 7 dias de antecedência"
                  : antecedencia >= 0
                    ? "Menos de 3 dias de antecedência"
                    : "Retirada já passou / no-show"}
            </p>
            <p className="mb-4 text-sm text-hava-gray">
              Reembolso: <span className="text-hava-orange">{(reembolso.percentual * 100).toFixed(0)}%</span>{" "}
              ({formatBRL(reembolso.valor)})
            </p>
            <Button variant="outline" onClick={handleCancelar} disabled={cancelando} className="w-full justify-center">
              {cancelando ? "Cancelando..." : "Cancelar reserva"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

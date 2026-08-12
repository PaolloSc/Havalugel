"use client";

import { CreditCard, Store } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { StatusBadge } from "@/components/account/StatusBadge";
import { formatBRL, formatDataBR } from "@/lib/format";

export default function PagamentosPage() {
  const { user } = useAuth();
  const { reservations } = useReservations(user?.id);

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl leading-none text-hava-white md:text-5xl">
        HISTÓRICO DE
        <br />
        <span className="text-hava-orange">PAGAMENTOS</span>
      </h1>

      {reservations.length === 0 ? (
        <p className="border border-dashed border-hava-line px-6 py-16 text-center text-hava-gray">
          Nenhum pagamento registrado ainda.
        </p>
      ) : (
        <div className="space-y-3">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-4 border border-hava-line bg-hava-black-soft px-4 py-4"
            >
              {r.formaPagamento === "online" ? (
                <CreditCard size={20} className="shrink-0 text-hava-orange" />
              ) : (
                <Store size={20} className="shrink-0 text-hava-orange" />
              )}
              <div className="min-w-0 flex-1">
                <span className="block text-sm text-hava-white">{r.motoNome}</span>
                <span className="block text-xs text-hava-gray">
                  {r.formaPagamento === "online" ? "Pago online" : "A pagar na retirada"} ·{" "}
                  {formatDataBR(r.criadaEm)}
                </span>
              </div>
              <StatusBadge status={r.status} />
              <span className="font-mono text-sm font-semibold text-hava-orange">
                {formatBRL(r.budget.totalReserva)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { FileCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { formatDataBR } from "@/lib/format";

export default function DocumentosPage() {
  const { user } = useAuth();
  const { reservations } = useReservations(user?.id);

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl leading-none text-hava-white md:text-5xl">
        DOCU
        <br />
        <span className="text-hava-orange">MENTOS</span>
      </h1>

      {reservations.length === 0 ? (
        <p className="border border-dashed border-hava-line px-6 py-16 text-center text-hava-gray">
          Nenhum documento enviado ainda — eles aparecem aqui após uma reserva.
        </p>
      ) : (
        <div className="space-y-3">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 border border-hava-line bg-hava-black-soft px-4 py-4"
            >
              <FileCheck size={20} className="shrink-0 text-hava-orange" />
              <div>
                <span className="block text-sm text-hava-white">CNH — {r.motoNome}</span>
                <span className="block text-xs text-hava-gray">
                  Enviada em {formatDataBR(r.criadaEm)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

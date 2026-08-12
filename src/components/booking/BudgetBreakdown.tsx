import type { BudgetResult } from "@/lib/pricing.types";
import { formatBRL } from "@/lib/format";

export function BudgetBreakdown({ resultado }: { resultado: BudgetResult }) {
  return (
    <div className="space-y-2">
      {resultado.altaTemporada && (
        <div className="mb-2 border border-hava-orange/50 bg-hava-orange/10 px-3 py-2 text-xs text-hava-orange-light">
          Período em alta temporada — acréscimo de 20% aplicado
        </div>
      )}
      {resultado.detalhamento.map((item, i) => (
        <div key={i} className="flex items-center justify-between text-sm text-hava-gray">
          <span>{item.label}</span>
          <span className={item.value < 0 ? "text-hava-orange" : "text-hava-white/80"}>
            {item.value < 0 ? "-" : ""}
            {formatBRL(Math.abs(item.value))}
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between border-t border-hava-line pt-3 text-sm text-hava-gray">
        <span>Franquia de km</span>
        <span className="font-mono">
          {resultado.kmFranquiaTotal === "ilimitado" ? "Ilimitada" : `${resultado.kmFranquiaTotal} km`}
        </span>
      </div>

      <div className="flex items-end justify-between border-t border-hava-line pt-4">
        <span className="text-xs font-bold uppercase tracking-widest text-hava-gray">Total</span>
        <span className="font-display text-3xl text-hava-orange">{formatBRL(resultado.totalReserva)}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-hava-gray">
        <span>+ caução (bloqueio no cartão)</span>
        <span className="font-mono">{formatBRL(resultado.caucao)}</span>
      </div>
    </div>
  );
}

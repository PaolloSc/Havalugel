import type { Moto } from "@/types/moto";
import type { BudgetResult } from "@/lib/pricing.types";
import { BudgetBreakdown } from "./BudgetBreakdown";
import { formatDataBR } from "@/lib/format";
import { MotoSilhouette } from "@/components/ui/MotoSilhouette";

export function BookingSummary({
  moto,
  resultado,
  dataRetirada,
  dataDevolucao,
}: {
  moto: Moto;
  resultado: BudgetResult;
  dataRetirada: string;
  dataDevolucao: string;
}) {
  return (
    <div className="border border-hava-line bg-hava-black-soft">
      <div className="flex items-center gap-4 border-b border-hava-line px-5 py-4">
        <MotoSilhouette tone="orange" className="h-12 w-20 shrink-0" />
        <div>
          <span className="block text-xs uppercase tracking-widest text-hava-gray">
            {resultado.diarias} diária{resultado.diarias > 1 ? "s" : ""}
          </span>
          <h2 className="font-display text-2xl leading-none text-hava-white">
            {moto.marca} {moto.nome}
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-hava-line px-5 py-3 text-sm text-hava-gray">
        <span>Retirada: {formatDataBR(dataRetirada)}</span>
        <span>Devolução: {formatDataBR(dataDevolucao)}</span>
      </div>

      <div className="px-5 py-5">
        <BudgetBreakdown resultado={resultado} />
      </div>
    </div>
  );
}

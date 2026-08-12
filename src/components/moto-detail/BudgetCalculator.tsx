"use client";

import { useRouter } from "next/navigation";
import type { Moto } from "@/types/moto";
import { useBudget } from "@/hooks/useBudget";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BudgetBreakdown } from "@/components/booking/BudgetBreakdown";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

function Toggle({
  label,
  sublabel,
  checked,
  onChange,
}: {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-2.5">
      <span>
        <span className="block text-sm text-hava-white">{label}</span>
        {sublabel && <span className="block text-xs text-hava-gray">{sublabel}</span>}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-[#f5741a]"
      />
    </label>
  );
}

export function BudgetCalculator({ moto }: { moto: Moto }) {
  const router = useRouter();
  const budget = useBudget(moto);
  const { resultado } = budget;

  function handleReservar() {
    const params = new URLSearchParams({
      retirada: budget.dataRetirada,
      devolucao: budget.dataDevolucao,
      protecao: String(budget.protecaoTotal),
      capacete: String(budget.extras.capaceteExtra),
      bau: String(budget.extras.bau),
      condutor: String(budget.extras.condutorAdicional),
      gps: String(budget.extras.gps),
      entrega: String(budget.extras.entrega),
      entregaValor: String(budget.extras.entregaValor),
      km: String(budget.kmIlimitado),
      cupom: budget.cupom,
    });
    router.push(`/orcamento/${moto.slug}?${params.toString()}`);
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="border border-hava-line bg-hava-black-soft">
        <div className="border-b border-hava-line bg-hava-orange px-5 py-4">
          <span className="text-xs font-bold uppercase tracking-widest text-hava-black/70">
            Monte seu orçamento
          </span>
          <h2 className="font-display text-2xl leading-none text-hava-black">
            {moto.marca} {moto.nome}
          </h2>
        </div>

        <div className="space-y-5 px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              label="Retirada"
              value={budget.dataRetirada}
              onChange={(e) => budget.setDataRetirada(e.target.value)}
            />
            <Input
              type="date"
              label="Devolução"
              value={budget.dataDevolucao}
              onChange={(e) => budget.setDataDevolucao(e.target.value)}
            />
          </div>

          <div className="border-t border-hava-line pt-1">
            <Toggle
              label="Proteção Total"
              sublabel="Substitui o seguro básico obrigatório"
              checked={budget.protecaoTotal}
              onChange={() => budget.setProtecaoTotal((v) => !v)}
            />
          </div>

          <div className="border-t border-hava-line pt-1">
            <span className="mb-1 block pt-2 text-xs font-bold uppercase tracking-widest text-hava-gray">
              Extras
            </span>
            <Toggle
              label="Capacete extra"
              sublabel="R$ 15/dia"
              checked={budget.extras.capaceteExtra}
              onChange={() => budget.toggleExtra("capaceteExtra")}
            />
            <Toggle
              label="Baú / Bagageiro"
              sublabel="R$ 20/dia"
              checked={budget.extras.bau}
              onChange={() => budget.toggleExtra("bau")}
            />
            <Toggle
              label="Condutor adicional"
              sublabel="R$ 30/dia"
              checked={budget.extras.condutorAdicional}
              onChange={() => budget.toggleExtra("condutorAdicional")}
            />
            <Toggle
              label="GPS"
              sublabel="R$ 12/dia"
              checked={budget.extras.gps}
              onChange={() => budget.toggleExtra("gps")}
            />
            <Toggle
              label="Entrega / Coleta"
              sublabel={formatBRL(budget.extras.entregaValor)}
              checked={budget.extras.entrega}
              onChange={() => budget.toggleExtra("entrega")}
            />
          </div>

          <div className="border-t border-hava-line pt-1">
            <Toggle
              label="Km Ilimitado"
              sublabel="Remove a franquia de 150km/diária"
              checked={budget.kmIlimitado}
              onChange={() => budget.setKmIlimitado((v) => !v)}
            />
          </div>

          <Input
            label="Cupom de desconto"
            placeholder="HAVA10"
            value={budget.cupom}
            onChange={(e) => budget.setCupom(e.target.value)}
          />
          {resultado.cupom && (
            <p className={cn("text-xs", resultado.cupom.valido ? "text-hava-orange" : "text-red-400")}>
              {resultado.cupom.valido
                ? `Cupom ${resultado.cupom.codigo} aplicado`
                : resultado.cupom.motivo}
            </p>
          )}
        </div>

        <div className="space-y-2 border-t border-hava-line bg-hava-black px-5 py-5">
          <BudgetBreakdown resultado={resultado} />

          <Button onClick={handleReservar} className="mt-4 w-full justify-center">
            Reservar agora
          </Button>
        </div>
      </div>
    </div>
  );
}

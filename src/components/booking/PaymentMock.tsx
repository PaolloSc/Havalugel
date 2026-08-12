"use client";

import { CreditCard, Store } from "lucide-react";
import type { FormaPagamento } from "@/types/booking";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

interface PaymentMockProps {
  value: FormaPagamento;
  onChange: (value: FormaPagamento) => void;
}

export function PaymentMock({ value, onChange }: PaymentMockProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange("retirada")}
          className={cn(
            "flex items-center gap-2 border px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
            value === "retirada"
              ? "border-hava-orange bg-hava-orange/10 text-hava-orange"
              : "border-hava-line text-hava-gray hover:border-hava-line-strong"
          )}
        >
          <Store size={16} /> Pagar na retirada
        </button>
        <button
          type="button"
          onClick={() => onChange("online")}
          className={cn(
            "flex items-center gap-2 border px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors",
            value === "online"
              ? "border-hava-orange bg-hava-orange/10 text-hava-orange"
              : "border-hava-line text-hava-gray hover:border-hava-line-strong"
          )}
        >
          <CreditCard size={16} /> Pagar agora
        </button>
      </div>

      {value === "online" && (
        <div className="grid grid-cols-2 gap-3 border border-hava-line bg-hava-black px-4 py-4">
          <Input label="Número do cartão" placeholder="0000 0000 0000 0000" className="col-span-2" />
          <Input label="Validade" placeholder="MM/AA" />
          <Input label="CVV" placeholder="123" />
          <p className="col-span-2 text-xs text-hava-gray/70">
            Simulação — nenhum dado de cartão é enviado ou armazenado.
          </p>
        </div>
      )}
    </div>
  );
}

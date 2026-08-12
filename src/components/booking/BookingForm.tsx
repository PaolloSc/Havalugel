"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DocumentUpload } from "./DocumentUpload";
import { PaymentMock } from "./PaymentMock";
import type { FormaPagamento, LocalRetirada } from "@/types/booking";

export interface BookingFormValues {
  localRetirada: LocalRetirada;
  formaPagamento: FormaPagamento;
}

interface BookingFormProps {
  onConfirm: (values: BookingFormValues) => void;
  submitting?: boolean;
}

export function BookingForm({ onConfirm, submitting }: BookingFormProps) {
  const [localRetirada, setLocalRetirada] = useState<LocalRetirada>("loja");
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("retirada");
  const [cnh, setCnh] = useState<string | null>(null);

  return (
    <div className="space-y-6 border border-hava-line bg-hava-black-soft p-5">
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-hava-orange">
          Local de retirada
        </h3>
        <Select value={localRetirada} onChange={(e) => setLocalRetirada(e.target.value as LocalRetirada)}>
          <option value="loja">Retirar na loja</option>
          <option value="entrega">Entrega no endereço</option>
        </Select>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-hava-orange">
          Documentos
        </h3>
        <div className="space-y-3">
          <DocumentUpload label="CNH (frente e verso)" onFile={setCnh} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-hava-orange">
          Pagamento
        </h3>
        <PaymentMock value={formaPagamento} onChange={setFormaPagamento} />
      </div>

      <Button
        onClick={() => onConfirm({ localRetirada, formaPagamento })}
        disabled={!cnh || submitting}
        className="w-full justify-center"
      >
        {submitting ? "Confirmando..." : "Confirmar reserva"}
      </Button>
      {!cnh && <p className="text-center text-xs text-hava-gray">Envie a CNH para confirmar.</p>}
    </div>
  );
}

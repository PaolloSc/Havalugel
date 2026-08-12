"use client";

import { useMemo, useState } from "react";
import type { Moto } from "@/types/moto";
import type { BudgetExtras } from "@/lib/pricing.types";
import { calcularOrcamento } from "@/lib/pricing";
import { ENTREGA_VALOR_MIN } from "@/lib/pricing.constants";

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}
function amanhaISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const EXTRAS_INICIAIS: BudgetExtras = {
  capaceteExtra: false,
  bau: false,
  condutorAdicional: false,
  gps: false,
  entrega: false,
  entregaValor: ENTREGA_VALOR_MIN,
};

export function useBudget(moto: Moto) {
  const [dataRetirada, setDataRetirada] = useState(hojeISO());
  const [dataDevolucao, setDataDevolucao] = useState(amanhaISO());
  const [protecaoTotal, setProtecaoTotal] = useState(false);
  const [extras, setExtras] = useState<BudgetExtras>(EXTRAS_INICIAIS);
  const [kmIlimitado, setKmIlimitado] = useState(false);
  const [cupom, setCupom] = useState("");

  const resultado = useMemo(() => {
    const retirada = new Date(`${dataRetirada}T00:00:00`);
    const devolucao = new Date(`${dataDevolucao}T00:00:00`);
    return calcularOrcamento({
      moto,
      dataRetirada: retirada,
      dataDevolucao: devolucao < retirada ? retirada : devolucao,
      protecaoTotal,
      extras,
      kmIlimitado,
      cupom: cupom || undefined,
    });
  }, [moto, dataRetirada, dataDevolucao, protecaoTotal, extras, kmIlimitado, cupom]);

  function toggleExtra(key: keyof Omit<BudgetExtras, "entregaValor">) {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return {
    dataRetirada,
    setDataRetirada,
    dataDevolucao,
    setDataDevolucao,
    protecaoTotal,
    setProtecaoTotal,
    extras,
    setExtras,
    toggleExtra,
    kmIlimitado,
    setKmIlimitado,
    cupom,
    setCupom,
    resultado,
  };
}

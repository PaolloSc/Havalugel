import type { Moto } from "@/types/moto";
import type { BudgetInput } from "./pricing.types";
import { ENTREGA_VALOR_MIN } from "./pricing.constants";

/** Reconstructs a BudgetInput from the query string built by BudgetCalculator's "Reservar agora". */
export function parseBudgetParams(
  moto: Moto,
  search: Record<string, string | string[] | undefined>
): BudgetInput {
  const get = (key: string) => {
    const v = search[key];
    return Array.isArray(v) ? v[0] : v;
  };
  const bool = (key: string) => get(key) === "true";

  const retirada = get("retirada");
  const devolucao = get("devolucao");
  const hoje = new Date().toISOString().slice(0, 10);

  return {
    moto,
    dataRetirada: new Date(`${retirada || hoje}T00:00:00`),
    dataDevolucao: new Date(`${devolucao || hoje}T00:00:00`),
    protecaoTotal: bool("protecao"),
    extras: {
      capaceteExtra: bool("capacete"),
      bau: bool("bau"),
      condutorAdicional: bool("condutor"),
      gps: bool("gps"),
      entrega: bool("entrega"),
      entregaValor: Number(get("entregaValor")) || ENTREGA_VALOR_MIN,
    },
    kmIlimitado: bool("km"),
    cupom: get("cupom") || undefined,
  };
}

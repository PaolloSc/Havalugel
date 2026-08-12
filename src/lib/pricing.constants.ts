import type { CategoriaSeguro } from "@/types/moto";

export const DESCONTOS_POR_PERIODO: { min: number; max: number; percentual: number }[] = [
  { min: 1, max: 2, percentual: 0 },
  { min: 3, max: 6, percentual: 0.05 },
  { min: 7, max: 13, percentual: 0.1 },
  { min: 14, max: 29, percentual: 0.15 },
  { min: 30, max: Infinity, percentual: 0.2 },
];

export const SEGURO_POR_CATEGORIA: Record<
  CategoriaSeguro,
  { basico: number; protecaoTotal: number; label: string }
> = {
  biz: { basico: 18, protecaoTotal: 35, label: "Biz 125" },
  cg_fan_start: { basico: 25, protecaoTotal: 45, label: "CG / Fan / Start" },
  titan: { basico: 28, protecaoTotal: 49, label: "Titan 160" },
  premium: { basico: 35, protecaoTotal: 59, label: "Premium" },
};

export const EXTRAS_VALORES = {
  capaceteExtra: 15,
  bau: 20,
  condutorAdicional: 30,
  gps: 12,
};

export const ENTREGA_VALOR_MIN = 50;
export const ENTREGA_VALOR_MAX = 120;

export const KM_FRANQUIA_POR_DIARIA = 150;
export const KM_EXCEDENTE_VALOR_POR_KM = 0.85;

export const KM_ILIMITADO_ADICIONAL: Record<CategoriaSeguro, number> = {
  biz: 25,
  cg_fan_start: 25,
  titan: 35,
  premium: 35,
};

export const TAXA_LIMPEZA = 40;
export const TAXA_PROCESSAMENTO = 15;

export const CAUCAO_POR_CATEGORIA: Record<CategoriaSeguro, number> = {
  biz: 600,
  cg_fan_start: 600,
  titan: 900,
  premium: 1350,
};

export const ALTA_TEMPORADA_PERCENTUAL = 0.2;

// Meses de alta temporada: dezembro(11), janeiro(0), fevereiro(1) (índice JS Date.getMonth())
export const MESES_ALTA_TEMPORADA = [11, 0, 1];

// Feriados prolongados mock (datas fixas conhecidas de 2026/2027, formato YYYY-MM-DD, início/fim do período)
export const FERIADOS_PROLONGADOS: { inicio: string; fim: string }[] = [
  { inicio: "2026-02-14", fim: "2026-02-17" }, // Carnaval 2026
  { inicio: "2026-04-03", fim: "2026-04-05" }, // Páscoa/Tiradentes
  { inicio: "2027-02-06", fim: "2027-02-09" }, // Carnaval 2027
];

export const MULTA_ATRASO = {
  toleranciaHoras: 2,
  ate24hDiariaExtra: true,
  ate24hTaxa: 50,
  apos24hTaxaPorDia: 80,
  apos72hSemContatoAcaoLegal: true,
};

export const POLITICA_CANCELAMENTO: { minDias: number; percentualReembolso: number }[] = [
  { minDias: 7, percentualReembolso: 1 },
  { minDias: 3, percentualReembolso: 0.7 },
  { minDias: 0, percentualReembolso: 0.4 },
];

export const TAXA_COMBUSTIVEL = 35;

export interface Cupom {
  codigo: string;
  tipo: "percentual" | "fixo";
  valor: number;
  ativo: boolean;
}

export const CUPONS: Cupom[] = [
  { codigo: "HAVA10", tipo: "percentual", valor: 0.1, ativo: true },
  { codigo: "BEMVINDO20", tipo: "fixo", valor: 20, ativo: true },
  { codigo: "EXPIRADO", tipo: "percentual", valor: 0.5, ativo: false },
];

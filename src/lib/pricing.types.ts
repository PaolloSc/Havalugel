import type { CategoriaSeguro, Moto } from "@/types/moto";

export interface BudgetExtras {
  capaceteExtra: boolean;
  bau: boolean;
  condutorAdicional: boolean;
  gps: boolean;
  entrega: boolean;
  entregaValor: number; // 50–120, escolhido na UI quando entrega ativa
}

export interface BudgetInput {
  moto: Moto;
  dataRetirada: Date;
  dataDevolucao: Date;
  protecaoTotal: boolean;
  extras: BudgetExtras;
  kmIlimitado: boolean;
  cupom?: string;
}

export interface BudgetLineItem {
  label: string;
  value: number;
}

export interface CupomAplicado {
  codigo: string;
  valido: boolean;
  motivo?: string;
  descontoValor: number;
}

export interface BudgetResult {
  diarias: number;
  valorDiariaBase: number;
  subtotalDiarias: number;
  descontoPercentual: number;
  descontoValor: number;
  altaTemporada: boolean;
  acrescimoAltaTemporadaValor: number;
  subtotalDiariasComAjustes: number;
  seguro: BudgetLineItem;
  extras: BudgetLineItem[];
  kmFranquiaTotal: number | "ilimitado";
  taxasFixas: BudgetLineItem[];
  cupom?: CupomAplicado;
  totalReserva: number;
  caucao: number;
  detalhamento: BudgetLineItem[];
}

export type { CategoriaSeguro };

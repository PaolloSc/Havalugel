import type { BudgetResult } from "@/lib/pricing.types";

export type BookingStatus =
  | "pendente"
  | "confirmada"
  | "em_andamento"
  | "finalizada"
  | "atrasada"
  | "cancelada";

export type LocalRetirada = "loja" | "entrega";
export type FormaPagamento = "retirada" | "online";

export interface Reservation {
  id: string;
  userId: string;
  motoId: string;
  motoSlug: string;
  motoNome: string;
  dataRetirada: string;
  dataDevolucao: string;
  localRetirada: LocalRetirada;
  formaPagamento: FormaPagamento;
  status: BookingStatus;
  budget: BudgetResult;
  criadaEm: string;
}

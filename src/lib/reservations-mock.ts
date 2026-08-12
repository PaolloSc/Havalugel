import type { BookingStatus, LocalRetirada, FormaPagamento, Reservation } from "@/types/booking";
import type { BudgetResult } from "@/lib/pricing.types";

const RESERVATIONS_KEY = "hava:reservations";

function readAll(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(RESERVATIONS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeAll(reservations: Reservation[]) {
  window.localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
}

export function listReservations(userId: string): Reservation[] {
  return readAll()
    .filter((r) => r.userId === userId)
    .sort((a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime());
}

export function getReservation(id: string): Reservation | undefined {
  return readAll().find((r) => r.id === id);
}

export interface CreateReservationInput {
  userId: string;
  motoId: string;
  motoSlug: string;
  motoNome: string;
  dataRetirada: string;
  dataDevolucao: string;
  localRetirada: LocalRetirada;
  formaPagamento: FormaPagamento;
  budget: BudgetResult;
}

export function createReservation(input: CreateReservationInput): Reservation {
  const reservation: Reservation = {
    id: crypto.randomUUID(),
    status: input.formaPagamento === "online" ? "confirmada" : "pendente",
    criadaEm: new Date().toISOString(),
    ...input,
  };
  writeAll([...readAll(), reservation]);
  return reservation;
}

export function updateReservationStatus(id: string, status: BookingStatus) {
  const all = readAll();
  const next = all.map((r) => (r.id === id ? { ...r, status } : r));
  writeAll(next);
}

export function cancelReservation(id: string) {
  updateReservationStatus(id, "cancelada");
}

import { FERIADOS_PROLONGADOS, MESES_ALTA_TEMPORADA } from "./pricing.constants";

const MS_POR_DIA = 1000 * 60 * 60 * 24;

/** Diferença em diárias corridas. Mesmo dia (ou devolução < retirada) sempre cobra ao menos 1. */
export function diffDiarias(dataRetirada: Date, dataDevolucao: Date): number {
  const inicio = new Date(
    dataRetirada.getFullYear(),
    dataRetirada.getMonth(),
    dataRetirada.getDate()
  );
  const fim = new Date(
    dataDevolucao.getFullYear(),
    dataDevolucao.getMonth(),
    dataDevolucao.getDate()
  );
  const dias = Math.round((fim.getTime() - inicio.getTime()) / MS_POR_DIA);
  return Math.max(1, dias);
}

function dataDentroDeFeriado(data: Date): boolean {
  const t = data.getTime();
  return FERIADOS_PROLONGADOS.some(({ inicio, fim }) => {
    const i = new Date(`${inicio}T00:00:00`).getTime();
    const f = new Date(`${fim}T23:59:59`).getTime();
    return t >= i && t <= f;
  });
}

/** Alta temporada se qualquer dia do período cair em dez/jan/fev ou em feriado prolongado. */
export function isAltaTemporada(dataRetirada: Date, dataDevolucao: Date): boolean {
  const dias = diffDiarias(dataRetirada, dataDevolucao);
  for (let i = 0; i <= dias; i++) {
    const dia = new Date(dataRetirada);
    dia.setDate(dia.getDate() + i);
    if (MESES_ALTA_TEMPORADA.includes(dia.getMonth()) || dataDentroDeFeriado(dia)) {
      return true;
    }
  }
  return false;
}

export function diasDeAntecedencia(dataRetirada: Date, agora: Date = new Date()): number {
  const inicio = new Date(dataRetirada.getFullYear(), dataRetirada.getMonth(), dataRetirada.getDate());
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  return Math.floor((inicio.getTime() - hoje.getTime()) / MS_POR_DIA);
}

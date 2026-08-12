import type { BudgetInput, BudgetLineItem, BudgetResult, CupomAplicado } from "./pricing.types";
import {
  ALTA_TEMPORADA_PERCENTUAL,
  CAUCAO_POR_CATEGORIA,
  CUPONS,
  DESCONTOS_POR_PERIODO,
  EXTRAS_VALORES,
  KM_EXCEDENTE_VALOR_POR_KM,
  KM_FRANQUIA_POR_DIARIA,
  KM_ILIMITADO_ADICIONAL,
  MULTA_ATRASO,
  POLITICA_CANCELAMENTO,
  SEGURO_POR_CATEGORIA,
  TAXA_LIMPEZA,
  TAXA_PROCESSAMENTO,
} from "./pricing.constants";
import { diffDiarias, isAltaTemporada } from "./dates";

function descontoParaDiarias(diarias: number): number {
  const faixa = DESCONTOS_POR_PERIODO.find((f) => diarias >= f.min && diarias <= f.max);
  return faixa?.percentual ?? 0;
}

/**
 * Motor de cálculo do orçamento. Puro (sem I/O), segue os 8 passos definidos
 * na especificação de negócio, na ordem exata: diárias -> desconto por período
 * -> alta temporada -> seguro -> extras -> taxas fixas -> cupom -> total + caução.
 */
export function calcularOrcamento(input: BudgetInput): BudgetResult {
  const { moto, dataRetirada, dataDevolucao, protecaoTotal, extras, kmIlimitado, cupom } = input;

  // Passo 1
  const diarias = diffDiarias(dataRetirada, dataDevolucao);
  const valorDiariaBase = moto.valorDiaria;
  const subtotalDiarias = diarias * valorDiariaBase;

  // Passo 2 — desconto incide só sobre as diárias
  const descontoPercentual = descontoParaDiarias(diarias);
  const descontoValor = subtotalDiarias * descontoPercentual;
  const diariasComDesconto = subtotalDiarias - descontoValor;

  // Passo 3 — alta temporada, sobre o valor já descontado
  const altaTemporada = isAltaTemporada(dataRetirada, dataDevolucao);
  const acrescimoAltaTemporadaValor = altaTemporada
    ? diariasComDesconto * ALTA_TEMPORADA_PERCENTUAL
    : 0;
  const subtotalDiariasComAjustes = diariasComDesconto + acrescimoAltaTemporadaValor;

  // Passo 4 — seguro: Proteção Total substitui o Básico, nunca soma
  const tabelaSeguro = SEGURO_POR_CATEGORIA[moto.categoriaSeguro];
  const seguroDiaria = protecaoTotal ? tabelaSeguro.protecaoTotal : tabelaSeguro.basico;
  const seguro: BudgetLineItem = {
    label: protecaoTotal ? "Proteção Total" : "Seguro Básico",
    value: seguroDiaria * diarias,
  };

  // Passo 5 — extras + km
  const extrasLinhas: BudgetLineItem[] = [];
  if (extras.capaceteExtra) {
    extrasLinhas.push({
      label: "Capacete extra",
      value: EXTRAS_VALORES.capaceteExtra * diarias,
    });
  }
  if (extras.bau) {
    extrasLinhas.push({ label: "Baú / Bagageiro", value: EXTRAS_VALORES.bau * diarias });
  }
  if (extras.condutorAdicional) {
    extrasLinhas.push({
      label: "Condutor adicional",
      value: EXTRAS_VALORES.condutorAdicional * diarias,
    });
  }
  if (extras.gps) {
    extrasLinhas.push({ label: "GPS", value: EXTRAS_VALORES.gps * diarias });
  }
  if (extras.entrega) {
    extrasLinhas.push({ label: "Entrega / Coleta", value: extras.entregaValor });
  }

  let kmFranquiaTotal: number | "ilimitado";
  if (kmIlimitado) {
    kmFranquiaTotal = "ilimitado";
    extrasLinhas.push({
      label: "Km Ilimitado",
      value: KM_ILIMITADO_ADICIONAL[moto.categoriaSeguro] * diarias,
    });
  } else {
    kmFranquiaTotal = KM_FRANQUIA_POR_DIARIA * diarias;
  }

  // Passo 6 — taxas fixas (uma vez por reserva)
  const taxasFixas: BudgetLineItem[] = [
    { label: "Taxa de limpeza", value: TAXA_LIMPEZA },
    { label: "Taxa de processamento", value: TAXA_PROCESSAMENTO },
  ];

  const totalAntesDoCupom =
    subtotalDiariasComAjustes +
    seguro.value +
    extrasLinhas.reduce((acc, l) => acc + l.value, 0) +
    taxasFixas.reduce((acc, l) => acc + l.value, 0);

  // Passo 7 — cupom, aplicado por último sobre o total acumulado
  let cupomAplicado: CupomAplicado | undefined;
  if (cupom && cupom.trim().length > 0) {
    const codigo = cupom.trim().toUpperCase();
    const encontrado = CUPONS.find((c) => c.codigo === codigo);
    if (!encontrado || !encontrado.ativo) {
      cupomAplicado = { codigo, valido: false, motivo: "Cupom inválido ou expirado", descontoValor: 0 };
    } else {
      const descontoValor =
        encontrado.tipo === "percentual"
          ? totalAntesDoCupom * encontrado.valor
          : Math.min(encontrado.valor, totalAntesDoCupom);
      cupomAplicado = { codigo, valido: true, descontoValor };
    }
  }

  // Passo 8 — total final + caução separada
  const totalReserva = totalAntesDoCupom - (cupomAplicado?.descontoValor ?? 0);
  const caucao = CAUCAO_POR_CATEGORIA[moto.categoriaSeguro];

  const detalhamento: BudgetLineItem[] = [
    { label: `${diarias} diária${diarias > 1 ? "s" : ""} x ${valorDiariaBase.toFixed(2)}`, value: subtotalDiarias },
    ...(descontoValor > 0
      ? [{ label: `Desconto (${(descontoPercentual * 100).toFixed(0)}%)`, value: -descontoValor }]
      : []),
    ...(acrescimoAltaTemporadaValor > 0
      ? [{ label: "Alta temporada (+20%)", value: acrescimoAltaTemporadaValor }]
      : []),
    seguro,
    ...extrasLinhas,
    ...taxasFixas,
    ...(cupomAplicado?.valido
      ? [{ label: `Cupom ${cupomAplicado.codigo}`, value: -cupomAplicado.descontoValor }]
      : []),
  ];

  return {
    diarias,
    valorDiariaBase,
    subtotalDiarias,
    descontoPercentual,
    descontoValor,
    altaTemporada,
    acrescimoAltaTemporadaValor,
    subtotalDiariasComAjustes,
    seguro,
    extras: extrasLinhas,
    kmFranquiaTotal,
    taxasFixas,
    cupom: cupomAplicado,
    totalReserva,
    caucao,
    detalhamento,
  };
}

/** Multa por atraso na devolução. Retorna valor extra a cobrar (diária + taxa). */
export function calcularMulta(
  atrasoHoras: number,
  valorDiaria: number
): { cobravel: boolean; valor: number; descricao: string; acaoLegal: boolean } {
  if (atrasoHoras <= MULTA_ATRASO.toleranciaHoras) {
    return { cobravel: false, valor: 0, descricao: "Dentro da tolerância", acaoLegal: false };
  }
  if (atrasoHoras <= 24) {
    return {
      cobravel: true,
      valor: valorDiaria + MULTA_ATRASO.ate24hTaxa,
      descricao: "1 diária extra + taxa de atraso",
      acaoLegal: false,
    };
  }
  const diasDeAtraso = Math.ceil(atrasoHoras / 24);
  const acaoLegal = atrasoHoras > 72;
  return {
    cobravel: true,
    valor: valorDiaria + MULTA_ATRASO.apos24hTaxaPorDia * diasDeAtraso,
    descricao: acaoLegal
      ? "Diária extra + taxa administrativa diária — apropriação indébita, medidas legais iniciadas"
      : "Diária extra + taxa administrativa diária",
    acaoLegal,
  };
}

/**
 * Km excedente cobrado na devolução (franquia não se aplica com Km Ilimitado contratado).
 * Cálculo pós-viagem, não entra no orçamento prévio pois depende do km efetivamente rodado.
 */
export function calcularKmExcedente(
  kmRodado: number,
  diarias: number,
  kmIlimitado: boolean
): { kmExcedente: number; valor: number } {
  if (kmIlimitado) return { kmExcedente: 0, valor: 0 };
  const franquia = KM_FRANQUIA_POR_DIARIA * diarias;
  const kmExcedente = Math.max(0, kmRodado - franquia);
  return { kmExcedente, valor: kmExcedente * KM_EXCEDENTE_VALOR_POR_KM };
}

/** Reembolso de cancelamento conforme antecedência (em dias) até a retirada. */
export function calcularReembolso(
  diasAntecedencia: number,
  totalPago: number
): { percentual: number; valor: number } {
  if (diasAntecedencia < 1) {
    return { percentual: 0, valor: 0 };
  }
  const faixa = POLITICA_CANCELAMENTO.find((f) => diasAntecedencia >= f.minDias);
  const percentual = faixa?.percentualReembolso ?? 0;
  return { percentual, valor: totalPago * percentual };
}

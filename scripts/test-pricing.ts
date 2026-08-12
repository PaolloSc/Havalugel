import { calcularOrcamento, calcularReembolso } from "../src/lib/pricing";
import type { Moto } from "../src/types/moto";

const titan: Moto = {
  id: "5",
  slug: "honda-titan-160",
  nome: "Titan 160",
  marca: "Honda",
  categoriaSeguro: "titan",
  categoriaLabel: "Titan",
  valorDiaria: 129,
  caucao: 900,
  cilindrada: "160cc",
  cambio: "Manual",
  ano: 2024,
  cor: "Laranja",
  descricao: "",
};

const biz: Moto = { ...titan, categoriaSeguro: "biz", valorDiaria: 89, caucao: 600 };

function extras(overrides: Partial<ReturnType<typeof baseExtras>> = {}) {
  return { ...baseExtras(), ...overrides };
}
function baseExtras() {
  return { capaceteExtra: false, bau: false, condutorAdicional: false, gps: false, entrega: false, entregaValor: 0 };
}

function d(s: string) {
  return new Date(`${s}T00:00:00`);
}

function run(name: string, fn: () => void) {
  try {
    fn();
    console.log(`OK   ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}: ${(e as Error).message}`);
  }
}

function assertClose(actual: number, expected: number, msg: string) {
  if (Math.abs(actual - expected) > 0.01) {
    throw new Error(`${msg}: expected ${expected}, got ${actual}`);
  }
}

// 1. Mesmo dia = 1 diária
run("mesmo dia = 1 diária", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.diarias, 1, "diarias");
  assertClose(r.subtotalDiarias, 129, "subtotalDiarias");
});

// 2. 5 diárias -> desconto 5%
run("5 diárias -> 5% desconto", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-20"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.diarias, 5, "diarias");
  assertClose(r.subtotalDiarias, 645, "subtotalDiarias");
  assertClose(r.descontoPercentual, 0.05, "descontoPercentual");
  assertClose(r.descontoValor, 32.25, "descontoValor");
  assertClose(r.subtotalDiariasComAjustes, 612.75, "diariasComDesconto (sem alta temporada)");
});

// 3. 10 diárias -> 10%
run("10 diárias -> 10% desconto", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-07-01"), dataDevolucao: d("2026-07-11"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.descontoPercentual, 0.1, "descontoPercentual");
});

// 4. 20 diárias -> 15%
run("20 diárias -> 15% desconto", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-07-01"), dataDevolucao: d("2026-07-21"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.descontoPercentual, 0.15, "descontoPercentual");
});

// 5. 35 diárias -> 20%
run("35 diárias -> 20% desconto", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-07-01"), dataDevolucao: d("2026-08-05"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.descontoPercentual, 0.2, "descontoPercentual");
});

// 6. Alta temporada (janeiro) soma sobre valor com desconto
run("alta temporada aplica 20% sobre valor já descontado", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-01-05"), dataDevolucao: d("2026-01-10"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.diarias, 5, "diarias");
  assertClose(r.descontoValor, 32.25, "descontoValor (5%)");
  if (!r.altaTemporada) throw new Error("altaTemporada deveria ser true em janeiro");
  assertClose(r.acrescimoAltaTemporadaValor, 612.75 * 0.2, "acrescimo alta temporada");
});

// 7. Seguro básico vs proteção total nunca somam, por categoria
run("seguro básico vs proteção total (biz)", () => {
  const basico = calcularOrcamento({ moto: biz, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  const total = calcularOrcamento({ moto: biz, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: true, extras: extras(), kmIlimitado: false });
  assertClose(basico.seguro.value, 18, "seguro basico biz");
  assertClose(total.seguro.value, 35, "protecao total biz");
});

// 8. Extras somados
run("extras somados (5 diárias)", () => {
  const r = calcularOrcamento({
    moto: titan,
    dataRetirada: d("2026-08-15"),
    dataDevolucao: d("2026-08-20"),
    protecaoTotal: false,
    extras: extras({ capaceteExtra: true, bau: true, condutorAdicional: true, gps: true }),
    kmIlimitado: false,
  });
  const somaExtras = r.extras.filter((e) => e.label !== "Entrega / Coleta").reduce((a, b) => a + b.value, 0);
  assertClose(somaExtras, (15 + 20 + 30 + 12) * 5, "soma extras");
});

// 9. Entrega cobrada uma vez (não multiplicada por diária)
run("entrega cobrada uma vez", () => {
  const r = calcularOrcamento({
    moto: titan,
    dataRetirada: d("2026-08-15"),
    dataDevolucao: d("2026-08-20"),
    protecaoTotal: false,
    extras: extras({ entrega: true, entregaValor: 80 }),
    kmIlimitado: false,
  });
  const entrega = r.extras.find((e) => e.label === "Entrega / Coleta");
  assertClose(entrega!.value, 80, "entrega");
});

// 10. Km ilimitado remove franquia e cobra adicional por categoria
run("km ilimitado (titan +35/diária, remove franquia)", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-18"), protecaoTotal: false, extras: extras(), kmIlimitado: true });
  if (r.kmFranquiaTotal !== "ilimitado") throw new Error("franquia deveria ser ilimitada");
  const kmLine = r.extras.find((e) => e.label === "Km Ilimitado");
  assertClose(kmLine!.value, 35 * 3, "km ilimitado titan");
});
run("km ilimitado (biz +25/diária)", () => {
  const r = calcularOrcamento({ moto: biz, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-18"), protecaoTotal: false, extras: extras(), kmIlimitado: true });
  const kmLine = r.extras.find((e) => e.label === "Km Ilimitado");
  assertClose(kmLine!.value, 25 * 3, "km ilimitado biz");
});

// 11. Taxas fixas cobradas uma única vez
run("taxas fixas únicas independente de diárias", () => {
  const r1 = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-16"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  const r30 = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-09-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  const taxas1 = r1.taxasFixas.reduce((a, b) => a + b.value, 0);
  const taxas30 = r30.taxasFixas.reduce((a, b) => a + b.value, 0);
  assertClose(taxas1, 55, "taxas 1 diaria");
  assertClose(taxas30, 55, "taxas 30 diarias");
});

// 12. Cupom válido percentual, cupom fixo, cupom inválido
run("cupom percentual HAVA10", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false, cupom: "HAVA10" });
  const totalAntes = 129 + 28 + 40 + 15;
  assertClose(r.cupom!.descontoValor, totalAntes * 0.1, "desconto HAVA10");
  assertClose(r.totalReserva, totalAntes * 0.9, "total com HAVA10");
});
run("cupom fixo BEMVINDO20", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false, cupom: "BEMVINDO20" });
  assertClose(r.cupom!.descontoValor, 20, "desconto fixo");
});
run("cupom inválido não quebra e não desconta", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false, cupom: "NAOEXISTE" });
  if (r.cupom!.valido) throw new Error("deveria ser inválido");
  assertClose(r.cupom!.descontoValor, 0, "sem desconto");
});

// 13. Caução separada do total, por categoria
run("caução separada do total (não soma)", () => {
  const r = calcularOrcamento({ moto: titan, dataRetirada: d("2026-08-15"), dataDevolucao: d("2026-08-15"), protecaoTotal: false, extras: extras(), kmIlimitado: false });
  assertClose(r.caucao, 900, "caucao titan");
  if (r.totalReserva === r.caucao + 0) {
    /* ok, only if coincidence — real check is caucao not included in detalhamento sum */
  }
  const somaDetalhamento = r.detalhamento.reduce((a, b) => a + b.value, 0);
  assertClose(somaDetalhamento, r.totalReserva, "detalhamento soma = total (caução fora)");
});

// 14. Cancelamento / reembolso por antecedência
run("reembolso por antecedência", () => {
  assertClose(calcularReembolso(10, 1000).percentual, 1, "10 dias = 100%");
  assertClose(calcularReembolso(5, 1000).percentual, 0.7, "5 dias = 70%");
  assertClose(calcularReembolso(1, 1000).percentual, 0.4, "1 dia = 40%");
  assertClose(calcularReembolso(-1, 1000).percentual, 0, "no-show = 0%");
});

console.log("\nDone.");

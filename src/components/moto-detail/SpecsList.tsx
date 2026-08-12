import type { Moto } from "@/types/moto";
import { formatBRL } from "@/lib/format";
import { SEGURO_POR_CATEGORIA, KM_FRANQUIA_POR_DIARIA } from "@/lib/pricing.constants";

export function SpecsList({ moto }: { moto: Moto }) {
  const seguro = SEGURO_POR_CATEGORIA[moto.categoriaSeguro];

  const specs = [
    { label: "Cilindrada", value: moto.cilindrada },
    { label: "Câmbio", value: moto.cambio },
    { label: "Ano", value: String(moto.ano) },
    { label: "Cor", value: moto.cor },
    { label: "Franquia de km", value: `${KM_FRANQUIA_POR_DIARIA} km/diária` },
    { label: "Caução", value: formatBRL(moto.caucao) },
    { label: "Seguro Básico", value: `${formatBRL(seguro.basico)}/dia` },
    { label: "Proteção Total", value: `${formatBRL(seguro.protecaoTotal)}/dia` },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden border border-hava-line bg-hava-line sm:grid-cols-4">
      {specs.map((spec) => (
        <div key={spec.label} className="bg-hava-black-soft px-4 py-4">
          <span className="block text-[11px] uppercase tracking-widest text-hava-gray">
            {spec.label}
          </span>
          <span className="mt-1 block font-mono text-sm text-hava-white">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}

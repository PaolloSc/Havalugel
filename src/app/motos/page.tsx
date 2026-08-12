"use client";

import { useMemo, useState } from "react";
import { MOTOS } from "@/data/motos";
import { MotoCard } from "@/components/catalog/MotoCard";
import { MotoFilters, type FiltersState } from "@/components/catalog/MotoFilters";

const FILTROS_INICIAIS: FiltersState = { categoria: "", cambio: "", precoMax: "", busca: "" };

export default function CatalogoPage() {
  const [filtros, setFiltros] = useState<FiltersState>(FILTROS_INICIAIS);

  const motosFiltradas = useMemo(() => {
    return MOTOS.filter((moto) => {
      if (filtros.categoria && moto.categoriaSeguro !== filtros.categoria) return false;
      if (filtros.cambio && moto.cambio !== filtros.cambio) return false;
      if (filtros.precoMax && moto.valorDiaria > Number(filtros.precoMax)) return false;
      if (
        filtros.busca &&
        !`${moto.marca} ${moto.nome}`.toLowerCase().includes(filtros.busca.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filtros]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-hava-orange">Catálogo</span>
        <h1 className="mt-2 font-display text-5xl leading-none text-hava-white md:text-6xl">
          ESCOLHA
          <br />
          SUA MOTO
        </h1>
      </div>

      <div className="mb-10">
        <MotoFilters value={filtros} onChange={setFiltros} />
      </div>

      {motosFiltradas.length === 0 ? (
        <p className="border border-dashed border-hava-line py-16 text-center text-hava-gray">
          Nenhuma moto encontrada com esses filtros.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {motosFiltradas.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      )}
    </div>
  );
}

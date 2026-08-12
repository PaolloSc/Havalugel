"use client";

import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

export interface FiltersState {
  categoria: string;
  cambio: string;
  precoMax: string;
  busca: string;
}

interface MotoFiltersProps {
  value: FiltersState;
  onChange: (value: FiltersState) => void;
}

export function MotoFilters({ value, onChange }: MotoFiltersProps) {
  return (
    <div className="grid gap-4 border border-hava-line bg-hava-black-soft p-5 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        label="Buscar"
        placeholder="Nome da moto..."
        value={value.busca}
        onChange={(e) => onChange({ ...value, busca: e.target.value })}
      />
      <Select
        label="Categoria"
        value={value.categoria}
        onChange={(e) => onChange({ ...value, categoria: e.target.value })}
      >
        <option value="">Todas</option>
        <option value="biz">Popular (Biz)</option>
        <option value="cg_fan_start">Intermediária (CG/Fan)</option>
        <option value="titan">Titan</option>
        <option value="premium">Premium</option>
      </Select>
      <Select
        label="Câmbio"
        value={value.cambio}
        onChange={(e) => onChange({ ...value, cambio: e.target.value })}
      >
        <option value="">Todos</option>
        <option value="Manual">Manual</option>
        <option value="Automático">Automático</option>
      </Select>
      <Select
        label="Até (diária)"
        value={value.precoMax}
        onChange={(e) => onChange({ ...value, precoMax: e.target.value })}
      >
        <option value="">Sem limite</option>
        <option value="90">R$ 90</option>
        <option value="120">R$ 120</option>
        <option value="150">R$ 150</option>
        <option value="200">R$ 200</option>
      </Select>
    </div>
  );
}

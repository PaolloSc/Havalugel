export type CategoriaSeguro = "biz" | "cg_fan_start" | "titan" | "premium";

export interface Moto {
  id: string;
  slug: string;
  nome: string;
  marca: string;
  categoriaSeguro: CategoriaSeguro;
  categoriaLabel: string;
  valorDiaria: number;
  caucao: number;
  cilindrada: string;
  cambio: "Manual" | "Automático";
  ano: number;
  cor: string;
  destaque?: boolean;
  descricao: string;
}

export interface Testimonial {
  nome: string;
  cidade: string;
  moto: string;
  nota: number;
  texto: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    nome: "Rafael Souza",
    cidade: "São Paulo, SP",
    moto: "Titan 160",
    nota: 5,
    texto: "Orçamento na hora, sem enrolação. Retirei a moto em 15 minutos e o valor bateu exatamente com o que calculei no site.",
  },
  {
    nome: "Camila Alves",
    cidade: "Campinas, SP",
    moto: "PCX 160",
    nota: 5,
    texto: "Usei a Havalugue pra um evento de 3 dias. Km ilimitado valeu muito a pena e o atendimento na entrega foi rápido.",
  },
  {
    nome: "Diego Ferreira",
    cidade: "São Bernardo, SP",
    moto: "Biz 125",
    nota: 4,
    texto: "Preço justo pra quem precisa só pra ir e voltar do trabalho. Só acho que a franquia de km podia ser um pouco maior.",
  },
  {
    nome: "Bianca Ramos",
    cidade: "Guarulhos, SP",
    moto: "NMAX 160",
    nota: 5,
    texto: "Alugo todo mês pros meus fins de semana. Cadastro simples, reserva direto no celular e a moto sempre impecável.",
  },
];

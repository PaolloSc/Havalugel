import { HowItWorks } from "@/components/home/HowItWorks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";

const REGRAS = [
  { titulo: "Desconto por período", texto: "3–6 diárias: 5% · 7–13: 10% · 14–29: 15% · 30+: 20%." },
  { titulo: "Seguro obrigatório", texto: "Todo aluguel inclui Seguro Básico. Proteção Total substitui (não acumula)." },
  { titulo: "Franquia de km", texto: "150km por diária. Excedente R$ 0,85/km, ou contrate Km Ilimitado." },
  { titulo: "Alta temporada", texto: "Dezembro a fevereiro e feriados prolongados: +20% sobre as diárias." },
  { titulo: "Cancelamento", texto: ">7 dias: 100% · 3–7 dias: 70% · <3 dias: 40% · no-show: sem reembolso." },
  { titulo: "Combustível", texto: "Moto sai e volta com tanque cheio. Senão, cobramos o combustível + taxa." },
];

const FAQ: AccordionItem[] = [
  {
    question: "Quais documentos preciso apresentar?",
    answer:
      "CNH válida na categoria correta e um documento de identificação. No cadastro pedimos nome, e-mail, telefone, CPF e CNH — os documentos são conferidos no momento da retirada.",
  },
  {
    question: "Como funciona a caução?",
    answer:
      "É um bloqueio no cartão (não uma cobrança), com valor entre R$ 600 e R$ 1.500 dependendo da categoria da moto. É liberado após a devolução, se estiver tudo certo.",
  },
  {
    question: "O que acontece se eu atrasar a devolução?",
    answer:
      "Até 2h de atraso não cobramos nada. Entre 2h e 24h, cobramos 1 diária extra + taxa de R$ 50. Acima de 24h, diária extra + R$ 80 por dia de atraso. Após 72h sem contato, tratamos como apropriação indébita e acionamos medidas legais.",
  },
  {
    question: "Posso pedir entrega em vez de retirar na loja?",
    answer:
      "Sim — a entrega/coleta custa entre R$ 50 e R$ 120, dependendo da distância, e aparece como item separado no seu orçamento.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Você escolhe entre pagar na retirada ou pagar online no momento da reserva (com taxa de processamento de R$ 15 para pagamento online).",
  },
  {
    question: "Preciso devolver com tanque cheio?",
    answer:
      "Sim — a moto sai e deve voltar com o tanque cheio. Se não devolver assim, cobramos o valor do combustível faltante + taxa de R$ 35.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-hava-orange">Transparência total</span>
        <h1 className="mt-2 mb-4 font-display text-5xl leading-none text-hava-white md:text-6xl">
          COMO
          <br />
          FUNCIONA
        </h1>
        <p className="max-w-xl text-hava-gray">
          Sem letra miúda. Aqui está exatamente como calculamos seu orçamento.
        </p>
      </div>

      <HowItWorks />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="mb-10 font-display text-4xl leading-none text-hava-white md:text-5xl">
          REGRAS DO <span className="text-hava-orange">ORÇAMENTO</span>
        </h2>
        <div className="grid gap-px overflow-hidden border border-hava-line bg-hava-line sm:grid-cols-2 lg:grid-cols-3">
          {REGRAS.map((regra, i) => (
            <Reveal key={regra.titulo} delay={(i % 3) * 90} className="bg-hava-black-soft p-6">
              <h3 className="mb-2 font-display text-xl tracking-tight text-hava-white">{regra.titulo}</h3>
              <p className="text-sm text-hava-gray">{regra.texto}</p>
            </Reveal>
          ))}
        </div>

      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="mb-10 font-display text-4xl leading-none text-hava-white md:text-5xl">
          PERGUNTAS <span className="text-hava-orange">FREQUENTES</span>
        </h2>
        <Accordion items={FAQ} />

        <div className="mt-12 flex justify-center">
          <Button href="/motos">Ver catálogo de motos</Button>
        </div>
      </section>
    </div>
  );
}

import { HowItWorks } from "@/components/home/HowItWorks";
import { Button } from "@/components/ui/Button";

const REGRAS = [
  { titulo: "Desconto por período", texto: "3–6 diárias: 5% · 7–13: 10% · 14–29: 15% · 30+: 20%." },
  { titulo: "Seguro obrigatório", texto: "Todo aluguel inclui Seguro Básico. Proteção Total substitui (não acumula)." },
  { titulo: "Franquia de km", texto: "150km por diária. Excedente R$ 0,85/km, ou contrate Km Ilimitado." },
  { titulo: "Alta temporada", texto: "Dezembro a fevereiro e feriados prolongados: +20% sobre as diárias." },
  { titulo: "Cancelamento", texto: ">7 dias: 100% · 3–7 dias: 70% · <3 dias: 40% · no-show: sem reembolso." },
  { titulo: "Combustível", texto: "Moto sai e volta com tanque cheio. Senão, cobramos o combustível + taxa." },
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
          {REGRAS.map((regra) => (
            <div key={regra.titulo} className="bg-hava-black-soft p-6">
              <h3 className="mb-2 font-display text-xl tracking-tight text-hava-white">{regra.titulo}</h3>
              <p className="text-sm text-hava-gray">{regra.texto}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/motos">Ver catálogo de motos</Button>
        </div>
      </section>
    </div>
  );
}

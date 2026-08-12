import { Bike, Calculator, CalendarCheck, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: Bike,
    title: "Escolha a moto",
    text: "Filtre por categoria e veja o preço da diária na hora.",
  },
  {
    icon: Calculator,
    title: "Monte o orçamento",
    text: "Seguro, extras, km e desconto por período — tudo calculado em tempo real.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve online",
    text: "Preencha seus dados, envie os documentos e confirme a reserva.",
  },
  {
    icon: PackageCheck,
    title: "Retire e rode",
    text: "Na loja ou com entrega. Tanque cheio, pronta pra sair.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-hava-line bg-hava-black">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl leading-none text-hava-white md:text-5xl">
            COMO
            <br />
            <span className="text-hava-orange">FUNCIONA</span>
          </h2>
          <span className="font-mono text-xs text-hava-gray">01 — 04</span>
        </div>

        <div className="grid gap-px overflow-hidden border border-hava-line bg-hava-line md:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 100} className="bg-hava-black-soft p-6 md:p-8">
              <span className="font-mono text-xs text-hava-orange">0{i + 1}</span>
              <step.icon className="my-4 text-hava-orange" size={28} strokeWidth={1.5} />
              <h3 className="mb-2 font-display text-xl tracking-tight text-hava-white">{step.title}</h3>
              <p className="text-sm text-hava-gray">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

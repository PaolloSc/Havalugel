"use client";

import { Bike, KeyRound, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MotoSilhouette } from "@/components/ui/MotoSilhouette";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";

export function HeroFloating() {
  const ref = useParallax<HTMLDivElement>(30);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-hava-line">
      <div data-depth="0.15" className="hava-mesh absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-2 md:gap-6 md:px-8 md:pb-24 md:pt-20">
        <div className="relative z-10 flex flex-col justify-center">
          <Reveal>
            <span className="mb-5 inline-flex w-fit items-center gap-2 border border-hava-orange/60 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-hava-orange">
              Aluguel de motos · sem burocracia
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[15vw] leading-[0.85] tracking-tight text-hava-white sm:text-6xl md:text-7xl">
              RODE
              <br />
              <span className="text-hava-orange">HOJE.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-base text-hava-gray md:text-lg">
              Escolha a moto, monte seu orçamento em tempo real e reserve em minutos.
              Titan, CG, Fan, Biz e mais — pronta pra retirada.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/motos">Fazer orçamento</Button>
              <Button href="/como-funciona" variant="outline">
                Como funciona
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex gap-8 border-t border-hava-line pt-6 font-mono text-xs text-hava-gray">
              <div>
                <div className="font-display text-2xl text-hava-white">8+</div>
                modelos disponíveis
              </div>
              <div>
                <div className="font-display text-2xl text-hava-white">150km</div>
                franquia por diária
              </div>
              <div>
                <div className="font-display text-2xl text-hava-white">24/7</div>
                reserva online
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative flex items-center justify-center py-8 md:py-0">
          <div
            data-depth="0.5"
            className="hava-glow absolute h-[340px] w-[340px] rounded-full md:h-[420px] md:w-[420px]"
            aria-hidden="true"
          />

          <div data-depth="1.6" className="absolute left-2 top-4 animate-float-fast text-hava-orange md:left-6">
            <ShieldCheck size={34} strokeWidth={1.5} />
          </div>
          <div data-depth="1.2" className="absolute right-4 top-10 animate-float-med text-hava-white/70 md:right-10">
            <KeyRound size={30} strokeWidth={1.5} />
          </div>
          <div data-depth="1.4" className="absolute bottom-6 left-8 animate-float-slow text-hava-orange/80 md:left-4">
            <Bike size={30} strokeWidth={1.5} />
          </div>

          <div data-depth="0.9" className="hava-chrome animate-float-slow">
            <MotoSilhouette className="h-40 w-72 md:h-56 md:w-[420px]" tone="orange" />
          </div>

          <div
            data-depth="1.1"
            className="animate-float-med absolute bottom-2 right-2 flex items-center gap-3 border border-hava-line-strong bg-hava-black/70 px-4 py-3 backdrop-blur-sm md:right-6"
          >
            <div className="flex items-center gap-1 text-hava-orange">
              <Star size={16} fill="currentColor" strokeWidth={0} />
              <span className="font-display text-lg text-hava-white">4.9</span>
            </div>
            <div className="h-8 w-px bg-hava-line-strong" />
            <div className="font-mono text-[11px] leading-tight text-hava-gray">
              <div className="text-hava-white">+500</div>
              avaliações
            </div>
          </div>
        </Reveal>
      </div>

      <div className="hava-hazard flex h-9 items-center overflow-hidden" aria-hidden="true" />
      <div className="overflow-hidden border-b border-hava-line bg-hava-black-soft">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap py-3 font-mono text-xs font-medium uppercase tracking-widest text-hava-gray">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>Orçamento em tempo real</span>
              <span className="text-hava-orange">•</span>
              <span>Reserva 100% online</span>
              <span className="text-hava-orange">•</span>
              <span>Retirada em loja ou entrega</span>
              <span className="text-hava-orange">•</span>
              <span>Sem taxa escondida</span>
              <span className="text-hava-orange">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

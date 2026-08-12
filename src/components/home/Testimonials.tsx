import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="border-b border-hava-line bg-hava-black-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl leading-none text-hava-white md:text-5xl">
            QUEM ALUGOU
            <br />
            <span className="text-hava-orange">CONTA</span>
          </h2>
          <div className="flex items-center gap-2 font-mono text-xs text-hava-gray">
            <Star size={14} className="text-hava-orange" fill="currentColor" strokeWidth={0} />
            4.9 de média · +500 avaliações
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.nome} delay={i * 90} className="flex flex-col border border-hava-line bg-hava-black p-6">
              <div className="mb-4 flex gap-0.5 text-hava-orange">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star
                    key={star}
                    size={14}
                    fill={star < t.nota ? "currentColor" : "none"}
                    className={star < t.nota ? "" : "text-hava-line-strong"}
                    strokeWidth={star < t.nota ? 0 : 1.5}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm text-hava-gray">&ldquo;{t.texto}&rdquo;</p>
              <div className="mt-5 border-t border-hava-line pt-4">
                <span className="block text-sm font-bold text-hava-white">{t.nome}</span>
                <span className="block text-xs text-hava-gray">
                  {t.cidade} · alugou {t.moto}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

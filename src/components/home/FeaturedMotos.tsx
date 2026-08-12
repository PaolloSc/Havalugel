import { getMotosDestaque } from "@/data/motos";
import { MotoCard } from "@/components/catalog/MotoCard";
import { Button } from "@/components/ui/Button";

export function FeaturedMotos() {
  const motos = getMotosDestaque();

  return (
    <section className="bg-hava-black">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl leading-none text-hava-white md:text-5xl">
            EM
            <br />
            <span className="text-hava-orange">DESTAQUE</span>
          </h2>
          <Button href="/motos" variant="outline">
            Ver catálogo completo
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {motos.map((moto) => (
            <MotoCard key={moto.id} moto={moto} />
          ))}
        </div>
      </div>
    </section>
  );
}

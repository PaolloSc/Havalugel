import { notFound } from "next/navigation";
import { getMotoBySlug } from "@/data/motos";
import { MotoViewer } from "@/components/moto-detail/MotoViewer";
import { SpecsList } from "@/components/moto-detail/SpecsList";
import { BudgetCalculator } from "@/components/moto-detail/BudgetCalculator";

export default async function MotoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moto = getMotoBySlug(slug);
  if (!moto) notFound();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-2 text-xs uppercase tracking-widest text-hava-gray">
        Motos / {moto.marca} {moto.nome}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="mb-6 font-display text-5xl leading-none text-hava-white md:text-6xl">
            {moto.marca.toUpperCase()}
            <br />
            <span className="text-hava-orange">{moto.nome.toUpperCase()}</span>
          </h1>

          <MotoViewer moto={moto} />

          <p className="mt-6 max-w-2xl text-base text-hava-gray">{moto.descricao}</p>

          <div className="mt-8">
            <SpecsList moto={moto} />
          </div>
        </div>

        <BudgetCalculator moto={moto} />
      </div>
    </div>
  );
}

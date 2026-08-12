import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Moto } from "@/types/moto";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MotoSilhouette } from "@/components/ui/MotoSilhouette";
import { formatBRL } from "@/lib/format";

export function MotoCard({ moto }: { moto: Moto }) {
  return (
    <Link href={`/motos/${moto.slug}`} className="group block">
      <Card className="relative overflow-hidden p-5 transition-[transform,border-color] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-hava-orange">
        <div className="hava-glow absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

        <div className="mb-1 flex items-start justify-between">
          <Badge tone="muted">{moto.categoriaLabel}</Badge>
          <ArrowUpRight
            size={20}
            className="text-hava-gray transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hava-orange"
          />
        </div>

        <div className="relative flex h-32 items-center justify-center">
          <MotoSilhouette
            tone="outline"
            className="h-24 w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="font-display text-2xl leading-none tracking-tight text-hava-white">
          {moto.marca} {moto.nome}
        </h3>
        <p className="mt-1 text-xs text-hava-gray">
          {moto.cilindrada} · {moto.cambio}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-hava-line pt-4">
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-hava-gray">A partir de</span>
            <span className="font-mono text-lg font-semibold text-hava-orange">
              {formatBRL(moto.valorDiaria)}
              <span className="text-xs text-hava-gray">/dia</span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

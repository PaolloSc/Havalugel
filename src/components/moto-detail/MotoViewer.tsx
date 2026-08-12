"use client";

import type { Moto } from "@/types/moto";
import { MotoSilhouette } from "@/components/ui/MotoSilhouette";
import { Badge } from "@/components/ui/Badge";
import { useParallax } from "@/hooks/useParallax";

export function MotoViewer({ moto }: { moto: Moto }) {
  const ref = useParallax<HTMLDivElement>(16);

  return (
    <div ref={ref} className="relative flex h-72 items-center justify-center overflow-hidden border border-hava-line bg-hava-black-soft md:h-96">
      <div
        data-depth="0.4"
        className="hava-glow absolute h-[360px] w-[360px] rounded-full"
        aria-hidden="true"
      />
      <div className="absolute left-5 top-5 z-10">
        <Badge>{moto.categoriaLabel}</Badge>
      </div>
      <div data-depth="0.8" className="hava-chrome animate-float-slow">
        <MotoSilhouette tone="orange" className="h-40 w-72 md:h-56 md:w-[440px]" />
      </div>
    </div>
  );
}

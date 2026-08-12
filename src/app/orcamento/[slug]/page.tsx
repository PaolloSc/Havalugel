"use client";

import { Suspense, use, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getMotoBySlug } from "@/data/motos";
import { calcularOrcamento } from "@/lib/pricing";
import { parseBudgetParams } from "@/lib/budget-params";
import { useAuth } from "@/hooks/useAuth";
import { createReservation } from "@/lib/reservations-mock";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingForm, type BookingFormValues } from "@/components/booking/BookingForm";
import { Button } from "@/components/ui/Button";

function OrcamentoContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, hydrated } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const moto = getMotoBySlug(slug);
  const search = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  const resultado = useMemo(() => {
    if (!moto) return null;
    return calcularOrcamento(parseBudgetParams(moto, search));
  }, [moto, search]);

  if (!moto || !resultado) notFound();

  function handleConfirm(values: BookingFormValues) {
    if (!user) return;
    setSubmitting(true);
    const reserva = createReservation({
      userId: user.id,
      motoId: moto!.id,
      motoSlug: moto!.slug,
      motoNome: `${moto!.marca} ${moto!.nome}`,
      dataRetirada: search.retirada ?? new Date().toISOString().slice(0, 10),
      dataDevolucao: search.devolucao ?? new Date().toISOString().slice(0, 10),
      localRetirada: values.localRetirada,
      formaPagamento: values.formaPagamento,
      budget: resultado!,
    });
    router.push(`/reserva/${reserva.id}/confirmacao`);
  }

  if (hydrated && !user) {
    return (
      <div className="mx-auto max-w-md px-5 py-20 text-center">
        <h1 className="mb-4 font-display text-3xl text-hava-white">Entre para continuar</h1>
        <p className="mb-8 text-sm text-hava-gray">
          Você precisa estar logado pra confirmar a reserva. Seu orçamento fica salvo nesse link.
        </p>
        <div className="flex justify-center gap-3">
          <Button href={`/login?next=${encodeURIComponent(`/orcamento/${slug}?${searchParams.toString()}`)}`}>
            Entrar
          </Button>
          <Button variant="outline" href="/cadastro">
            Criar conta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="mb-2 text-xs uppercase tracking-widest text-hava-gray">
        <Link href={`/motos/${slug}`} className="hover:text-hava-orange">
          {moto.marca} {moto.nome}
        </Link>{" "}
        / Orçamento
      </div>
      <h1 className="mb-8 font-display text-5xl leading-none text-hava-white md:text-6xl">
        REVISE E
        <br />
        <span className="text-hava-orange">RESERVE</span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <BookingSummary
          moto={moto}
          resultado={resultado}
          dataRetirada={search.retirada ?? ""}
          dataDevolucao={search.devolucao ?? ""}
        />
        <BookingForm onConfirm={handleConfirm} submitting={submitting} />
      </div>
    </div>
  );
}

export default function OrcamentoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <Suspense fallback={null}>
      <OrcamentoContent slug={slug} />
    </Suspense>
  );
}

"use client";

import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { ReservationCard } from "@/components/account/ReservationCard";
import { Button } from "@/components/ui/Button";

export default function ContaPage() {
  const { user } = useAuth();
  const { reservations } = useReservations(user?.id);

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl leading-none text-hava-white md:text-5xl">
        MINHAS
        <br />
        <span className="text-hava-orange">RESERVAS</span>
      </h1>

      {reservations.length === 0 ? (
        <div className="border border-dashed border-hava-line px-6 py-16 text-center">
          <p className="mb-5 text-hava-gray">Você ainda não tem nenhuma reserva.</p>
          <Button href="/motos">Ver catálogo de motos</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <ReservationCard key={r.id} reservation={r} />
          ))}
        </div>
      )}
    </div>
  );
}

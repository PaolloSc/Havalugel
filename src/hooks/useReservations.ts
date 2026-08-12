"use client";

import { useCallback, useEffect, useState } from "react";
import type { Reservation } from "@/types/booking";
import * as reservationsMock from "@/lib/reservations-mock";

export function useReservations(userId: string | undefined) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const refresh = useCallback(() => {
    if (!userId) {
      setReservations([]);
      return;
    }
    setReservations(reservationsMock.listReservations(userId));
  }, [userId]);

  useEffect(() => {
    // localStorage is only readable client-side; load reservations post-mount to avoid SSR mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const cancel = useCallback(
    (id: string) => {
      reservationsMock.cancelReservation(id);
      refresh();
    },
    [refresh]
  );

  return { reservations, refresh, cancel };
}

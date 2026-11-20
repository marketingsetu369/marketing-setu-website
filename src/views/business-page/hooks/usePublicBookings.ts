"use client";

import { BusinessPageApi } from "@/api/repositories/businessPageApi";
import { useEffect, useState } from "react";

export interface PublicBookingSlot {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  displaySlot: string;
}

interface UsePublicBookingsReturn {
  slots: PublicBookingSlot[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePublicBookings(slug: string): UsePublicBookingsReturn {
  const [slots, setSlots] = useState<PublicBookingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookings = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const res = await BusinessPageApi.getPublicBookings(slug);
      const items = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : [];
      setSlots(items);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [slug]);

  return { slots, loading, error, refetch: fetchBookings };
}

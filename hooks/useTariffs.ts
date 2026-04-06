"use client";

import { useEffect, useState } from "react";

export type Tariff = {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
};

export function useTariffs() {
  const [tariffs, setTariffs] = useState<Tariff[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/tariffs");
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        const data: unknown = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Некорректный ответ");
        }
        if (!cancelled) {
          setTariffs(data as Tariff[]);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Не удалось загрузить тарифы");
          setTariffs(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { tariffs, isLoading, error };
}

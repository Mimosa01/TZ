"use client";

import Card from "@/components/Card";
import { useTariffs, type Tariff } from "@/hooks/useTariffs";
import { selectTariff } from "@/store/offerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const PERIOD_ORDER = ["Навсегда", "3 месяца", "1 месяц", "1 неделя"] as const;

function sortTariffs(tariffs: Tariff[]): Tariff[] {
  return [...tariffs].sort((a, b) => {
    const ia = PERIOD_ORDER.indexOf(
      a.period as (typeof PERIOD_ORDER)[number],
    );
    const ib = PERIOD_ORDER.indexOf(
      b.period as (typeof PERIOD_ORDER)[number],
    );
    const fa = ia === -1 ? 999 : ia;
    const fb = ib === -1 ? 999 : ib;
    return fa - fb;
  });
}

function discountPercent(price: number, fullPrice: number): string {
  if (fullPrice <= 0) {
    return "0";
  }
  return String(Math.round((1 - price / fullPrice) * 100));
}

export default function TariffsGrid() {
  const { tariffs, isLoading, error } = useTariffs();
  const promoActive = useAppSelector((s) => s.offer.promoActive);
  const selectedTariffKey = useAppSelector((s) => s.offer.selectedTariffKey);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="grid min-h-[200px] place-items-center rounded-[40px] border border-dark-600 bg-dark-800/50 text-white">
        Загрузка…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[40px] border border-critical px-4 py-8 text-center text-critical">
        {error}
      </div>
    );
  }

  if (!tariffs?.length) {
    return (
      <div className="rounded-[40px] border border-dark-600 px-4 py-8 text-center text-dark-600">
        Тарифы не найдены
      </div>
    );
  }

  const ordered = sortTariffs(tariffs);

  return (
    <div className="grid grid-cols-1 grid-rows-[131px_131px_131px_131px] gap-3.5 md:grid-cols-3 md:grid-rows-[190px_335px]">
      {ordered.map((t) => (
        <Card
          key={`${t.id}-${t.period}`}
          title={t.period}
          price={String(t.price)}
          oldPrice={String(t.full_price)}
          description={t.text}
          discount={discountPercent(t.price, t.full_price)}
          hit={t.is_best}
          promoActive={promoActive}
          selected={selectedTariffKey === t.period}
          onSelect={() =>
            dispatch(
              selectTariff(
                selectedTariffKey === t.period ? null : t.period,
              ),
            )
          }
          className={t.is_best ? "md:col-span-3" : undefined}
        />
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import clsx from "clsx";

export default function PurchaseBlock() {
  const selectedKey = useAppSelector((s) => s.offer.selectedTariffKey);
  const highlightBuy = selectedKey != null;

  const [consentAccepted, setConsentAccepted] = useState(false);
  const [consentError, setConsentError] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        checked={consentAccepted}
        onChange={(e) => {
          setConsentAccepted(e.target.checked);
          if (e.target.checked) {
            setConsentError(false);
          }
        }}
      >
        <p className="max-w-[605px] text-[12px] md:text-base text-white">
          Я согласен с{" "}
          <Link href="#" className="underline">
            офертой рекуррентных платежей{" "}
          </Link>
          и{" "}
          <Link href="#" className="underline">
            Политикой конфиденциальности
          </Link>
        </p>
      </Checkbox>
      <Button
        type="button"
        className={clsx(
          "w-full md:w-fit",
          consentError ? "bg-critical text-white" : "bg-gold",
          !consentError && highlightBuy && "animate-cta-blink",
        )}
        onClick={() => {
          if (!consentAccepted) {
            setConsentError(true);
          }
        }}
      >
        Купить
      </Button>
      <p className="w-full text-[10px] md:text-sm text-dark-500">
        Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения
        пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут
        сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
      </p>
    </div>
  );
}

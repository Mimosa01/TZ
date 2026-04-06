"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import StarIcon from "@/components/Icons/StarIcon";
import { endPromo } from "@/store/offerSlice";
import { useAppDispatch } from "@/store/hooks";
import { OFFER_TIMER_SECONDS, getOfferTimerSeconds } from "@/lib/offerTimer";

const TIMER_COLORS = {
  critical: "text-critical",
  warning: "text-yellow",
  normal: "text-white",
} as const;

export default function Timer() {
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const promoEndedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const seconds = await getOfferTimerSeconds();
        if (!cancelled) {
          setTimeLeft(seconds);
        }
      } catch {
        if (!cancelled) {
          setTimeLeft(OFFER_TIMER_SECONDS);
        }
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  const timerHydrated = timeLeft !== null;

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          return prev;
        }
        return Math.max(prev - 1, 0);
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
    // Намеренно не [timeLeft]: интервал один раз после загрузки, иначе setInterval пересоздаётся каждую секунду
    // eslint-disable-next-line react-hooks/exhaustive-deps -- timeLeft только для guard в теле эффекта
  }, [timerHydrated]);

  useEffect(() => {
    if (timeLeft === 0 && !promoEndedRef.current) {
      promoEndedRef.current = true;
      dispatch(endPromo());
    }
  }, [timeLeft, dispatch]);

  const color =
    timeLeft === null
      ? TIMER_COLORS.normal
      : TIMER_COLORS[
          timeLeft < 3 * 60 ? "critical" : timeLeft < 16 * 60 ? "warning" : "normal"
        ];

  const isBlinking =
    timeLeft !== null && timeLeft > 0 && timeLeft <= 30;

  const minutes =
    timeLeft === null
      ? "—"
      : Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0");
  const seconds =
    timeLeft === null
      ? "—"
      : (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div
      className={clsx(
        "flex items-center gap-2 font-raleway font-bold text-[40px]",
        color,
        isBlinking && "animate-timer-blink",
      )}
    >
      <StarIcon />
      <p>{minutes}</p>
      <p>:</p>
      <p>{seconds}</p>
      <StarIcon />
    </div>
  );
}

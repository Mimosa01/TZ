/** Длительность акционного таймера, секунды (единая точка правки). */
export const OFFER_TIMER_SECONDS = 0.5 * 60;

/**
 * Загрузка длительности таймера. Сейчас — хардкод; позже можно заменить на `fetch`.
 */
export async function getOfferTimerSeconds(): Promise<number> {
  return OFFER_TIMER_SECONDS;
}

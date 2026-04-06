# Лендинг оффера (TZ)

Next.js-приложение (App Router) с русскоязычным UI: блок акции с таймером, сетка тарифов с API, выбор плана и блок покупки с согласием на оферту.

## Стек

- [Next.js](https://nextjs.org) 16, React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- [Redux Toolkit](https://redux-toolkit.js.org) + `react-redux`
- `clsx`

## Что сделано

- Шрифты **Montserrat** и **Raleway** через `next/font`, токены в `app/globals.css`.
- Цвета и утилиты Tailwind через CSS-переменные и `@theme inline`.
- **Таймер акции** (`lib/offerTimer.ts`, `components/Timer.tsx`): асинхронная инициализация длительности, обратный отсчёт; по нулю — в Redux снимается режим акционных цен на карточках (`store/offerSlice.ts`).
- **Тарифы**: запрос через `app/api/tariffs/route.ts` (прокси к внешнему `GetTariffs`), отображение в `components/TariffsGrid.tsx` и `components/Card.tsx`.
- **Redux**: провайдер в `components/Providers.tsx`, обёртка в `app/layout.tsx`.
- **Главная страница**: `app/page.tsx`, секции `PlansSection`, `MoneyBackGuarantee`.
- **Покупка**: чекбокс согласия и проверка перед «Купить» (`components/PurchaseBlock.tsx`).

Для загрузки тарифов нужен доступ в интернет: без сети на странице может отобразиться ошибка загрузки.

## Как запустить

Требуется [Node.js](https://nodejs.org/) (рекомендуется актуальная LTS).

Из каталога проекта `tz/`:

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

Дополнительные команды:

| Команда | Назначение |
|--------|------------|
| `npm run build` | production-сборка |
| `npm run start` | запуск собранного приложения |
| `npm run lint` | ESLint |

## Деплой

См. [документацию Next.js по деплою](https://nextjs.org/docs/app/building-your-application/deploying), например [Vercel](https://vercel.com/new).

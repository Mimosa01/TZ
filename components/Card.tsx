import clsx from "clsx";

type CardProps = {
  title: string;
  price: string;
  oldPrice: string;
  description: string;
  discount: string;
  hit?: boolean;
  selected?: boolean;
  promoActive?: boolean;
  onSelect?: () => void;
  className?: string;
};

export default function Card({
  title,
  price,
  oldPrice,
  description,
  discount,
  hit,
  selected = false,
  promoActive = true,
  onSelect,
  className,
}: CardProps) {
  return (
    <div
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      className={clsx(
        "relative flex rounded-[20px] md:rounded-[40px] border-2 px-7.5 pt-5 pb-5 md:px-9 md:pt-15 md:pb-8.5 bg-dark-700 transition-[box-shadow,border-color] duration-300 ease-out",
        hit ? "flex-row border-gold" : "flex-col border-dark-600",
        selected && "ring-2 ring-gold ring-offset-2 ring-offset-dark-800 border-gold",
        onSelect && "cursor-pointer",
        className,
      )}
    >
      {hit && (
        <div className="absolute top-2.5 md:right-5 right-3.5">
          <p className="text-base md:text-[22px] text-gold">Хит!</p>
        </div>
      )}

      <div
        className={clsx(
          "absolute -top-px md:left-12.5 rounded-b-lg bg-critical md:px-2 md:py-1.5 px-1.5 py-1 transition-opacity duration-500 ease-out",
          promoActive ? "opacity-100" : "pointer-events-none opacity-0",
          hit ? "right-15.5 md:right-auto" : "right-7.5 md:right-auto",
        )}
        aria-hidden={!promoActive}
      >
        <p className="text-base md:text-[22px] text-white">-{discount}%</p>
      </div>

      <div
        className={clsx(
          "flex w-full",
          hit ? "mx-auto max-w-[546px] items-center justify-between gap-10" : "md:flex-col",
        )}
      >
        <div className="md:mx-auto flex w-fit flex-col items-start md:items-center text-white">
          <p className="mb-3 md:mb-7.5 text-base md:text-[26px]">{title}</p>

          <div className="relative mr-12.5 md:mr-0 md:mb-10">
            <div
              className={clsx(
                "flex flex-col transition-opacity duration-500 ease-out",
                promoActive ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
              )}
              aria-hidden={!promoActive}
            >
              <p
                className={clsx(
                  "whitespace-nowrap text-[34px] md:text-[50px] font-bold leading-none self-center",
                  hit ? "text-gold" : "text-white",
                )}
              >
                {price} ₽
              </p>
              <p className="text-base md:text-2xl font-light text-dark-500 line-through self-end">{oldPrice} ₽</p>
            </div>

            <div
              className={clsx(
                "flex flex-col transition-opacity duration-500 ease-out delay-75",
                !promoActive ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
              )}
              aria-hidden={promoActive}
            >
              <p
                className={clsx(
                  "whitespace-nowrap text-[34px] md:text-[50px] font-bold leading-none",
                  hit ? "text-gold" : "text-white",
                )}
              >
                {oldPrice} ₽
              </p>
              <span className="text-sm font-normal text-dark-500">без скидки</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm md:text-base text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}

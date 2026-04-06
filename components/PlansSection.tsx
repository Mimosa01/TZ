import WarningIcon from "@/components/Icons/WarningIcon";
import PurchaseBlock from "@/components/PurchaseBlock";
import TariffsGrid from "@/components/TariffsGrid";
import Image from "next/image";

export default function PlansSection() {
  return (
    <>
      <h2 className="mb-5 md:mb-27 text-2xl font-bold md:text-[40px] text-white">
        Выбери подходящий для себя
        <span className="text-yellow"> план</span>
      </h2>

      <section className="mb-17 flex flex-col md:flex-row">
        <div className="w-full shrink-0 md:max-w-[380px]">
          <Image
            src="/images/img.png"
            alt="Ты - уже завтра"
            width={380}
            height={767}
            priority
            sizes="(max-width: 767px) 124px, 380px"
            className="mx-auto h-auto w-[124px] max-w-full md:mx-0 md:w-full"
            style={{ height: "auto" }}
          />
        </div>
        <div className="flex max-w-[748px] flex-col gap-5">
          <TariffsGrid />
          <div className="flex flex-col">
            <div className="mb-7.5 flex max-w-[499px] items-start gap-2 rounded-[20px] bg-dark-850 px-5 py-4.5">
              <div className="w-fit">
                <WarningIcon />
              </div>
              <p className="text-[12px] md:text-base text-white">
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
              </p>
            </div>
            <PurchaseBlock />
          </div>
        </div>
      </section>
    </>
  );
}

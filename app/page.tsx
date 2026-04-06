import Offer from "@/components/Offer";
import MoneyBackGuarantee from "@/components/MoneyBackGuarantee";
import PlansSection from "@/components/PlansSection";

export default function Home() {
  return (
    <>
      <Offer />
      <main className="mx-auto px-4 md:px-0 mb-[150px] w-full max-w-[1216px] font-montserrat">
        <PlansSection />
        <MoneyBackGuarantee />
      </main>
    </>
  );
}

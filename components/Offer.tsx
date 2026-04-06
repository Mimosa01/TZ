import Timer from "./Timer";

export default function Offer() {
  return (
    <div className="bg-green text-white p-2 w-full mb-12.5">
      <div className="flex flex-col gap-1 mx-auto w-fit items-center">
        <p className="text-lg md:text-2xl font-montserrat">Успейте открыть пробную неделю</p>
        <Timer />
      </div>
    </div>
  );
}
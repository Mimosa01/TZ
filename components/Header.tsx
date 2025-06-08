import Link from "next/link";

export default function Header () {
  return (
    <header className="bg-white shadow p-4">
    <div className="container mx-auto">
      <h1 className="text-xl font-bold text-gray-800">
        <Link href={'/'}>Тестовое задание</Link>
      </h1>
    </div>
  </header>
  )
}
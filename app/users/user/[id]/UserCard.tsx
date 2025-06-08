'use client'

import { User } from "@/lib/features/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function UserCard ({ user }: Props) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-6 mb-6">
          <Image
            width={100}
            height={100}
            src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 text-sm">{user.username}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Адрес</h3>
          <p className="text-gray-700">
            {user.address.street}, {user.address.suite},<br />
            {user.address.city}, {user.address.zipcode}
          </p>
          <p className="text-sm text-gray-500">
            Гео: {user.address.geo.lat}, {user.address.geo.lng}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Компания</h3>
          <p className="text-gray-700">{user.company.name}</p>
          <p className="text-sm text-gray-500 italic">{user.company.catchPhrase}</p>
          <p className="text-sm text-gray-500">{user.company.bs}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1">Контакты</h3>
          <p className="text-gray-700">Телефон: {user.phone}</p>
          <p className="text-gray-700">
            Веб-сайт: <a href={`https://${user.website}`} className="text-blue-600 underline">{user.website}</a>
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition"
        >
          Назад
        </button>
      </div>
    </div>
  )
}
'use client'

import Error from "@/components/Error";
import { setUsers, User } from "@/lib/features/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserList ({ initialUsers }: { initialUsers: User[] }) {

  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users)

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = useSelector((state: RootState) => state.users.usersPerPage);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    dispatch(setUsers(initialUsers))
  }, [initialUsers, dispatch])

  if (!users.length) return <Error message={"Пользователи не найдены"}/>

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-6">Список пользователей</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {paginatedUsers.map(user => (
          <Link
            href={`/users/user/${user.id}`}
            key={user.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <Image
                width={100}
                height={100}
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.id}`}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          Назад
        </button>

        <span className="px-4 py-2 text-sm flex items-center">
          Страница {currentPage} из {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          Вперёд
        </button>
      </div>
    </div>
  )
}
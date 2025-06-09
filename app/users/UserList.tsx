'use client'

import ErrorMessage from "@/components/Error"
import Loading from "@/components/Loading"
import { useDebounce } from "@/hooks/useDebounce"
import { clearUsers, fetchUsers } from "@/lib/features/userSlice"
import { AppDispatch, RootState } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function UsersPage () {
  const [ value, setValue ] = useState<string>('');
  const searchTerm = useDebounce<string>(value, 1000);
  
  const dispatch = useDispatch<AppDispatch>()
  const { users, usersPerPage, loading, error } = useSelector((state: RootState) => state.users)

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;

  const reload = () => {
    dispatch(fetchUsers());
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchUsers());

    return () => {
      dispatch(clearUsers())
    };
  }, [dispatch])

  if (loading === "pending") return ( <Loading /> );
  if (loading === "failed") return ( <ErrorMessage message={error || 'Ошибка'} onRetry={reload}/> );
  if (filteredUsers.length > 0) {
    return (
      <div className="container mx-auto p-4">
        <h3 className="text-xl font-bold mb-6">Список пользователей</h3>

        <input 
          type="text" 
          value={value} 
          placeholder="Введите имя" 
          onChange={(e) => setValue(e.target.value)}
          className="mb-6 p-2 border-2 border-blue-600 rounded-xl"
        />
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {filteredUsers.slice(startIndex, startIndex + usersPerPage).map(user => (
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
  
        {(filteredUsers.length > 3) &&
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
        }
      </div>
    )
  } else {
    return (
      <div className="container mx-auto p-4">
        <h3 className="text-xl text-grey-100 font-bold mb-6">Пользователей пока нет</h3>
      </div>
    )
  }
}
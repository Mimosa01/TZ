'use client'

import ErrorMessage from "@/components/Error";
import Loading from "@/components/Loading";
import { clearUsers, fetchUserById } from "@/lib/features/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image"
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserPage () {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, loading, error } = useSelector(( state: RootState ) => state.users);

  const reload = () => {
    dispatch(fetchUserById(String(id)));
  };

  useEffect(() => {
    dispatch(fetchUserById(String(id)));

    return () => {
      dispatch(clearUsers())
    };
  }, [dispatch]);

  if (loading === "pending") return ( <Loading /> );
  if (loading === "failed") return ( <ErrorMessage message={error || 'Ошибка'} onRetry={reload}/> );
  if (selectedUser) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-6 mb-6">
            <Image
              width={100}
              height={100}
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${selectedUser.id}`}
              alt={selectedUser.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
              <p className="text-gray-600">{selectedUser.email}</p>
              <p className="text-gray-500 text-sm">{selectedUser.username}</p>
            </div>
          </div>
  
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Адрес</h3>
            <p className="text-gray-700">
              {selectedUser.address.street}, {selectedUser.address.suite},<br />
              {selectedUser.address.city}, {selectedUser.address.zipcode}
            </p>
            <p className="text-sm text-gray-500">
              Гео: {selectedUser.address.geo.lat}, {selectedUser.address.geo.lng}
            </p>
          </div>
  
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Компания</h3>
            <p className="text-gray-700">{selectedUser.company.name}</p>
            <p className="text-sm text-gray-500 italic">{selectedUser.company.catchPhrase}</p>
            <p className="text-sm text-gray-500">{selectedUser.company.bs}</p>
          </div>
  
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Контакты</h3>
            <p className="text-gray-700">Телефон: {selectedUser.phone}</p>
            <p className="text-gray-700">
              Веб-сайт: <a href={`https://${selectedUser.website}`} className="text-blue-600 underline">{selectedUser.website}</a>
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
}
'use client'

import Link from "next/link"

export default function MainPage () {
  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold">Проект создан с целью демонстрации навыков.</h3>
      <span>
        Чтобы перейти на страницу пользователей перейдите по &nbsp;
      </span>
      <Link href={'/users'} className="text-blue-600 hover:underline font-medium">ссылке</Link>
    </div>
  )
}
import axiosInstance from "@/lib/axios"
import UserList from "./UserList";
import { notFound } from "next/navigation";

export default async function Page () {
  const response = await axiosInstance.get('/users');

  if (response.statusText === "error") notFound();

  return ( <UserList initialUsers={response.data} /> )
}
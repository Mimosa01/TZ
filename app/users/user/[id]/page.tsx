import axiosInstance from "@/lib/axios";
import { notFound } from "next/navigation";
import UserCard from "./UserCard";
import { PageProps } from "@/.next/types/app/layout";

export default async function Page ({ params }: PageProps) {
  const { id } = await params;
  const response = await axiosInstance.get(`/users/${id}`);

  if (response.statusText === "error") notFound();
  
  return ( <UserCard user={response.data}/> )
}
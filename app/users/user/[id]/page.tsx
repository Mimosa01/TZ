import axiosInstance from "@/lib/axios";
import { notFound } from "next/navigation";
import UserCard from "./UserCard";

interface Props {
  params: {
    id: number;
  };
}

export default async function Page ({ params }: Props) {
  const { id } = await params;
  const response = await axiosInstance.get(`/users/${id}`);

  if (response.statusText === "error") notFound();
  
  return ( <UserCard user={response.data}/> )
}
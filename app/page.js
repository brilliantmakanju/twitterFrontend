"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChartPie,
  FaEllipsisH,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import Tweets from "../components/Tweets";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className="grid grid-cols-1 gap-5 w-full  h-screen overflow-hidden overflow-y-scroll  justify-start items-start pt-20 ">
      <Tweets />
    </main>
  );
}

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
    <main className="grid grid-cols-1 gap-5 w-full  h-screen overflow-hidden overflow-y-scroll pb-12 md:pb-6 lg:pb-4 justify-start items-start ">
      <Tweets />
    </main>
  );
}

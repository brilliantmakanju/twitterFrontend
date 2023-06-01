"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CtaFooter = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session?.user && (
        <div className="fixed bottom-0 left-0 flex gap-6 justify-center items-center h-16 w-full px-5 bg-[#1DA1F2] ">
          <Link
            href={"auth/signin"}
            className="border-2 duration-300 transition-opacity ease-in-out hover:bg-[#E1E8ED] hover:bg-opacity-20 text-white font-[500] flex justify-center items-center border-white p-1 px-16 rounded-full"
          >
            Log in
          </Link>
          <Link
            href={"auth/register"}
            className="border-2 text-black font-[500] flex justify-center items-center duration-300 transition-opacity ease-in-out hover:bg-[#E1E8ED] bg-white p-1 px-[5.5rem] rounded-full"
          >
            Sign up
          </Link>
        </div>
      )}
    </>
  );
};

export default CtaFooter;

"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CtaFooter = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session?.user && (
        <div className="fixed bottom-0 left-0 flex gap-6 justify-center items-center h-16 w-full px-5 bg-[#fdfeff] ">
          <Link
            href={"auth/signin"}
            className="border-2  duration-300 transition-opacity ease-in-out hover:bg-[#E1E8ED] hover:bg-opacity-20 text-[#1DA1F2] font-[500] flex justify-center items-center border-[#E1E8ED] p-1 px-9 md:px-12 rounded-full"
          >
            Log in
          </Link>
          <Link
            href={"auth/register"}
            className="border-2 text-white font-[500] flex justify-center items-center duration-300 transition-opacity ease-in-out bg-[#1DA1F2] p-1 px-[3.5rem] md:px-[5.5rem] rounded-full"
          >
            Sign up
          </Link>
        </div>
      )}
    </>
  );
};

export default CtaFooter;

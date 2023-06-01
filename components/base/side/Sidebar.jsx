"use client";
import React from "react";
import SideIcon from "./SideIcon";
import {
  FaTwitter,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
  FaRegUserCircle,
} from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <nav className=" flex relative justify-start gap-7 pt-5 items-center flex-col text-white ">
      {session?.user.data.username ? (
        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="flex gap-2 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaTwitter color={"#1DA1F2"} size={29} />
            </Link>
            <span className="hidden lg:block text-transparent ">Search</span>
          </div>
          <div className="flex gap-3 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaSearch size={22.5} color="black" />
            </Link>
            <span className="hidden lg:block text-black ">Search</span>
          </div>
          <div className="absolute bottom-1  left-0 flex flex-col text-left justify-start items-center gap-1 w-full lg:gap-4 ">
            <div className="flex gap-3 items-center justify-start">
              <Link
                href={`profile/${session?.user.data.username}`}
                className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
              >
                <FaRegUserCircle size={29} color="black" />{" "}
              </Link>
              <span onClick={() => router.push(`profile/${session?.user.data.username}`)} className="hidden lg:block text-black cursor-pointer ">Profile</span>
            </div>
            <div className="flex gap-3 items-center justify-start">
              <Link
                href={"/"}
                className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
              >
                <FaSignOutAlt
                  size={22.5}
                  color="black"
                  onClick={signOut}
                  className={"cursor-pointer"}
                />
              </Link>
              <span
                className="hidden lg:block text-black cursor-pointer"
                onClick={signOut}
              >
                Log out
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-between items-center">
          <div className="flex gap-2 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaTwitter color={"#1DA1F2"} size={29} />
            </Link>
            <span className="hidden lg:block text-transparent ">Search</span>
          </div>
          <div className="flex gap-3 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaSearch size={22.5} color="black" />
            </Link>
            <span className="hidden lg:block text-black ">Search</span>
          </div>
          <div className="flex gap-3 items-center justify-start">
            <Link
              href={"auth/signin"}
              className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaSignInAlt size={22.5} color="black" />
            </Link>
            <span
              className="hidden lg:block text-black cursor-pointer"
              onClick={signIn}
            >
              Log in
            </span>
          </div>
        </div>
      )}
      {/* <SideIcon />
      <SideIcon />
      <SideIcon />       */}
    </nav>
  );
};

export default Sidebar;

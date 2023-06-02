"use client";
import React from "react";
import SideIcon from "./SideIcon";
import {
  FaCog,
  FaUser,
  FaSearch,
  FaTwitter,
  FaSignOut,
  FaSignInAlt,
  FaRegUserCircle,
  FaFeatherAlt,
} from "react-icons/fa";
import { BiLogOut, BiMessageDetail } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className=" flex relative justify-start gap-7 pt-5 items-center flex-col text-white ">
      {session?.user.data.username ? (
        <div className="flex flex-col gap-2 justify-between items-center lg:items-start">
          <div className="flex gap-2 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 rounded-full hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out  hover:bg-opacity-80 "
            >
              <FaTwitter color={"#1DA1F2"} size={29} />
            </Link>
          </div>
          <div className="flex w-full gap-3 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 lg:flex  lg:justify-between lg:items-center lg:w-[60%] rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaSearch size={27} color="black" />
              <h6 className="hidden lg:block text-black  ">Search</h6>
            </Link>
          </div>
          {/* <div className="absolute bottom-1  left-0 flex flex-col text-left justify-start items-center gap-1 w-full lg:gap-4 "> */}
          <div className="flex w-full gap-3 items-center justify-start">
            <Link
              href={`profile/${session?.user.data.username}`}
              className=" p-3 lg:flex  lg:justify-between lg:items-center lg:w-[60%] rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <FaUser size={29} color="black" />
              <h6
                onClick={() =>
                  router.push(`profile/${session?.user.data.username}`)
                }
                className="hidden lg:block text-black  "
              >
                Profile
              </h6>
            </Link>
          </div>

          <div className="flex w-full gap-3 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 lg:flex  lg:justify-between lg:items-center lg:w-[67%] rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <BiMessageDetail
                size={28}
                color="black"
                // onClick={signOut}
                className={"cursor-pointer"}
              />
              <h6 className="hidden lg:block text-black  ">Message</h6>
            </Link>
          </div>

          <div className="flex w-full gap-3 items-center justify-start">
            <Link
              href={"/"}
              className=" p-3 lg:flex  lg:justify-between lg:items-center lg:w-[60%] rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
            >
              <BiLogOut
                size={28}
                color="black"
                onClick={signOut}
                className={"cursor-pointer"}
              />
              <h6
                className="hidden lg:block text-black cursor-pointer"
                onClick={signOut}
              >
                Log out
              </h6>
            </Link>
          </div>

          <div className="gap-3 items-center w-full mt-[20px] justify-start lg:block hidden ">
            <Link
              href={"/"}
              className=" p-3 px-20  w-full rounded-full  bg-[#0095ff] duration-300 transition-colors ease-in-out font-bold "
            >
              Tweet
            </Link>
          </div>

          <div className="flex gap-3 items-center justify-center lg:hidden ">
            <Link
              href={"/"}
              className=" p-3 rounded-full flex justify-center items-center bg-[#0095ff] duration-300 transition-colors ease-in-out"
            >
              <FaFeatherAlt
                size={25}
                color="white"
                onClick={signOut}
                className={"cursor-pointer"}
              />
            </Link>
          </div>

          {/* <Link href="/" className="" >Tweet</Link> */}
        </div>
      ) : (
        // </div>
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

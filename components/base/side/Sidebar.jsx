"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import SideIcon from "./SideIcon";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { BiLogOut, BiMessageDetail } from "react-icons/bi";
import { signIn, signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  async function Logout() {
    const res = await fetch("http://127.0.0.1:8000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: session?.user.tokenRefresh,
      }),
    });

    if (res.status === 200) {
      signOut();
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, [isloading]);

  return (
    <>
      <nav className="hidden md:flex md:static relative justify-start gap-7 pt-5 items-center flex-col text-white ">
        {isloading ? (
          <div className="h-[30%] w-full flex justify-center items-center ">
            <MoonLoader size={40} color="#1DA1F2" />
          </div>
        ) : (
          <>
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
                      onClick={() => Logout()}
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
                  <span className="hidden lg:block text-transparent ">
                    Search
                  </span>
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
          </>
        )}
      </nav>
      <nav
        className={`${
          session?.user.data.username
            ? "flex fixed bottom-[-1px] z-[9] px-2 justify-center items-center py-3 left-0 w-full md:hidden bg-[#1DA1F2]"
            : "hidden"
        } `}
      >
        {isloading ? (
          <div className="h-[30%] w-full flex justify-center items-center ">
            <MoonLoader size={40} color="#1DA1F2" />
          </div>
        ) : (
          <>
            {session?.user.data.username ? (
              <div className="flex gap-2 justify-between w-full items-center ">
                <div className="flex w-full gap-3 items-center justify-start">
                  <Link
                    href={"/"}
                    className=" p-3 cursor-pointer rounded-full hover:bg-opacity-50 hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
                  >
                    <FaSearch size={27} color="white" />
                  </Link>
                </div>
                {/* <div className="absolute bottom-1  left-0 flex flex-col text-left justify-start items-center gap-1 w-full lg:gap-4 "> */}
                <div className="flex w-full gap-3 items-center justify-start">
                  <Link
                    href={`profile/${session?.user.data.username}`}
                    className=" p-3  rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
                  >
                    <FaUser size={29} color="white" />
                  </Link>
                </div>

                <div className="flex w-full gap-3 items-center justify-start">
                  <Link
                    href={"/"}
                    className=" p-3  rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
                  >
                    <BiMessageDetail
                      size={28}
                      color="white"
                      // onClick={signOut}
                      className={"cursor-pointer"}
                    />
                  </Link>
                </div>

                <div className="flex w-full gap-3 items-center justify-start">
                  <Link
                    href={"/"}
                    className=" p-3  rounded-full  hover:p-3 hover:bg-[#E1E8ED] duration-300 transition-colors ease-in-out"
                  >
                    <BiLogOut
                      size={28}
                      color="white"
                      onClick={() => Logout()}
                      className={"cursor-pointer"}
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </nav>
    </>
  );
};

export default Sidebar;

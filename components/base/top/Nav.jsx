"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaArrowLeft,
  FaEllipsisH,
  FaEllipsisV,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const NavMobile = ({ label, arrow, fixed, profile, follower }) => {
  const { data: session } = useSession();
  const route = useRouter();

  return (
    <>
      <nav className={`md:hidden flex items-center justify-between gap-5 border-[#E1E8ED] border-b-2 w-full py-3 px-5 ${
          fixed ? "sticky top-0 z-[9] backdrop-blur-lg left-0 w-full" : ""
        } `}>
        {session?.user.data.username ? (
          <>
            <div className="flex gap-2 items-center  justify-start">
              {arrow ? (
                <>
                  {/* <Link href={"/"} className="  "> */}
                  <FaArrowLeft
                    color={"#1DA1F2"}
                    size={25}
                    className="cursor-pointer"
                    onClick={() => route.back()}
                  />
                  {/* </Link> */}
                  {profile ? (
                    // <>
                    <div className="flex flex-col justify-start items-center ">
                      <h3
                        className={`font-bold font-serif text-[20px] flex flex-col justify-start items-start capitalize `}
                      >
                        {label}
                        <span className="text-[15px] text-[#808080de] ">
                          {follower} follower
                        </span>
                      </h3>
                    </div>
                  ) : (
                    // </>
                    <h3 className={`font-bold font-serif text-[20px] `}>
                      {label}
                    </h3>
                  )}
                </>
              ) : (
                <h3 className="font-bold font-serif text-[20px] ">{label}</h3>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center justify-start">
              <Link href={"/"} className="  ">
                <FaTwitter color={"#1DA1F2"} size={25} />
              </Link>
            </div>
            <div className="flex gap-3 items-center justify-start rounded-full bg-white h-[30px] pl-5 w-[70%] ">
              <Link
                href={"auth/signin"}
                className="w-full flex gap-3 items-center justify-start "
              >
                <FaSearch color={"#E1E8ED"} size={19} />
                <input
                  className=" outline-none border-none w-[80%] h-[30px] bg-transparent  "
                  disabled
                  placeholder={`Search Twitter`}
                />
              </Link>
            </div>
            <div>{/* <FaEllipsisH /> */}</div>
          </>
        )}
      </nav>
      <nav
        className={`hidden md:flex items-center justify-between gap-10  w-full py-4 border-[#E1E8ED] border-b-2 overflow-hidden px-5 ${
          fixed ? "sticky top-0 z-[9] backdrop-blur-lg left-0 w-full" : ""
        } `}
      >
        {session?.user.data.username ? (
          <>
            <div className="flex gap-2 items-center  justify-start">
              {arrow ? (
                <>
                {/* <Link href={"/"} className="  "> */}
                <FaArrowLeft
                  color={"#1DA1F2"}
                  size={25}
                  className="cursor-pointer"
                  onClick={() => route.back()}
                />
                {/* </Link> */}
                {profile ? (
                  // <>
                  <div className="flex flex-col justify-start items-center ">
                    <h3
                      className={`font-bold font-serif text-[20px] flex flex-col justify-start items-start capitalize `}
                    >
                      {label}
                      <span className="text-[15px] text-[#808080de] ">
                        {follower} follower
                      </span>
                    </h3>
                  </div>
                ) : (
                  // </>
                  <h3 className={`font-bold font-serif text-[20px] `}>
                    {label}
                  </h3>
                )}
              </>
              ) : (
                <h3 className="font-bold font-serif text-[20px] ">{label}</h3>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center  justify-start">
              {arrow ? (
                <>
                {/* <Link href={"/"} className="  "> */}
                <FaArrowLeft
                  color={"#1DA1F2"}
                  size={25}
                  className="cursor-pointer"
                  onClick={() => route.back()}
                />
                {/* </Link> */}
                {profile ? (
                  // <>
                  <div className="flex flex-col justify-start items-center ">
                    <h3
                      className={`font-bold font-serif text-[20px] flex flex-col justify-start items-start capitalize `}
                    >
                      {label}
                      <span className="text-[15px] text-[#808080de] ">
                        {follower} follower
                      </span>
                    </h3>
                  </div>
                ) : (
                  // </>
                  <h3 className={`font-bold font-serif text-[20px] `}>
                    {label}
                  </h3>
                )}
              </>
              ) : (
                <h3 className="font-bold font-serif text-[20px] ">{label}</h3>
              )}
            </div>

            <div>{/* <FaEllipsisH /> */}</div>
          </>
        )}
      </nav>
    </>
  );
};

export default NavMobile;

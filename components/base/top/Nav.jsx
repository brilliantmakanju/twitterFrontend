"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaEllipsisH, FaEllipsisV, FaSearch, FaTwitter } from "react-icons/fa";
const NavMobile = () => {
  const { data: session } = useSession();

  return (
    <nav className="md:hidden flex items-center justify-between gap-5 bg-[#E1E8ED] w-full py-3 px-5 ">
      {session?.user.data.username ? (
        <></>
      ) : (
        <>
          <div className="flex gap-2 items-center justify-start">
            <Link href={"/"} className="  ">
              <FaTwitter color={"#1DA1F2"} size={25} />
            </Link>
          </div>
          <div className="flex gap-3 items-center justify-start rounded-full bg-white h-[30px] pl-5 w-[70%] ">
            <Link href={"auth/signin"} className="w-full flex gap-3 items-center justify-start ">
              <FaSearch color={"#E1E8ED"} size={19} />
              <input
                className=" outline-none border-none w-[80%] h-[30px] bg-transparent  " disabled
                placeholder={`Search Twitter`}
              />
            </Link>
          </div>
          <div>
            {/* <FaEllipsisH /> */}
          </div>
        </>
      )}
    </nav>
  );
};

export default NavMobile;

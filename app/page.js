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

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <main className="flex flex-col gap-5 w-full h-screen overflow-hidden overflow-y-scroll  justify-start items-center pt-20 ">
      <div className="flex gap-2 justify-start items-start w-full pl-4 border-b-2 border-[#E1E8ED] ">
        <Link href={"dev"} className="cursor-pointer">
          <div className="h-[4.5rem] w-[4rem] rounded-full overflow-hidden  relative lg:h-[5rem] lg:w-[5rem] cursor-pointer ">
            <img
              src="https://pbs.twimg.com/media/FxZ8qWpaMAMvGGy?format=jpg&name=360x360"
              className="absolute top-0 rounded-full left-0 object-cover "
            />
          </div>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center pr-[30px] ">
            <Link href={"book"} className="cursor-pointer">
              <h3 className="font-[500]">
                Metro Boomin{" "}
                <span className=" text-[#657786] font-[300]">
                  @MetroBoomin . 5h{" "}
                </span>{" "}
              </h3>
            </Link>

            <FaEllipsisH color="#657786" size={14} />
          </div>
          <p className="text-[15px] w-full tracking-tighter pr-[7px] mb-3 ">
            21 Savage is confirmed for the spiderverse soundtrack available
            everywhere June 2nd!!
          </p>
          <div className=" w-[92%] h-[20rem] overflow-hidden rounded-md relative  ">
            <img
              src="https://pbs.twimg.com/media/FxZ8qWpaMAMvGGy?format=jpg&name=360x360"
              className="absolute top-0 rounded-[1.5rem] left-0 object-cover "
            />
          </div>
          <div className="flex text-[#657786]  justify-start pl-5 items-center text-[12.5px] gap-6 h-10 ">
            <div className="flex justify-start items-center gap-2">
              <FaRegComment size={20.5} />
              <span>715</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <FaRegHeart size={20.5} />
              <span>43.6K</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <FaChartPie size={20.5} />
              <span>1.2M</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

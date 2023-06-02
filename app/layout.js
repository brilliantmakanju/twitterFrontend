"use client";
import "./globals.css";
import Provider from "./Provider";
import Sidebar from "../components/base/side/Sidebar";
import CtaFooter from "../components/base/footer/Cta";
import { FaArrowLeft, FaCog } from "react-icons/fa";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

// export const metadata = {
//   title: "Explore / Twitter",
//   description: "Cloned Twitter , Developer name JolexDev",
// };

export default function RootLayout({ children }) {
  const [base, setBase] = useState(false);
  

  const router = usePathname();
  const route = useRouter();

  // if (router === "/") {
  //   setBase(true);
  // } else {
  //   setBase(false);
  // }

  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="h-screen  ">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl ">
              <div className="grid grid-cols-4 w-1/2 h-full lg:w-full ">
                <Sidebar />
                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 w-[88vw] lg:w-[42.5vw]  flex justify-start items-start flex-col relative ">
                  <div className="fixed z-30 bg-opacity-50 bg-white backdrop-blur-[20px] px-4 top-0 right-0 w-[87%] h-14 flex justify-between items-center lg:w-[64.9%] ">
                    <div className="flex justify-start items-center gap-10">
                      
                        {router === "/" ? (
                          <h2 className="font-[500] text-[20px] " >Explore</h2>
                        ) : (
                          <h4 className="font-[500] text-[20px] flex gap-5 items-center justify-start " >
                            <FaArrowLeft
                              onClick={() => route.back()}
                              className="cursor-pointer"
                            />
                             {/* {
                              router === `profile/${session?.user.username}`
                              ?(<h3>Profile</h3>):(<h3>Tweets</h3>)
                             } */}
                          </h4>
                        )}
                    </div>
                    <FaCog size={20} />
                  </div>
                  {children}
                </div>
                {/* <FollowBar /> */}

                <h2 className="hidden lg:block pt-18 text-[2em] text-red-800  ">
                  Follow
                </h2>
              </div>
              {/* <CtaFooter /> */}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}

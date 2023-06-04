"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import Provider from "./Provider";
import TimeAgo from "javascript-time-ago";
import FollowBar from "../components/FollowBar";
import NavMobile from "../components/base/top/Nav";
import en from "javascript-time-ago/locale/en.json";
import Sidebar from "../components/base/side/Sidebar";
import CtaFooter from "../components/base/footer/Cta";
import { FaTwitter } from "react-icons/fa";

TimeAgo.addDefaultLocale(en);
// export const metadata = {
//   title: "Explore / Twitter",
//   description: "Cloned Twitter , Developer name JolexDev",
// };

export default function RootLayout({ children }) {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isloading]);

  return (
    <html lang="en">
      <body>
        {isloading ? (
          <main className="h-screen w-full flex justify-center items-center ">
            <FaTwitter size={70} color={'#1DA1F2'} className="animate-bounce" />
          </main>
        ) : (
          <Provider>
            <div className="h-screen md:hidden ">
              <div className="container h-full mx-auto xl:px-30 max-w-6xl ">
                <div className="grid grid-cols-4 w-1/2 h-full lg:w-full ">
                  <Sidebar />
                  <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 w-[100vw] lg:w-[37.5vw]  flex justify-start items-start flex-col relative ">
                    <NavMobile />
                    {children}
                  </div>
                </div>
                <CtaFooter />
              </div>
            </div>

            <div className="h-screen hidden md:block">
              <div className="container h-full mx-auto xl:px-30 max-w-6xl ">
                <div className="grid grid-cols-4 h-full ">
                  <Sidebar />
                  <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800 pb-20 ">
                    {/* <NavMobile /> */}
                    {children}
                  </div>
                  <FollowBar />
                </div>
                <CtaFooter />
              </div>
            </div>
          </Provider>
        )}
      </body>
    </html>
  );
}

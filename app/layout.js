"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import Provider from "./Provider";
import FollowBar from "../components/FollowBar";
import NavMobile from "../components/base/top/Nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/base/side/Sidebar";
import CtaFooter from "../components/base/footer/Cta";
import { FaTwitter } from "react-icons/fa";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Head from "next/document";
TimeAgo.addDefaultLocale(en);

// export const metadata = {
//   title: "Explore / Twitter",
//   description: "Cloned Twitter , Developer name JolexDev",
// };

// export async function generateMetadata({params}){
//   return {
//     title: "Explore / Twitter",
//     description: "Cloned Twitter , Developved by Brilliant Makanju JolexDev"
//   }
// }
export default function RootLayout({ children }) {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isloading]);

  return (
    <html lang="en">
      {/* <Head>
        <title>Explore / Twitter</title>
      </Head> */}
      <body>
        {isloading ? (
          <main className="h-screen w-full flex justify-center items-center ">
            <FaTwitter size={70} color={"#1DA1F2"} className="animate-bounce" />
          </main>
        ) : (
          <Provider>
            <ToastContainer />
            <div className="h-screen md:hidden ">
              <div className="container h-full mx-auto xl:px-30 max-w-6xl ">
                <div className="grid grid-cols-3 w-1/2 h-full lg:w-full ">
                  <Sidebar />
                  <div className="col-span-2 border-x-[1px] border-[#E1E8ED] w-[100vw]   flex justify-start items-start flex-col relative ">
                    {children}
                  </div>
                </div>
                <CtaFooter />
              </div>
            </div>

            <div className="h-screen overflow-hidden hidden md:block">
              <div className="container h-full mx-auto xl:px-30 max-w-6xl ">
                <div className="grid grid-cols-4 h-full ">
                  <Sidebar />
                  <div className="col-span-3 lg:col-span-2 border-x-[1px] border-[#E1E8ED] pb-20 ">
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

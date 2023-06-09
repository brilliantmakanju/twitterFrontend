"use client";
import { getSession, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaChartPie,
  FaEllipsisH,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import NavMobile from "../components/base/top/Nav";
import Tweets from "../components/Tweets";

export default function Home() {
  const route = useRouter();
  const { data: session } = useSession();
  const myElement = useRef(null);
  const [leng, setLeng] = useState(0);
  const [post, setPost] = useState("");
  const [tags, setTags] = useState("");
  const [userInfo, setuserInfo] = useState();
  const [error, setErrors] = useState();
  const [position, setPosition] = useState(0);
  const [isloading, setIsLoading] = useState(true);

  const [fixed, setFixed] = useState(false);

  async function createTweet() {
    

    const res = await fetch(`http://127.0.0.1:8000/auth/createtweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Pwitter ${session?.user.tokenAccess}`,
      },
      body: JSON.stringify({
        post: post,
        tag: tags,
      }),
    });
    const data = await res.json();
    if (data.statusCode === "success") {
      toast.success("Tweet Created", {
        position: toast.POSITION.TOP_CENTER,
      });
      setPost("")
      window.location.reload(false)
    } else {
      toast.error("Tweet could'n be create, Try again ", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const FixedChange = () => {
    const al = myElement.current;
    setPosition(al.scrollTop);
    if (position >= 1) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  useEffect(() => {
    const userInfo = async () => {
      const sess = await getSession();

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/auth/profile/${sess?.user.data?.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (data?.detail) {
          setErrors(true);
        }

        setuserInfo(data);
      } catch (error) {
        console.error("Error");
      }
    };

    userInfo();
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", FixedChange);
  // }, []);

  // console.log(userInfo)

  return (
    <>
      <NextSeo>
        <title>Explore</title>
      </NextSeo>
      {isloading ? (
        <div className="h-screen w-full flex justify-center items-center ">
          <MoonLoader size={40} color="#1DA1F2" />
        </div>
      ) : (
        <main
          onScroll={() => FixedChange()}
          ref={myElement}
          className="block w-full overflow-x-hidden relative h-screen overflow-hidden overflow-y-scroll pb-12 md:pb-6 lg:pb-4 justify-start items-start "
        >
          <Head>
            <title>Explore / Twitter</title>
          </Head>
          <NavMobile label={"Home"} fixed={fixed} />
          {session?.user.tokenAccess && (
            <div className="px-10 lg:px-4 py-5 w-full  flex justify-start items-start gap-1 border-b-2 border-[#E1E8ED] ">
              <div className="relative h-[4em] w-[4em] overflow-hidden rounded-full">
                <Image
                  src={`${userInfo?.data?.image ? `https://res.cloudinary.com/animecastle/${userInfo.data?.image}` : "https://res.cloudinary.com/animecastle/image/upload/v1686129628/profileImage/wallpaperflare.com_wallpaper94_igzksf.jpg" }`}
                  fill
                  className="absolute top-0 left-0 object-cover bg-center rounded-full  "
                  alt={"Profile Pic"}
                />
              </div>
              
              <div className="flex flex-col justify-end items-end  gap-1 w-[78%] lg:w-[79%] pt-4  ">
                <textarea
                  onChange={(e) => {
                    setPost(e.target.value);
                    setLeng(e.target.value.split(" ").length);
                  }}
                  value={post}
                  className="w-[100%] resize-none h-[100px] scroll-none  outline-none border-none border-[grey] pb-[3em] backdrop-blur-xl bg-transparent break-words px-3 placeholder:font-normal placeholder:text-[#1DA1F2] text-[#1DA1F2] font-bold  flex items-start justify-start  "
                  placeholder="What's happening?"
                  maxLength={280}
                />
                <button
                  onClick={() => createTweet()}
                  className={`bg-[#1DA1F2] py-2 px-2 w-[30%] font-bold text-white rounded-full disabled:bg-opacity-60 disabled:cursor-not-allowed `}
                  disabled={post === "" ? true : false}
                >
                  Tweet
                </button>
              </div>
            </div>
          )}

          <Tweets />
        </main>
      )}
    </>
  );
}

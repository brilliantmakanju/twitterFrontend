"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import NavMobile from "../../../components/base/top/Nav";

const TweetCreate = () => {
  const route = useRouter();
  const myElement = useRef(null);
  const [leng, setLeng] = useState(0);
  const [post, setPost] = useState("");
  const [tags, setTags] = useState("");
  const { data: session } = useSession();
  const [position, setPosition] = useState(0);
  const [isloading, setIsLoading] = useState(true);

  const [fixed, setFixed] = useState(false);

  if (!session?.user.tokenAccess) {
    route.push("/");
  }

  async function createTweet() {
    const res = await fetch(`https://twitterapi-production-91d6.up.railway.app/auth/createtweet`, {
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
      route.push("/")
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
    setIsLoading(false);
  });

  return (
    <main
      onScroll={() => FixedChange()}
      ref={myElement}
      className="overflow-y-scroll w-full h-screen"
    >
      {isloading ? (
        <>
          <NavMobile arrow label={"Create Tweet"} fixed={fixed} />
          <div className="h-screen w-screen md:w-full flex justify-center items-center ">
            <MoonLoader size={40} color="#1DA1F2" />
          </div>
        </>
      ) : (
        <>
          <NavMobile arrow label={"Create Tweet"} fixed={fixed} />
          <div className="px-10 lg:px-4 py-5 w-full  flex justify-start items-start gap-4">
            <div className="relative h-[4em] w-[4em] overflow-hidden rounded-full">
              <Image
                src={`https://res.cloudinary.com/animecastle/${session?.user.profiledata.image}`}
                blurDataURL={`https://res.cloudinary.com/animecastle/${session?.user.profiledata.image}`}
                fill
                className="absolute top-0 left-0 object-fill rounded-full  "
                alt={"Profile Pic"}
              />
            </div>
            <div className="flex flex-col justify-end items-end  gap-3 w-[78%] lg:w-[79%]  ">
              <textarea
                onChange={(e) => {
                  setPost(e.target.value);
                  setLeng(e.target.value.split(" ").length);
                }}
                value={post}
                className="w-[100%] resize-none h-[240px] scroll-none  outline-none border-none border-[grey] pb-[3em] backdrop-blur-xl bg-transparent break-words px-3 placeholder:text-[#1DA1F2] text-[#1DA1F2] font-bold  flex items-start justify-start  "
                placeholder="Tweet"
                maxLength={280}
              />
              <button
                onClick={() => createTweet()}
                className={`bg-[#1DA1F2] py-2 px-2 w-[40%] font-bold text-white rounded-full disabled:bg-opacity-60 disabled:cursor-not-allowed `}
                disabled={post === "" ? true : false}
              >
                Tweet
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default TweetCreate;

"use client";

import {
  FaChartPie,
  FaCircle,
  FaEllipsisH,
  FaRegComment,
  FaRegHeart,
  FaRetweet,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

const Tweets = () => {
  const router = useRouter();
  const [liked, setLiked] = useState();
  const { data: session } = useSession();
  const [tweets, setTweet] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  function viewTweet(value) {
    router.push(`tweet/${value}`);
  }

  // const timeAgo = (date) => {
  //   const second = Math.floor((new Date() - date) / 1000);
  //   // console.log(date)
  //   let interval = Math.floor(second / 31536000);
  //   if (interval > 1) {
  //     return interval + " y";
  //   }

  //   interval = Math.floor(second / 2592000);
  //   if (interval > 1) {
  //     return interval + "M";
  //   }

  //   interval = Math.floor(second / 86400);
  //   if (interval > 1) {
  //     return interval + "d";
  //   }

  //   interval = Math.floor(second / 3600);
  //   if (interval > 1) {
  //     return interval + "h";
  //   }

  //   interval = Math.floor(second / 60);
  //   if (interval > 1) {
  //     return interval + "m";
  //   }

  //   if (second < 5) return "just now";

  //   return Math.floor(second) + "seconds ago";
  // };

  useEffect(() => {
    async function getTweet() {
      const res = await fetch("https://twitterapi-production-91d6.up.railway.app/auth/tweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTweet(data.tweets);
      setIsLoading(false);
    }

    getTweet();
  }, []);

 
  async function LikeTweet(tweetId) {
    if (!session) {
      router.push("auth/signin");
    } else {
      const res = await fetch(`https://twitterapi-production-91d6.up.railway.app/auth/like/${tweetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Pwitter ${session?.user.tokenAccess}`,
        },
      });
      const data = await res.json();
    }
  }

  return (
    <>
      {isloading ? (
        <div className="h-screen w-full flex justify-center items-center ">
          <MoonLoader size={40} color="#1DA1F2" />
        </div>
      ) : (
        <div>
          {tweets.map((value, key) => {
            return (
              <div
                key={key}
                className={`flex gap-2 justify-start items-start w-auto pr-auto border-b-2 border-[#E1E8ED] py-2 duration-300 transition ease-in-out hover:bg-[#e1e8edbd] hover:bg-opacity-25 ${
                  router === "/" ? "pl-7" : "px-5"
                } `}
              >
                <Link
                  href={`profile/${value.user}`}
                  className=" cursor-pointer"
                >
                  <div className="relative h-[4em] w-[4em] overflow-hidden rounded-full">
                    <Image
                      src={`https://res.cloudinary.com/animecastle/image/upload/v1686129626/${value.userimage}`}
                      // blurDataURL={`${value.userimage}`}
                      fill
                      className="absolute top-0 left-0 object-cover rounded-full  "
                      alt={"Profile Pic"}
                    />
                  </div>
                </Link>
                {/* {valu} */}
                <div className="flex flex-col gap-1 ml-2 w-full lg:pr-5 ">
                  <div className="flex justify-between w-full gap-3 items-start pr-[35px] ">
                    <Link
                      href={`profile/${value.user}`}
                      className="cursor-pointer  "
                    >
                      <h3 className="font-[500] w-[250px] break-words flex justify-start items-center ">
                        {value.userfname}{" "}{value.userlname}
                        <span className=" text-[#657786] font-[300] ml-[7px] flex justify-start items-center gap-2 ">
                          @{value.user} <FaCircle size={5} />{" "}
                          <ReactTimeAgo
                            date={value.create}
                            locale="en-US"
                            timeStyle={"twitter"}
                          />
                        </span>
                      </h3>
                    </Link>

                    {/* <FaEllipsisH color="#657786" size={14} /> */}
                  </div>
                  <p
                    className="text-[15px] w-full h-auto break-words lg:pr-[50px] md:pr-[100px] tracking-tighter pr-[101px] mb-3 cursor-pointer "
                    onClick={() => viewTweet(value.pk)}
                  >
                    {value.post}
                    <span className="text-[#008cff]">{value.tag}</span>
                  </p>
                  <div className="flex text-[#657786]  justify-start pl-5 items-center text-[12.5px] gap-6 h-10 ">
                    <div className="flex justify-start items-center gap-2">
                      <FaRegComment size={20.5} />
                      <span>{value.comments?.length}</span>
                    </div>
                    {/* <div className="flex justify-start items-center gap-2">
                      <FaRetweet size={20.5} />
                      <span>{value.retweet?.length}</span>
                    </div> */}
                    {session?.user.tokenAccess ? (
                      <div
                        className={`flex justify-start items-center gap-2 cursor-pointer ${
                          liked ? "text-[red]" : ""
                        } `}
                        onClick={() => LikeTweet(value.pk)}
                      >
                        <FaRegHeart size={20.5} className={``} />
                        <span>{value.likes?.length}</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => router.push("auth/signin")}
                        className={`flex justify-start items-center gap-2 cursor-pointer  `}
                      >
                        <FaRegHeart size={20.5} className={``} />
                        <span>{value.likes?.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tweets;

"use client";
import Link from "next/link";
import Image from "next/image";
import ReactTimeAgo from "react-time-ago";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  FaChartBar,
  FaChartPie,
  FaCircle,
  FaRegComment,
  FaRegHeart,
  FaRetweet,
  FaTrash,
} from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addLocale(en);

const ViewTweet = ({ tweetId }) => {
  const route = useRouter();
  // console.log(data)s
  const { data: session } = useSession();
  const [tweet, setTweet] = useState([]);
  const [commentss, setCommentss] = useState();
  const [comments, setComments] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  async function LikeTweet(tweetId) {
    if (!session) {
      route.push("auth/signin");
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

  useEffect(() => {
    async function getTweet() {
      const res = await fetch(
        `https://twitterapi-production-91d6.up.railway.app/auth/viewupdatedeletetweet/${tweetId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setTweet(data.tweet);
      setIsLoading(false);
    }

    async function getComments() {
      const res = await fetch(
        `https://twitterapi-production-91d6.up.railway.app/auth/comment/createview/${tweetId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setComments(data.comments);
      setIsLoading(false);
    }

    getTweet();
    getComments();
  }, []);

  async function createComment(tweetId) {
    const res = await fetch(
      `https://twitterapi-production-91d6.up.railway.app/auth/comment/createview/${tweetId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Pwitter ${session?.user.tokenAccess}`,
        },
        body: JSON.stringify({
          comment: commentss,
        }),
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      const res = await fetch(
        `https://twitterapi-production-91d6.up.railway.app/auth/comment/createview/${tweetId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const datas = await res.json();
      setCommentss("");
      setComments(datas.comments);
    }
  }

  async function deleteTweet(tweetId) {
    const res = await fetch(
      `https://twitterapi-production-91d6.up.railway.app/auth/viewupdatedeletetweet/${tweetId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Pwitter ${session?.user.tokenAccess}`,
        },
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      route.push("/");
    }
  }

  //   const commentCount = tweet?.comments.length

  return (
    <>
      {isloading ? (
        <div className="h-screen w-screen md:w-full flex justify-center items-center ">
          <MoonLoader size={40} color="#1DA1F2" />
        </div>
      ) : (
        <>
          <div
            key={tweet.pk}
            className={`flex gap-2 justify-start items-start w-auto pr-auto  border-b-2 border-[#E1E8ED] py-2 duration-300 transition ease-in-out hover:bg-[#e1e8edbd] hover:bg-opacity-25 px-5 `}
          >
            <Link href={`profile/${tweet.user}`} className=" cursor-pointer">
              <div className="relative h-[4em] w-[4em] overflow-hidden rounded-full">
                <Image
                  src={`https://twitterapi-production-91d6.up.railway.app/media/${tweet.userimage}`}
                  blurDataURL={`https://twitterapi-production-91d6.up.railway.app/media/${tweet.userimage}`}
                  fill
                  className="absolute top-0 left-0 object-cover bg-center rounded-full  "
                  alt={"Profile Pic"}
                />
              </div>
            </Link>
            <div className="flex flex-col gap-1 ml-2 w-full lg:pr-5 ">
              <div className="flex justify-between w-full gap-3 items-start pr-[35px] ">
                <Link
                  href={`profile/${tweet.user}`}
                  className="cursor-pointer  "
                >
                  <h3 className="font-[500] w-[250px] break-words flex justify-start items-center ">
                    {tweet.userfname} {" "} {tweet.userlname} 
                    <span className=" text-[#657786] font-[300] ml-[7px] flex justify-start items-center gap-2 ">
                      @{tweet.user} <FaCircle size={5} />
                      <ReactTimeAgo
                        date={tweet.create}
                        locale="en-US"
                        timeStyle={"twitter"}
                      />
                    </span>
                  </h3>
                </Link>

                {/* <FaEllipsisH color="#657786" size={14} /> */}
              </div>
              <p className="text-[15px] w-full tracking-tighter pr-[7px] mb-3 cursor-pointer ">
                {tweet.post} <span className="text-[#008cff]">{tweet.tag}</span>
              </p>
              <div className="flex text-[#657786]  justify-start items-center text-[12.5px] gap-3 lg:gap-10 h-10 ">
                <div className="flex justify-start items-center gap-2  ">
                  <FaRegComment className="text-[15px] lg:text-[20px]" />
                  <span>{tweet?.comments?.length}</span>
                </div>
                {/* <div className="flex justify-start items-center gap-2 cursor-pointer">
                  <FaRetweet className="duration-300 text-[15px] lg:text-[20px] transition ease-in-out hover:text-[#1DA1F2]" />
                  <span>{tweet.views}</span>
                </div> */}
                <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={() => LikeTweet(tweet.pk)} >
                  <FaRegHeart className="duration-300 text-[15px] lg:text-[20px] transition ease-in-out hover:text-[red]" />
                  <span>{tweet?.likes?.length}</span>
                </div>
                {session?.user.data.username === tweet.user ? (
                  <>
                    <div
                      className="flex cursor-pointer justify-start items-center gap-2"
                      onClick={() => deleteTweet(tweet.pk)}
                    >
                      <FaTrash className="text-[15px] lg:text-[20px]" />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {session?.user.tokenAccess && (
            <div className="px-4 py-5 w-full flex justify-start items-start gap-4">
              <div className="relative h-[4em] w-[4em] overflow-hidden rounded-full">
                <Image
                  src={`https://twitterapi-production-91d6.up.railway.app${session?.user.profiledata.image}`}
                  blurDataURL={`https://twitterapi-production-91d6.up.railway.app${session?.user.profiledata.image}`}
                  fill
                  className="absolute top-0 left-0 object-cover bg-center rounded-full  "
                  alt={"Profile Pic"}
                />
              </div>
              <div className="flex flex-col justify-end items-end  gap-3 w-[79%]  ">
                <textarea
                  onChange={(e) => {
                    setCommentss(e.target.value);
                  }}
                  value={commentss}
                  className="w-[100%] resize-none  outline-none border-none border-[grey] pb-[3em] backdrop-blur-xl bg-transparent break-words px-3 placeholder:text-[#1DA1F2] text-[#1DA1F2] font-bold  flex items-start justify-start  "
                  placeholder="Tweet"
                />
                <button
                  onClick={() => createComment(tweet.pk)}
                  className="bg-[#1DA1F2] py-2 px-2 w-[40%] font-bold text-white rounded-full "
                >
                  Tweet
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col pb-[3rem]  border-t-2  justify-start items-start w-full border-[#E1E8ED] ">
            {comments?.map((comment, key) => (
              <div
                key={key}
                className={`flex gap-2  py-3 justify-start items-start w-full  border-b-2 border-[#E1E8ED]  duration-300 transition ease-in-out hover:bg-[#e1e8edbd] hover:bg-opacity-25 px-5 `}
              >
                <Link
                  href={`profile/${comment.user}`}
                  className=" cursor-pointer"
                >
                  
                  <div className="relative h-[4em] w-[4em] overflow-hidden rounded-full">
                    <Image
                      src={`https://twitterapi-production-91d6.up.railway.app/media/${comment.userimage}`}
                      blurDataURL={`https://twitterapi-production-91d6.up.railway.app/media/${comment.userimage}`}
                      fill
                      className="absolute top-0 left-0 object-fill rounded-full  "
                      alt={"Profile Pic"}
                    />
                  </div>
                </Link>
                <div className="flex flex-col gap-1 ml-2 w-full lg:pr-5 ">
                  <div className="flex justify-between w-full gap-3 items-start pr-[35px] ">
                    <Link
                      href={`profile/${comment.user}`}
                      className="cursor-pointer  "
                    >
                      <h3 className="font-[500] w-[250px] break-words flex justify-start items-center ">
                        {comment.userfname}{" "}{comment.userlname}
                        <span className=" text-[#657786] font-[300] ml-[7px] flex justify-start items-center gap-2 ">
                          @{comment.user} <FaCircle size={5} />{" "}
                          <ReactTimeAgo
                          date={tweet.create}
                          locale="en-US"
                          timeStyle={"twitter"}
                        />
                        </span>
                      </h3>
                    </Link>

                    {/* <FaEllipsisH color="#657786" size={14} /> */}
                  </div>
                  <p className="text-[15px] w-full tracking-tighter pr-[7px] mb-3 cursor-pointer ">
                    {comment.comment}{" "}
                  </p>
                  <div className="flex text-[#657786]  justify-start pl-5 items-center text-[12.5px] gap-6 h-10 ">
                    <div className="flex justify-start items-center gap-2">
                      <FaRegHeart size={20.5} />
                      <span>{comment?.likes?.length} Likes</span>
                    </div>
                    {session?.user.data.username === comment.user ? (
                      <>
                        <div className="flex justify-start items-center gap-2">
                          <FaTrash size={17.5} />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ViewTweet;

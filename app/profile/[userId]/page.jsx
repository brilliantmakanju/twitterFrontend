"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserTweet from "../../../components/userTweet";
import { useParams } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import NavMobile from "../../../components/base/top/Nav";
import { MoonLoader } from "react-spinners";

const Admin = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const [dataU, setDataU] = useState();
  const [follow, setFollow] = useState(false);
  const [folw, setFolw] = useState();
  const [isloading, setIsLoading] = useState(true)
  const [followcount, setFollowCount] = useState(0);
  const [followercount, setFollowerCount] = useState(0);
  const [errors, setErrors] = useState(false);
  const uid = params.userId;

  async function followCounts() {
    const res = await fetch(`https://twitterapi-production-91d6.up.railway.app/auth/followcount/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Pwitter ${session?.user.tokenAccess} `,
      },
    });
    const data = await res.json();

    // console.log(data);
    setFollowCount(data.follower);
    setFollowerCount(data.follow);
  }

  async function followBtn() {
    const res = await fetch(`https://twitterapi-production-91d6.up.railway.app/auth/follow/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Pwitter ${session?.user.tokenAccess} `,
      },
    });
    const data = await res.json();
    followCounts();
    if (data.followed === "true") {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }

  const followers = dataU?.data?.followers;
  let userExist = followers?.find((user) => user != session?.user.data.pk);

  useEffect(() => {
    const fetchedData = async () => {
      const session = await getSession();
      if (session) {
        // console.log(session);
        async function followCounts() {
          const res = await fetch(
            `https://twitterapi-production-91d6.up.railway.app/auth/followcount/${uid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Pwitter ${session?.user.tokenAccess} `,
              },
            }
          );
          const data = await res.json();

          setFollowCount(data.follower);
          setFollowerCount(data.follow);
        }
        followCounts();
      } else {
        async function followCounts() {
          const res = await fetch(
            `https://twitterapi-production-91d6.up.railway.app/auth/followcount/${uid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Pwitter ${session?.user.tokenAccess} `,
              },
            }
          );
          const data = await res.json();
          setFollowCount(data.follower);
          setFollowerCount(data.follow);
        }
        followCounts();
      }
      
    };

    fetchedData();
    userInfo();
    setIsLoading(false)
  }, []);

  const userInfo = async () => {
    try {
      const res = await fetch(`https://twitterapi-production-91d6.up.railway.app/auth/profile/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data?.detail) {
        setErrors(true);
      }

      setDataU(data);
    } catch (error) {
      console.error("Error");
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen w-screen md:w-full flex justify-center items-center ">
        <MoonLoader size={40} color="#1DA1F2" />
      </div>
    );
  }

  return (
    <>
      {isloading ? (
        <div className="h-screen w-full flex justify-center items-center ">
          <MoonLoader size={40} color="#1DA1F2" />
        </div>
      ) : (
        <main
          className={` "block h-screen overflow-hidden overflow-y-scroll w-full "
      `}
        >
          <NavMobile arrow label={`${dataU?.data.userfname} ${dataU?.data.userlname} `} profile follower={followercount} />
          {errors ? (
            <div className="flex flex-col justify-center items-center ">
              <Link
                className="text-[20px] px-5 py-2 bg-blue-400 my-5 rounded-xl text-white "
                href={"/"}
              >
                Home
              </Link>
              <h3 className="text-[20px]">User Does not Exists</h3>
            </div>
          ) : (
            <>
              <div className="w-full  ">
                <div className="relative sm:h-[180px] h-[170px] w-[100%] md:h-[200px] lg:h-[200px]">
                  <Image
                    src={dataU?.data.bgimage}
                    blurDataURL={dataU?.data.image}
                    fill
                    className="absolute  object-cover "
                    alt={uid}
                  />
                </div>
                <div className="relative h-[6em] w-[6em] overflow-hidden rounded-full p-1 sm:mt-[-7%] mt-[-10.5%]  border-2 border-[#c9c5c5c0] ml-[20px]  lg:mb-[10px] lg:mt-[-12.5%] md:mt-[-7.5%] lg:ml-[25px] lg:h-[7em] lg:w-[7em] ">
                  <Image
                    src={dataU?.data.image}
                    blurDataURL={dataU?.data.image}
                    fill
                    className="absolute top-0 left-0 object-cover rounded-full  "
                    alt={"Profile Pic"}
                  />
                </div>
              </div>
              {session?.user.data.username === uid ? (
                <div className="flex justify-end pr-[15px] items-center gap-3 w-full ">
                  <button className=" sm:mt-[-4%] sm:ml-[78.5%] max-sm:mt-[-4.3%] mt-[-5%] ml-auto lg:ml-[80%] px-5 right-7 py-[0.4rem] font-bold rounded-full md:ml-[82.5%] md:mt-[-4.5%] lg:mt-[-7%] flex justify-end items-end bg-[#000000e5]  text-white">
                    Edit
                  </button>
                </div>
              ) : (
                <>
                  {status === "unauthenticated" ? (
                    <button
                      onClick={() => signIn()}
                      className=" sm:mt-[-4%] sm:ml-[82.5%] max-sm:mt-[-4.3%] mt-[-5%] ml-[75%] lg:ml-[80%] px-5 right-7 py-[0.4rem] font-bold rounded-full md:ml-[82.5%] md:mt-[-4.5%] lg:mt-[-7%] flex justify-end items-end bg-[#000000e5]  text-white"
                    >
                      Follow
                    </button>
                  ) : (
                    <>
                      {userExist === session?.user.data.pk ? (
                        <button
                          onClick={() => followBtn()}
                          className=" sm:mt-[-4%] sm:ml-[78.5%] capitalize max-sm:mt-[-4.3%] mt-[-5%] ml-auto lg:ml-[80%] px-5 right-7 py-[0.4rem] font-bold rounded-full md:ml-[82.5%] md:mt-[-4.5%] lg:mt-[-7%] flex justify-end items-end bg-[#000000e5]  text-white"
                        >
                          {follow ? <>UnFollow</> : <>Unfollow</>}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => followBtn()}
                            className=" sm:mt-[-4%] capitalize sm:ml-[78.5%] max-sm:mt-[-4.3%] mt-[-5%] ml-auto lg:ml-[80%] px-5 right-7 py-[0.4rem] font-bold rounded-full md:ml-[82.5%] md:mt-[-4.5%] lg:mt-[-7%] flex justify-end items-end bg-[#000000e5]  text-white"
                          >
                            {!follow ? <>Unfollow</> : <>Follow</>}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              <div className="h-auto  w-full  pl-7 flex flex-col mt-5 lg:mt-1 lg:pl-10 justify-start items-start gap-1 ">
                <h3 className="capitalize font-bold text-[20px] tracking-tighter ">
                  {dataU?.data.userfname}{" "}{dataU?.data.userlname}
                </h3>
                <span className="text-[gray] mt-[-10px] ">@{dataU?.data.user}</span>
                <div className="flex flex-col gap-1 mt-3 w-full tracking-wide text-[15.5px] leading-[1.2rem]  break-word font-serif font-light ">
                  {dataU?.data.bio}
                  <div className="flex justify-start items-center gap-5 mt-3 ">
                    <Link
                      href={"/"}
                      className="font-light text-[#808080de] duration-300 ease-in-out hover:underline "
                    >
                      {" "}
                      <span className="font-bold text-black ">
                        {followcount}
                      </span>{" "}
                      Following
                    </Link>
                    <Link
                      href={"/"}
                      className="font-light text-[#808080de] duration-300 ease-in-out hover:underline "
                    >
                      {" "}
                      <span className="font-bold text-black ">
                        {followercount}
                      </span>{" "}
                      Followers
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:pl-6 ">
                <UserTweet param={uid} />
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Admin;

"use client";
import {
  FaEdit,
  FaFeather,
  FaRegHeart,
  FaChartPie,
  FaEllipsisH,
  FaRegComment,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { getSession, signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Tweets from "../../../components/Tweets";

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [dataU, setDataU] = useState();
  const [follow, setFollow] = useState(false);
  const [followcount, setFollowCount] = useState(0);
  const [followercount, setFollowerCount] = useState(0);
  const [errors, setErrors] = useState(false);
  const [requestonce, setRequestOnce] = useState(null);
  const uid = params.userId;

  async function followCounts() {
    const res = await fetch(`http://127.0.0.1:8000/auth/followcount/${uid}`, {
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
    if (data.followed === "true") {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }

  async function followBtn() {
    const res = await fetch(`http://127.0.0.1:8000/auth/follow/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Pwitter ${session?.user.tokenAccess} `,
      },
    });
    const data = await res.json();
    followCounts();
  }

  const followers = dataU?.data?.followers;
  const userExist = followers?.find((user) => user === session?.user.data.pk);
  // console.log(userExist);

  useEffect(() => {
    const fetchedData = async () => {
      const session = await getSession();
      if (session) {
        // console.log(session);
        async function followCounts() {
          const res = await fetch(
            `http://127.0.0.1:8000/auth/followcount/${uid}`,
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
          if (data.followed === "true") {
            setFollow(true);
          } else {
            setFollow(false);
          }
        }
        followCounts();
      } else {
        async function followCounts() {
          const res = await fetch(
            `http://127.0.0.1:8000/auth/followcount/${uid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Pwitter ${session?.user.tokenAccess} `,
              },
            }
          );
          const data = await res.json();

          console.log(data);
          setFollowCount(data.follower);
          setFollowerCount(data.follow);
        }
        followCounts();
      }
    };

    fetchedData();
    userInfo();
  }, []);

  // followCounts();

  const userInfo = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/auth/profile/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data?.detail) {
        setErrors(true);
      }

      // followCounts();
      setDataU(data);
    } catch (error) {
      console.error("Error");
      // setError
    }
  };

  if (status === "loading") {
    return <h1 className="text-2xl pt-20 px-4">Loading</h1>;
  }

  return (
    <main
      className={`pt-[4rem]  "block h-screen overflow-hidden overflow-y-scroll w-full "
      `}
    >
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
            <div className="relative h-[160px] w-[100%] md:h-[200px] lg:h-[220px]">
              <Image
                src="/tweet.webp"
                fill
                className="absolute  object-cover "
                alt={uid}
              />
            </div>
            <div className="relative h-[5.5em] w-[5.5em] overflow-hidden rounded-full p-1 mt-[-10.5%]  border-2 border-[#c9c5c5c0] ml-[20px]  lg:mb-[10px] lg:mt-[-8.5%] md:mt-[-6.5%] lg:ml-[25px] lg:h-[7em] lg:w-[7em] ">
              <Image
                src="/tweet.webp"
                fill
                className="absolute top-0 left-0 object-fill rounded-full  "
                alt={"Profile Pic"}
              />
            </div>
          </div>
          {session?.user.data.username === uid ? (
            <div className="flex justify-end pr-[15px] items-center gap-3 w-full ">
              <button className="   mt-[-5%] p-2 px-5 font-bold rounded-full  flex justify-end items-end bg-[#000000ce]  text-white">
                Edit
              </button>
            </div>
          ) : (
            <>
              {status === "unauthenticated" ? (
                <button
                  onClick={() => signIn()}
                  className=" mt-[-5%] ml-[75%] lg:ml-[85%] px-5 right-7 py-[0.27rem] font-bold rounded-full  flex justify-end items-end bg-[#000000e5]  text-white"
                >
                  Follow
                </button>
              ) : (
                <>
                  {follow ? (
                    <button
                      onClick={() => followBtn()}
                      className=" mt-[-5%] ml-[72%] lg:ml-[85%] px-5 right-7 py-[0.27rem] font-bold rounded-full  flex justify-end items-end bg-[#000000e5]  text-white"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={followBtn}
                      className=" mt-[-5%] ml-[75%] lg:ml-[85%] px-5 right-7 py-[0.27rem] font-bold rounded-full  flex justify-end items-end bg-[#000000e5]  text-white"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </>
          )}

          <div className="h-auto  w-full  pl-7 flex flex-col mt-4 lg:mt-1 lg:pl-10 justify-start items-start gap-1 ">
            <h3 className="capitalize font-bold text-[22px] tracking-tighter ">
              {uid}
            </h3>
            <span className="text-[gray] mt-[-12px] ">@{uid}</span>
            <div className="flex flex-col gap-1 mt-3 w-full text-[16px] tracking-tighter font-normal font-serif ">
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
            <Tweets />
          </div>
        </>
      )}
    </main>
  );
};

export default Admin;

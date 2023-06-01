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

const Admin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [dataU, setDataU] = useState();
  const [follow, setFollow] = useState(false);
  const [followcount, setFollowCount] = useState(0);
  const [followercount, setFollowerCount] = useState(0);
  const [error, setError] = useState(false);
  const [requestonce, setRequestOnce] = useState(null);
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
    if(data.followed === 'true'){
      setFollow(true)
    }else{
      setFollow(false)
    }
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
          if(data.followed === 'true'){
            setFollow(true)
          }else{
            setFollow(false)
          }
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

          console.log(data);
          setFollowCount(data.follower);
          setFollowerCount(data.follow);
        }
        followCounts();
      }
    };

    fetchedData();
    if (!requestonce) {
      userInfo();
    }
  }, []);

  // followCounts();

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
        setError(true);
      }

      // followCounts();
      setDataU(data);
    } catch (error) {
      console.error("Error");
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
      {error ? (
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
            {/* {console.log(session?.user.tokens)} */}
            <div>
              <img
                src="https://pbs.twimg.com/profile_banners/330262748/1635957145/600x200"
                className="h-[125px] w-[100%] lg:h-[150px] object-cover "
                alt={uid}
              />
            </div>
            <div>
              <img
                src="https://pbs.twimg.com/media/FxZ8qWpaMAMvGGy?format=jpg&name=360x360"
                className="h-[100px] p-1 mt-[-15.5%] border-4 border-blue-600 ml-[15px] w-auto rounded-full lg:mb-[10px] lg:mt-[-6.5%] md:mt-[-5.5%] z-[999] lg:ml-[20px] "
                alt={uid}
              />
            </div>
          </div>
          {session?.user.data.username === uid ? (
            <div className="flex justify-end pr-[15px] items-center gap-3 w-full ">
              <button className="  mt-[-5%] p-2 rounded-full  flex justify-end items-end bg-[#000000ce]  text-white">
                <FaFeather size={22.5} />
              </button>
              <button className="   mt-[-5%] p-2 rounded-full  flex justify-end items-end bg-[#000000ce]  text-white">
                <FaEdit size={22.5} />
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

          <div className="h-auto  w-full  pl-7 flex flex-col justify-start items-start gap-1 ">
            <h3 className="capitalize font-bold text-[25px] tracking-tighter ">
              {uid}
            </h3>
            <span className="text-[gray] mt-[-12px] ">@{uid}</span>
            <div className="flex flex-col gap-1 mt-3 w-full text-[16px] tracking-tighter font-normal font-serif ">
              #1 Source For Hip-Hop/Viral News | Follow Us | Email For
              Business/Promo: TheDailyLoud@gmail.com | Follow us on Instagram
              here: http://instagram.com/daily_loud
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
          <div className="mt-6">
            <div className="flex gap-2 justify-start items-start w-full pl-4 border-b-2 border-[#E1E8ED] ">
              <Link href={uid} className="cursor-pointer">
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
                  21 Savage is confirmed for the spiderverse soundtrack
                  available everywhere June 2nd!!
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
            <div className="flex gap-2 justify-start items-start w-full pl-4 border-b-2 border-[#E1E8ED] ">
              <Link href={uid} className="cursor-pointer">
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
                  21 Savage is confirmed for the spiderverse soundtrack
                  available everywhere June 2nd!!
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
            <div className="flex gap-2 justify-start items-start w-full pl-4 border-b-2 border-[#E1E8ED] ">
              <Link href={uid} className="cursor-pointer">
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
                  21 Savage is confirmed for the spiderverse soundtrack
                  available everywhere June 2nd!!
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
            <div className="flex gap-2 justify-start items-start w-full pl-4 border-b-2 border-[#E1E8ED] ">
              <Link href={uid} className="cursor-pointer">
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
                  21 Savage is confirmed for the spiderverse soundtrack
                  available everywhere June 2nd!!
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
          </div>
        </>
      )}
    </main>
  );
};

export default Admin;

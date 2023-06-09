"use client";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FollowBar = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState();
  const [isloading, setIsLoading] = useState(true);

  function viewProfile(user){
    router.push(`profile/${user}`)
  }

  async function getUsers() {
    const sessions = await getSession();
    const res = await fetch("https://twitterapi-production-91d6.up.railway.app/auth/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Pwitter ${sessions?.user.tokenAccess}`,
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setUsers(data.data);
    }
  }

  useEffect(() => {
    setIsLoading(false);
    getUsers();
  }, []);

  return (
    <div className="px-5 py-6 w-full lg:hidden block">
      {isloading ? (
        <div className="h-screen w-screen md:w-full flex justify-center items-center ">
          <MoonLoader size={40} color="#1DA1F2" />
        </div>
      ) : (
        <>
          {session?.user.data.username ? (
            <>
              {" "}
              <div className="bg-neutral-800 w-full rounded-xl p-4  ">
                <h2 className="text-white text-xl font-semibold">
                  Who to follow
                </h2>
                <div className="flex flex-col justify-start items-start gap-9 mt-4 ">
                  {/* TODO USER LIST */}
                  {users.map((user, key) => (
                    <div
                      key={key}
                      className="flex flex-row gap-4 justify-start items-start cursor-pointer"
                      onClick={() => viewProfile(user.user)}
                    >
                      {/* <Avatar userId={user.id} /> */}
                      <div
                        className={` border-2 border-black h-12 w-12
                        } rounded-full hover:opacity-90 transition cursor-pointer relative `}
                      >
                        <Image
                          fill
                          style={{
                            borderRadius: "100%",
                          }}
                          className="absolute top-0 left-0 object-cover"
                          alt="Avatar"
                          src={`https://res.cloudinary.com/animecastle/${user.image}`}
                          blurDataURL={`https://res.cloudinary.com/animecastle/image/upload/v1686129626/${user.image}`}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white font-semibold text-sm">
                          {user.userfname}{" "}{user.userlname}
                        </p>
                        <p className="text-neutral-400 text-sm">@{user.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>{" "}
            </>
          ) : (
            <div className="flex flex-col gap-1 w-[150%] py-3 px-5 border-[1px] border-[#AAB8C2] rounded-lg ">
              <h3 className="font-bold text-[20px]">New to Twitter?</h3>
              <span className="text-[#657786] text-[12.5px] ">
                Sign up now to get your own personalized timeline!
              </span>

              <Link
                href="auth/register"
                className="flex justify-center items-center py-2 w-full font-bold bg-[#1DA1F2] rounded-full my-2 text-[white] "
              >
                Create account
              </Link>

              <span className="text-[#657786] text-[12.5px] ">
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FollowBar;

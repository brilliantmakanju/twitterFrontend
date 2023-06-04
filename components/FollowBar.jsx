'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FollowBar = () => {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    
    async function getUsers() {
      const res = await fetch("http://127.0.0.1:8000/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Pwitter ${session?.user.tokenAccess}`,
        }
      });
      const data = await res.json();
      if (res.status === 200) {
        setUsers(data);
      }
    }

  useEffect(() => {
    getUsers
  }, []);

  return (
    <div className="px-6 py-4 hidden lg:block">
      {session?.user.data.username ? (
        <>
          {" "}
          <div className="bg-neutral-800 rounded-xl p-4  ">
            <h2 className="text-white text-xl font-semibold">Who to follow</h2>
            <div className="flex flex-col gap-6 mt-4 ">
              {/* TODO USER LIST */}
              {users.map((user) => (
                <div key={user.id} className="flex flex-row gap-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="text-white font-semibold text-sm">
                      {user.name}
                    </p>
                    <p className="text-neutral-400 text-sm">@{user.username}</p>
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
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </span>
        </div>
      )}
    </div>
  );
};

export default FollowBar;

"use client";
import { signIn, getProviders, getSession, useSession } from "next-auth/react";
import React, { useRef, useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import NavMobile from "../../../components/base/top/Nav";

const Login = () => {
  const email = useRef("");
  const router = useRouter();
  const password = useRef("");
  const [error, setError] = useState();
  const [errorR, setErrorR] = useState(false)

  const { data: session } = useSession();

  if (session?.user.username) {
    router.push("/");
  }
  const login = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });
    if (result?.error) {
      setError(result.error);
      setErrorR(true)
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <NavMobile arrow label={"Log in"} />
      <main className="flex flex-col justify-start items-start px-5 pt-[8rem] relative w-screen md:w-full lg:w-full ">
        <h3 className="text-[43px] leading-[3rem] font-mono font-bold md:w-[80%] md:leading-[3.5rem] ">
          Login to your Account
        </h3>
        <form
          onSubmit={login}
          className="flex w-full pr-3 md:pr-5 pl-3 flex-col justify-start items-center "
        >
          {error ? (
            <h3 className="pl-3 flex justify-start items-center w-full py-3 capitalize font-bold text-[#e21212] ">
              {error}
            </h3>
          ) : (
            <></>
          )}
          <div className="relative w-full">
            <input
              className="w-full px-5 h-[3rem] pl-10 rounded-md mt-1 bg-[#F5F8FA]  outline-none border-none "
              type={"email"}
              onChange={(e) => (email.current = e.target.value)}
              placeholder="Email"
              required
            />
            {errorR ? (
              <FaEnvelope className="absolute top-[1.3rem] left-[14px] text-[#AAB8C2]" />
            ) : (
              <FaEnvelope className="absolute top-[1.3rem] left-[14px] text-[#AAB8C2]" />
            )}
          </div>
          <div className="relative w-full">
            <input
              className="w-full px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none  "
              type={"password"}
              onChange={(e) => (password.current = e.target.value)}
              placeholder="Password"
              minLength="8"
              maxLength="64"
              required
            />
            <FaLock className="absolute top-[3.5rem] left-[14px] text-[#AAB8C2]" />
          </div>
          <button
            className="w-[80%] text-[white] font-bold transition duration-300 ease-in-out hover:bg-opacity-90  rounded-full bg-[#1DA1F2]  mt-10 h-[3rem] "
            type="submit"
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;

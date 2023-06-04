"use client";
import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Register = () => {
  const email = useRef("");
  const router = useRouter();
  const username = useRef("");
  const password = useRef("");
  const [error, setError] = useState();
  const [emailerror, setEmailError] = useState();

  const { data: session } = useSession();

  if (session?.user.username) {
    router.push("/");
  }

  const register = async (e) => {
    e.preventDefault();
    let res = await fetch(
      "https://twitterapi-production-91d6.up.railway.app/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.current,
          email: email.current,
          password: password.current,
        }),
      }
    );
    let data = await res.json();
    if (res.status === 201) {
      router.push("auth/signin");
    } else {
      if (data?.username) {
        setError(data?.username);
      }
      if (data?.email) {
        setEmailError(data?.email);
      }
    }
  };

  return (
    <>
      <NextSeo title="Explore" description="Welcome " />
      <main className="flex flex-col justify-start items-start px-5 pt-[8rem] ">
        <h3 className="text-[43px] leading-[3rem] font-mono font-bold md:w-[80%] md:leading-[3.5rem] ">
          Create your Account
        </h3>
        <form
          onSubmit={register}
          className="flex w-full pr-3 md:pr-5 pl-3 flex-col justify-start items-center "
        >
          <div className="relative w-full">
            <input
              className="w-full px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none"
              type={"text"}
              onChange={(e) => (username.current = e.target.value)}
              placeholder="Username"
              required
            />
            <FaUser className="absolute top-[3.5rem] left-[14px] text-[#AAB8C2]" />
            {error ? <h3 className="pl-3 flex justify-start items-start pt-3 ">{error}</h3> : <></>}
          </div>
          <div className="relative w-full">
            <input
              className="w-full px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none "
              type={"email"}
              onChange={(e) => (email.current = e.target.value)}
              placeholder="Email"
              required
            />
            <FaEnvelope className="absolute top-[3.5rem] left-[14px] text-[#AAB8C2]" />
            {emailerror ? <h3 className="pl-3 pt-3 ">{emailerror}</h3> : <></>}
          </div>
          <div className="relative w-full">
            <input
              className="w-full px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none "
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
            className="w-[80%] text-[white] font-bold transition duration-300 ease-in-out hover:bg-opacity-60 hover:text-[#657786] rounded-full bg-[#1DA1F2]  mt-10 h-[3rem] "
            type="submit"
          >
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default Register;

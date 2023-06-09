"use client";
import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import NavMobile from "../../../components/base/top/Nav";
import { toast } from "react-toastify";

const Register = () => {
  const email = useRef("");
  const router = useRouter();
  const username = useRef("");
  const password = useRef("");
  const lastname = useRef("");
  const firstname = useRef("");
  const [error, setError] = useState();
  const [emailerror, setEmailError] = useState();

  const { data: session } = useSession();

  if (session?.user.username) {
    router.push("/");
  }

  const register = async (e) => {
    e.preventDefault();
    let res = await fetch("https://twitterapi-production-91d6.up.railway.app/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: firstname.current,
        lname: lastname.current,
        username: username.current,
        email: email.current,
        password: password.current,
      }),
    });
    let data = await res.json();
    if (res.status === 201) {
      toast.success("Account Created, Login now", {
        position: toast.POSITION.TOP_CENTER
      })
      router.push("auth/signin");
    } else {
      if (data?.username) {
        toast.error(`${data?.username}`, {
          position: toast.POSITION.TOP_CENTER
        })
        setError(data?.username);
      }
      if (data?.email) {
        toast.error(`${data?.email}`, {
          position: toast.POSITION.TOP_CENTER
        })
        setEmailError(data?.email);
      }
    }
  };

  return (
    <>
      <NavMobile arrow label={"Create your Account"} />
      <NextSeo title="Explore" description="Welcome " />
      <main className="flex flex-col justify-start items-start px-5 pt-[5rem] ">
        <h3 className="text-[43px] leading-[3rem] font-mono font-bold md:w-[80%] md:leading-[3.5rem] ">
          Create your Account
        </h3>
        <form
          onSubmit={register}
          className="flex w-full pr-3 md:pr-5 pl-3 flex-col justify-start items-center "
        >
          <div className="relative w-full">
            <input
              className="w-full capitalize px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none"
              type={"text"}
              onChange={(e) => (firstname.current = e.target.value)}
              placeholder="Firstname"
              required
            />
            <FaUser className="absolute top-[3.5rem] left-[14px] text-[#AAB8C2]" />
          </div>
          <div className="relative w-full">
            <input
              className="w-full capitalize px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none"
              type={"text"}
              onChange={(e) => (lastname.current = e.target.value)}
              placeholder="Lastname"
              required
            />
            <FaUser className="absolute top-[3.5rem] left-[14px] text-[#AAB8C2]" />
          </div>
          <div className="relative w-full">
            <input
              className="w-full lowercase px-5 h-[3rem] pl-10 rounded-md mt-10 bg-[#F5F8FA]  outline-none border-none"
              type={"text"}
              onChange={(e) => (username.current = e.target.value)}
              placeholder="Username"
              required
            />
            <FaUser className="absolute top-[3.5rem] left-[14px] text-[#AAB8C2]" />
            {error ? (
              <h3 className="pl-3 flex capitalize justify-start items-center w-full py-3 font-bold text-[#e21212] ">
                {error}
              </h3>
            ) : (
              <></>
            )}
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
            {emailerror ? (
              <h3 className="pl-3 capitalize flex justify-start items-center w-full py-3 font-bold text-[#e21212] ">
                {emailerror}
              </h3>
            ) : (
              <></>
            )}
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
            className="w-[80%] text-[white] font-bold transition duration-300 ease-in-out hover:bg-opacity-90  rounded-full bg-[#1DA1F2]  mt-10 h-[3rem] "
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

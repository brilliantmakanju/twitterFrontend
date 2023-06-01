"use client";
import { signIn, getProviders, getSession, useSession } from "next-auth/react";
import React, { useRef, useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/navigation";

const Login = () => {
  const email = useRef("");
  const router = useRouter();
  const password = useRef("");
  const [error, setError] = useState();

  const { data: session } = useSession();

  if(session?.user.username){
    router.push("/")
  }

  // useEffect(() => {
  //   if (session?.user.username) {
  //     router.push("/");
  //     // checkUser()
  //   }
  // }, []);

  // if (session?.user.detail) {
  //   console.log("Trying to login");
  // }
  const login = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      username: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });
    if(result?.error){
      setError(result.error)
    } else {
      router.push("/")
    }
  };

  return (
    <form
      onSubmit={login}
      className="flex px-10  flex-col justify-center items-center py-10 pt-20  "
    >
      {error}
      <input
        className="w-full px-5 h-10 mt-10 bg-black text-white "
        type={"email"}
        onChange={(e) => (email.current = e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="w-full px-5 h-10 mt-10 bg-black text-white "
        type={"password"}
        onChange={(e) => (password.current = e.target.value)}
        placeholder="Password"
        minLength="8"
        maxLength="64"
        required
      />
      <button
        className="w-[50%]  bg-black text-white mt-10 h-10 "
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;

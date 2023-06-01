"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });

//   if(session){
//     return {
//       redirect: {
//         destination: "/"
//       }
//     }
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const { data: session } = useSession();

//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//       },
//     };
//   }

//   // Pass data to the page via props
//   return { props: { session } };
// }

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
    let res = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current,
        email: email.current,
        password: password.current,
      }),
    });
    let data = await res.json();
    if (res.status === 201) {
      const result = await signIn("credentials", {
        username: email.current,
        password: password.current,
        redirect: false,
        callbackUrl: "/",
      });
      // router.push("auth/signin");
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
      <form
        onSubmit={register}
        className="flex  flex-col justify-center items-start py-10 px-10 "
      >
        <input
          className="w-full px-5 h-10 mt-10 bg-black text-white "
          type={"text"}
          onChange={(e) => (username.current = e.target.value)}
          placeholder="Username"
          required
        />
        {error ? <h3 className="pl-3 pt-3 ">{error}</h3> : <></>}
        <input
          className="w-full px-5 h-10 mt-10 bg-black text-white "
          type={"email"}
          onChange={(e) => (email.current = e.target.value)}
          placeholder="Email"
          required
        />
        {emailerror ? <h3 className="pl-3 pt-3 ">{emailerror}</h3> : <></>}
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
          className="w-[50%] mx-auto bg-black text-white mt-10 h-10 "
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;

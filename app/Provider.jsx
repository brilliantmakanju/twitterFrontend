"use client"
// import { ReactNode } from "react";
import { SessionProvider } from "next-auth/client";

// interface Props {
//   children: ReactNode;
// }

function Provider({ children }) {
  return <SessionProvider  >{children}</SessionProvider>;
}

export default Provider

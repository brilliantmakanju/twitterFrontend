"use client"
// import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// interface Props {
//   children: ReactNode;
// }

function Provider({ children }) {
  return <SessionProvider  >{children}</SessionProvider>;
}

export default Provider

"use client"
// import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// interface Props {
//   children: ReactNode;
// }

function Provider({ children, session }) {
  return <SessionProvider session={session}  >{children}</SessionProvider>;
}

export default Provider

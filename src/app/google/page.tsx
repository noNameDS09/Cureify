'use client'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  // const { data: session } = useSession();

  return (
    <div>
      {/* {!session ? ( */}
        <div>
          {/* <h1>Sign in with Google</h1> */}
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
      {/* ) : ( */}
        <div>
          {/* <h1>Welcome, {session.user.name}!</h1> */}
          {/* <img src={session.user.image} alt="User Image" /> */}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      {/* )} */}
    </div>
  );
}

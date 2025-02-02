import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "database",
    },
    callbacks: {
        async jwt({token, account}){
            if(account){
                token.accessToken = account.access_token
            }
            return token;
        },
        async session({ session, user }) {
          session.user.id = user.id;
          return session;
        },
      },
    // database:
});

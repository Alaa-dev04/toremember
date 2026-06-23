import { NextAuthOptions } from "next-auth"; //give me the next auth type
import CredentialsProvider from "next-auth/providers/credentials"; // a normal login credintial

import { fetchClient } from "./clients"; //api client send req to the backend
import { loginSchema } from "@/zod/auth/login.schema"; //login schema from zod
//that is next auth config this is all the main rules of the login sustem
export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { password, username } = loginSchema.parse(credentials);
        const { data } = await fetchClient.POST("/auth/login", {
          body: {
            username: username,
            password: password,
          },
        });
        if (!data?.data?.user) return null;
        type role="it"|"cto"|"account";
        const userMaper: Record<"IT" | "CTO" | "Accountant",role> = {
          IT: "it",
          CTO: "cto",
          Accountant: "account",
        };

        return {
          accessToken: data.data.token,
          role: userMaper[data.data.user.role],
          username: data.data.user.username,
          email: data.data.user.email,
          id: data.data.user.id.toString(), //nextauth love string
        };
      },
    }),
  ],
  // This callback is called whenever a JSON Web Token is created
  //  (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
  //  The returned value will be encrypted, and it is stored in a cookie.
  //here what happed when sucessfully logind
  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { ...user }; //coby every info of the user to the token
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) session.user = token; //copy the token inside the user session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

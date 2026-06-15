import { jwt } from "next-auth/jwt";
import NextAuth ,{DefaultSession} from "next-auth";
import { paths } from "@/lib/api/generated";
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken: string;
    username: string;
    role: UserTypes;
  }
}
declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      username: string;
      role: UserTypes;
    } & DefaultSession['user'];
  }

  interface User {
    email: string;
    accessToken: string;
    username: string;
    role: UserTypes;
  }
}


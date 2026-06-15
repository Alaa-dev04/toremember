import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { fetchClient } from './clients';
import { loginSchema } from '@/zod/auth/login.schema';

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const { password, username } = loginSchema.parse(credentials);
        const { data } = await fetchClient.POST('/auth/login', {
          body: {
            username: username,
            password: password,
          },
        });
        if (!data?.data?.user) return null;

        const userMaper: Record<'IT' | 'CTO' | 'Accountant', string> = {
          IT: 'it',
          CTO: 'cto',
          Accountant: 'account',
        };

        return {
          accessToken: data.data.token,
          role: userMaper[data.data.user.role],
          username: data.data.user.username,
          email: data.data.user.email,
          id: data.data.user.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { ...user };
      return token;
    },
    async session({ session, token }) {
      if (token) session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

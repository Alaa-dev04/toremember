import { AuthOptions } from '@/lib/api/auth.lib';
import NextAuth from 'next-auth';
const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
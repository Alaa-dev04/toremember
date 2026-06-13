import { Middleware } from 'openapi-fetch';
import { paths } from '../../types/index.type';
import { getSession, signOut } from 'next-auth/react';
import createClient from 'openapi-fetch';
import { getServerSession } from 'next-auth';
import { AuthOptions } from './auth.lib';

const myMiddleware: Middleware = {
  async onRequest({ request }) {
    const session = await getSession();
    console.log(session?.user);
    if (session) {
      request.headers.set(
        'Authorization',
        `Bearer ${session?.user?.accessToken}`
      );
    }

    request.headers.set('Accept', 'application/json');
    return request;
  },
  async onResponse({ response }) {
    if (response.status == 401) {
      await signOut({ callbackUrl: '/login' });
    }
    return response;
  },
  async onError({ error }) {
    // wrap errors thrown by fetch
    return new Error('Oops, fetch failed', { cause: error });
  },
};
export const fetchClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});
const serverMiddleware: Middleware = {
  async onRequest({ request }) {
    const session = await getServerSession(AuthOptions);

    if (session) {
      request.headers.set(
        'Authorization',
        `Bearer ${session?.user?.accessToken}`
      );
    }
    request.headers.set('Accept', 'application/json');
    return request;
  },

  async onError({ error }) {
    // wrap errors thrown by fetch
    return new Error('Oops, fetch failed', { cause: error });
  },
};
export const serverFetchClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});
// register middleware
serverFetchClient.use(serverMiddleware);
fetchClient.use(myMiddleware);

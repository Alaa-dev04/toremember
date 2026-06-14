import createClient from "openapi-fetch";
import type { paths } from "./generated";

export const api = createClient<paths>({
  ///from the local .env
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
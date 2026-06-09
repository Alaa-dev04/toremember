import createClient from "openapi-fetch";
import type { paths } from "./generated";

export const client = createClient<paths>({
  baseUrl: "https://myapi.dev/v1",
});
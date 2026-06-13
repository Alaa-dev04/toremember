import createClient from "openapi-react-query";
import { fetchClient } from "./clients.lib";

export const $api = createClient(fetchClient);

import createClient from "openapi-react-query";
import { fetchClient } from "./api/clients";

export const $api = createClient(fetchClient);

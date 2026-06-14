import { api } from "@/lib/api/clients";
import type { paths } from "@/lib/api/generated";

// 1. Dig directly into the nested "data" property type from your schema
type OrdersPaginationPayload =
  paths["/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"];

// 2. Use that specific payload type for the Promise signature
export async function getOrders(): Promise<OrdersPaginationPayload> {
  const { data, error } = await api.GET("/orders");

  if (error || !data) {
    throw new Error("Failed to fetch orders");
  }

  // Now this perfectly matches the type signature!
  return data.data;
}
////react quary 
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/getorders";
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
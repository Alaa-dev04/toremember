import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/api/clients";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],

    queryFn: async () => {
      const { data, error } = await fetchClient.GET("/orders");

      if (error) {
        throw new Error("Failed to fetch orders");
      }

      return data;
    },
  });
};
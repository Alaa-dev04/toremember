"use client";
import { AppDataTable } from "@/shared/appdatatable";

import Filtrationbar from "./filtarationbar";
import { $api } from "@/lib/tanstack.lib";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { columns } from "@/features/orders/colums";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

function Orders() {
  const handleView = (id: number) => {
    console.log("Viewing order:", id);

    // navigate to order details page
    router.push(`/dashboard/orders/${id}`);
  };
  const tableColumns = useMemo(() => {
    return columns(handleView);
  }, []);
  const router = useRouter();
  const [filters] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      "filter[status]": parseAsString,
      "filter[created_at]": parseAsString,
      paginate: parseAsString.withDefault("10"),
    },
    {
      shallow: false,
    },
  );

  const { data, isLoading } = $api.useQuery("get", "/orders", {
    params: {
      query: filters as Record<string, unknown>,
    },
  });
  console.log(data?.data.current_page);
  return (
  <div className="flex flex-col gap-9" dir="rtl">
      <Filtrationbar />
      {/* we need to add the data real data integration */}
      <AppDataTable
        columns={tableColumns}
        data={data?.data?.data || []}
        isPaginated
        totalItems={data?.data.total}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Orders;

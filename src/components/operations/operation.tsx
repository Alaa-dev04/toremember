"use client";
import { AppDataTable } from "@/shared/appdatatable";
import { CtoOperationColoms } from "@/features/cto-operation-colum";
import { $api } from "@/lib/tanstack.lib";
import { parseAsString, useQueryStates, parseAsInteger } from "nuqs";
import Filtrationbar from "./filtarationop";

const Operation = () => {
  const [filters] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      "filter[event]": parseAsString,
      "filter[created_at]": parseAsString,
      paginate: parseAsString.withDefault("10"),
    },
    {
      shallow: false,
    },
  );
  const { data, isLoading } = $api.useQuery("get", "/audits", {
    params: {
      query: filters as Record<string, unknown>,
    },
  });

  return (
    <>
      <div className="p-7" dir="rtl">

        <h1 className="font-medium text-3xl pb-1">سجل العمليات</h1>
        <p className="text-[#A0A0A0]">
          متابعة جميع الأنشطة والتعديلات التي تمت داخل النظام
        </p>
      </div>

      <div className="flex flex-col gap-9 px-5" dir="rtl">
        <Filtrationbar />
        {/* we need to add the data real data integration */}
        <AppDataTable
          columns={CtoOperationColoms}
          data={data?.data?.data || []}
          isPaginated
          totalItems={data?.data.total}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Operation;

"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppDataTable } from "@/shared/appdatatable";

import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

import { columns } from "@/features/orders/colums";
import { $api } from "@/lib/tanstack.lib";

export default function Dashboard() {
  const router = useRouter();

  /*
  ============================
  Fetch Orders
  ============================
  */
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = $api.useQuery("get", "/orders", {
    params: {
      query: {
        paginate: "10",
      },
    },
  });

  /*
  ============================
  Fetch Order Stats
  ============================
  */
  const {
    data: statsapi,
    isLoading: statsLoading,
  } = $api.useQuery("get", "/orders/stats");

  /*
  ============================
  Handle View Order
  ============================
  */
  const handleView = (id: number) => {
    console.log("Viewing order:", id);

    // navigate to order details page
    router.push(`/dashboard/orders/${id}`);
  };

  /*
  ============================
  Table Columns
  ============================
  */
  const tableColumns = useMemo(() => {
    return columns(handleView);
  }, []);

  /*
  ============================
  Stats Cards (dynamic)
  ============================
  */
  const stats = [
    {
      title: "إجمالي الطلبات",
      value: statsapi?.data?.total || 0,
      icon: FileText,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },

    {
      title: "طلبات قيد المراجعة",
      value: statsapi?.data?.pending || 0,
      icon: Clock3,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },

    {
      title: "طلبات مقبولة",
      value: statsapi?.data?.accepted || 0,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },

    {
      title: "طلبات مرفوضة",
      value: statsapi?.data?.rejected || 0,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  /*
  ============================
  Loading State
  ============================
  */
  if (ordersLoading || statsLoading) {
    return (
      <div className="p-10 text-white text-center">
        Loading dashboard...
      </div>
    );
  }

  /*
  ============================
  Error State
  ============================
  */
  if (ordersError) {
    return (
      <div className="p-10 text-red-500 text-center">
        Failed to fetch data
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-8 p-6">

      {/* Welcome Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            alaa مرحباً بك
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            تابع وإدر طلبات المشتريات الخاصة بك بسهولة
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="border-none bg-[#181818] p-6"
            >
              <div className="w-2xs">
                <div
                  className={`rounded-md p-2 h-11 m-2 ${item.bg} inline-block`}
                >
                  <Icon className={`size-6 ${item.color}`} />
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-400">
                    {item.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* New Order Button */}
      <div className="flex justify-start" dir="ltr">
        <Button className="bg-orange-500 px-6 hover:bg-orange-600">
          <Plus className="mr-2 size-4" />
          طلب جديد
        </Button>
      </div>

      {/* Orders Table */}
      <Card className="border-none bg-[#181818] p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            آخر الطلبات
          </h2>

          <button className="text-sm font-medium text-orange-500 border-b border-b-orange-500">
            مشاهدة الكل
          </button>
        </div>

        <AppDataTable
          data={orders?.data?.data || []}
          columns={tableColumns}
          containerClassName="bg-transparent p-0"
          tableCellClassName="text-white"
          isPaginated={false}
        />
      </Card>
    </div>
  );
}
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { AppDataTable } from "@/shared/appdatatable";

import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

import { columns, Order } from "@/features/orders/colums";

// temporary mock until backend connected
const ordersData: Order[] = [
  {
    id: 1,
    created_at: "15 مارس 2026",
    quantity: 4,
    status: "approved",
  } as Order,

  {
    id: 2,
    created_at: "17 مارس 2026",
    quantity: 7,
    status: "pending",
  } as Order,

  {
    id: 3,
    created_at: "18 مارس 2026",
    quantity: 3,
    status: "rejected",
  } as Order,
];

const stats = [
  {
    title: "إجمالي الطلبات",
    value: 24,
    icon: FileText,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "طلبات قيد المراجعة",
    value: 14,
    icon: Clock3,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "طلبات مقبولة",
    value: 8,
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "طلبات مرفوضة",
    value: 2,
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export default function Dashboard() {
  const router = useRouter();

  const handleView = (id: number) => {
    console.log(id);

    // later:
    // router.push(`/orders/${id}`)
  };

  const tableColumns = useMemo(() => {
    return columns(handleView);
  }, []);

  return (
    <div dir="rtl" className="space-y-8 p-6">
      {/* welcome section */}
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

      {/* stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="border-none bg-[#181818] p-6">
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

      {/* action button */}
      <div className="flex justify-start" dir="ltr">
        <Button className="bg-orange-500 px-6 hover:bg-orange-600">
          <Plus className="mr-2 size-4" />
          طلب جديد
        </Button>
      </div>

      {/* table */}
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
          data={ordersData}
          columns={tableColumns}
          containerClassName="bg-transparent p-0"
          tableCellClassName="text-white"
          isPaginated={false}
        />
      </Card>
    </div>
  );
}
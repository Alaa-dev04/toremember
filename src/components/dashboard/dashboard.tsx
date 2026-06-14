"use client";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AppDataTable } from "@/shared/appdatatable";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
  Eye,
} from "lucide-react";

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

const tableData = [
  {
    requestId: "Req2025-25",
    date: "15 مارس 2026",
    quantity: 4,
    status: "approved",
  },
  {
    requestId: "Req2025-70",
    date: "17 مارس 2026",
    quantity: 7,
    status: "pending",
  },
  {
    requestId: "Req2025-40",
    date: "15 مارس 2026",
    quantity: 4,
    status: "approved",
  },
  {
    requestId: "Req2025-30",
    date: "15 مارس 2026",
    quantity: 4,
    status: "rejected",
  },
];

const columns = [
  {
    accessorKey: "requestId",
    header: "رقم الطلب",
  },
  {
    accessorKey: "date",
    header: "التاريخ",
  },
  {
    accessorKey: "quantity",
    header: "الكمية",
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }: any) => {
      const status = row.original.status;

      if (status === "approved") {
        return (
          <Badge
            className=" w-[110px]
            h-8
            rounded-sm
            flex items-center justify-center
            border
            bg-green-500/10
            text-green-400
            border-green-500/20"
          >
            تمت الموافقة
          </Badge>
        );
      }

      if (status === "pending") {
        return (
  <Badge
    className="
      w-[110px]
      h-7
      rounded-sm
      flex items-center justify-center
      border
      bg-yellow-500/10
      text-yellow-400
      border-yellow-500/20
    "
  >            قيد المراجعة
          </Badge>
        );
      }

      return (
        <Badge
    className="
      w-[110px]
      h-8
      rounded-sm
      flex items-center justify-center
      border
      bg-red-500/10
      text-red-400
      border-red-500/20
    "
  >
          مرفوض
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    cell: () => (
      <button>
        <Eye className="size-4 text-zinc-400" />
      </button>
    ),
  },
];

export default function Dashboard() {
  return (
    <div dir="rtl" className="space-y-8 p-6">
      {/* welcome section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">alaa مرحباً بك</h1>

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
              <div className="">
                <div className={`rounded-md p-2 h-11 m-2 ${item.bg} inline-block`}>
                  <Icon className={`size-6 ${item.color}`} />
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-400">{item.title}</p>

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
          <h2 className="text-xl font-semibold text-white">آخر الطلبات</h2>

          <button className="text-sm font-medium text-orange-500 border-b  border-b-orange-500 ">
            مشاهدة الكل
          </button>
        </div>

        <AppDataTable
          data={tableData}
          columns={columns}
          containerClassName="bg-transparent p-0"
          tableCellClassName="text-white"
          isPaginated={false}
        />
      </Card>
    </div>
  );
}

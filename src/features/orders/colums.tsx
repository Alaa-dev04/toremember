import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { paths } from "@/lib/api/generated";

export type Order =
  paths["/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["data"][number];

export const columns = (
  onView: (id: number) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "رقم الطلب",
  },

  {
    accessorKey: "created_at",
    header: "التاريخ",
  },

  {
    accessorKey: "quantity",
    header: "الكمية",
  },

  {
    accessorKey: "status",
    header: "الحالة",

    cell: ({ row }) => {
      const status = row.original.status;

      if (status === "approved") {
        return (
          <Badge
            className="
            w-27.5
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
              w-27.5
              h-7
              rounded-sm
              flex items-center justify-center
              border
              bg-yellow-500/10
              text-yellow-400
              border-yellow-500/20"
          >
            قيد المراجعة
          </Badge>
        );
      }

      return (
        <Badge
          className="
            w-27.5
            h-8
            rounded-sm
            flex items-center justify-center
            border
            bg-red-500/10
            text-red-400
            border-red-500/20"
        >
          مرفوض
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "الإجراءات",

    cell: ({ row }) => {
      const orderId = row.original.id;

      return (
        <button onClick={() => onView(orderId as number)}>
          <Eye className="size-4 text-zinc-400" />
        </button>
      );
    },
  },
];
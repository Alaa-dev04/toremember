import { ColumnDef } from "@tanstack/react-table";
import { Badge ,badgeVariants} from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { paths } from "@/lib/api/generated";
import {VariantProps } from "class-variance-authority";

import Link from 'next/link'
export type Order =
  paths["/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["data"][number];
const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    accepted: 'تمت الموافقة',
    pending: 'قيد المراجعة',
    rejected: 'مرفوض',
  };
  return statusMap[status] || status;
};
  const getStatusVariants: Record<
  string,
  VariantProps<typeof badgeVariants>['variant']
> = {
  accepted: 'success',
  pending: 'warning',
  rejected: 'destructive',
} as const;
export const columns = (
  onView: (id: number) => void
): ColumnDef<Order>[] =>   [
    {
      accessorKey: 'id',
      header: 'رقم الطلب',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('id')}</div>
      ),
    },

    {
      accessorKey: 'created_at',
      header: 'التاريخ',
      cell: ({ row }) => (
        <div>
          {new Intl.DateTimeFormat('ar-EG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(row.getValue('created_at')))}
        </div>
      ),
    },
    {
      accessorKey: 'total_quantity',
      header: 'الكمية',
      cell: ({ row }) => <div>{row.getValue('total_quantity')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'الحالة',
      cell: ({ row }) => (
        <Badge
          variant={
            getStatusVariants[row.getValue('status') as string]
          }
        >
          {getStatusLabel(row.getValue('status'))}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'الإجراءات',
      cell: ({ row }) => {
        const params = new URLSearchParams(window.location.search);
        if (row.original.id)
          params.set('dialog-orders', row.original.id?.toString());
        return (
          <Link
            className="h-8 w-8"
            href={`/orders?${params.toString()}`}
          >
            <Eye className="h-4 w-4" />
          </Link>
        );
      },
    },
  ];
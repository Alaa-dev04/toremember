"use client";
import { ColumnDef } from "@tanstack/react-table";
import { paths } from "@/lib/api/generated";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";
export type operation =
  paths["/audits"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["data"][number];

const getActionVariants: Record<
  string,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  "تم إنشاء طلب": "create",
  "تم قبول طلب": "success",
  "تم رفض طلب": "destructive",
  "تم تعديل مستخدم": "info",
  "تم إنشاء مستخدم": "secondary",
  "نم مراجعة طلب": "warning",
  "تم تعديل طلب": "default",
  "تم تسجيل دخول": "secondary",
};
export const CtoOperationColoms: ColumnDef<operation>[] = [
  {
    accessorKey: "user_name",
    header: "المستخدم",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.user_name}</div>
    ),
  },
  {
    accessorKey: "user_role",
    header: "المسمى الوظيفي",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.user_role}</div>
    ),
  },
  {
    accessorKey: "event",
    header: "الاجراء",
    cell: ({ row }) => {
      const action = row.original.event;
      return (
        <Badge variant={getActionVariants[action] || "default"}>{action}</Badge>
      );
    },
  },
  {
    accessorKey: "auditable_id",
    header: "رقم الطلب ",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.auditable_id}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "التاريخ",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      /// a date formate by chat 
      const formattedDate = new Intl.DateTimeFormat("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "event",
    header: "التفاصيل",
    cell: ({ row }) => <div className="font-medium">{row.original.event}</div>,
  },
];

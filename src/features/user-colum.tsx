"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { paths } from "@/lib/api/generated";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
export type users =
  paths["/users"]["get"]["responses"]["200"]["content"]["application/json"]["data"]["data"][number];
export const usersColums: ColumnDef<users>[] = [
  {
    accessorKey: "name",
    header: "الاسم",
  },
  {
    accessorKey: "username",
    header: "اسم المستخدم",
  },
  {
    accessorKey: "role",
    header: "الصلاحية",
  },
  {
    accessorKey: "department",
    header: "القسم",
  },

  /////////here should ne the actions so
  ///how to make the three dots and link it to the page  ogf user edit
  {
    id: "actions",
    header: "الإجراءات",
    cell: ({ row }) => {
      const params = new URLSearchParams(window.location.search);
      if (row.original.id)
        params.set("dialog-edit-user", row.original.id?.toString());
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary text-white hover:text-white/80!">
              <DropdownMenuItem asChild>
                <Link href={`/users?${params.toString()}`}>تعديل</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

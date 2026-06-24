"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from 'lucide-react';
import { paths } from "@/lib/api/generated";
export type users = paths['/users']['get']['responses']['200']['content']['application/json']['data']['data'][number];
export const usersColums:ColumnDef<users>[]=[
    {
        accessorKey:'name',
        header:'الاسم'
    },
    {
        accessorKey:'username',
        header:'اسم المستخدم'
    },
    {
        accessorKey:'role',
        header:'الصلاحية'
    },
    {
        accessorKey:'department',
        header:'القسم'
    },
    

]

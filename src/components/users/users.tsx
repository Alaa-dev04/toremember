"use client";
import { AppDataTable } from "@/shared/appdatatable";
import { Button } from "../ui/button";
import Link from "next/link";
import { usersColums } from "@/features/user-colum";
import { Suspense } from "react";
import { $api } from "@/lib/tanstack.lib";
import { User } from "lucide-react";
import EditUserModel from "@/shared/edituser";
import NewUserModel from "@/shared/newuser";

const users = () => {
  const { data, isLoading } = $api.useQuery("get", "/users");
  return (
    <div className="flex flex-col gap-9">
      <Suspense fallback={<div>Loading...</div>}>
        <NewUserModel />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUserModel />
      </Suspense>
      <div>
        <h1 className="font-medium text-3xl pb-1"> إدارة المستخدمين</h1>
        <p className="text-[#A0A0A0]">
          إضافة المستخدمين وإدارة الصلاحيات وحالة الحسابات
        </p>
      </div>

      <Button asChild className="mr-auto w-fit [&_svg]:size-5!">
        <Link href="/users?dialog-create-user=open">
          اضافة مستخدم
          <User className="mr-11" size={20} />
        </Link>
      </Button>

      <AppDataTable
        columns={usersColums}
        data={data?.data.data || []}
        isPaginated
        totalItems={data?.data.total}
        isLoading={isLoading}
      />
    </div>
  );
};

export default users;

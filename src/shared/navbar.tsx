"use client";
import { useSession } from "next-auth/react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between bg-[#1E1E1E] px-4 py-6 sm:px-8">
      <div className="flex items-center gap-2">
        <span className="md:hidden">
          <SidebarTrigger className="text-primary hover:bg-gray-500/40" />
        </span>
        <h1 className="text-lg font-bold sm:text-2xl">
          نظام إدارة طلبات الـ IT
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-[#F9F9F9] sm:text-base">alaa  ibrahim </span>
            <span className="text-xs text-[#A0A0A0] sm:text-base">fuck fuck fuck </span>
          </div>
          <div className="bg-primary flex size-10 items-center justify-center rounded-full text-base font-bold text-[#F9F9F9] sm:size-12">definatlly gonna cry </div>
        </div>
      </div>
    </header>
  );
}

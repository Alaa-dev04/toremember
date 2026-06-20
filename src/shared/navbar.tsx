"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export default function Navbar() {
  ///// to add info later on
  const { data: session } = useSession();
  console.log(session?.user?.name);

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
      {/* ////hate this live gonna cry or kill myself man this is hard  */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-[#F9F9F9] sm:text-base">
              {session?.user?.name}
            </span>
            <span className="text-xs text-[#A0A0A0] sm:text-base">
              {session?.user?.role}{" "}
            </span>
          </div>
          <div className="bg-primary flex size-10 items-center justify-center rounded-full overflow-hidden text-base font-bold text-[#F9F9F9] sm:size-12">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              session?.user?.name
                ?.split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

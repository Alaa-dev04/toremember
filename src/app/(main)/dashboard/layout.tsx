import type { ReactNode } from "react";
import Navbar from "@/shared/navbar";
import AppSidebar from "@/shared/appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
type LoginLayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
  <SidebarProvider>

      <div className="flex min-h-screen w-full bg-black">

        <AppSidebar />

        <div className="flex flex-1 flex-col">

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

        </div>

      </div>

    </SidebarProvider>
  );
}

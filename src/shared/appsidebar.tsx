'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileEdit,
  Package,
  LogOut,
  SquareTerminal,
  ListChecks,
  Users,
} from 'lucide-react';


import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

import {
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
} from 'react';
import { LucideProps } from 'lucide-react';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


type menuItems = {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  href: string;
  roles: string[];
}[];
/////this is my way to die 

const menuItems = [
  {
    title: 'لوحة التحكم',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['it', 'cto', 'account'],
  },
  {
    title: 'طلب جديد',
    icon: FileEdit,
    href: '/new-order',
    roles: ['it'],
  },
  {
    title: 'طلباتي',
    icon: Package,
    href: '/orders',
    roles: ['it'],
  },
  

];
// give up this is not for me
function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  

  // Temporary placeholder for user data to avoid runtime errors when `me` is not available.
  const me = { data: { user: { username: '', role: '' } } };


  return (
    <Sidebar
  
      className="bg-sidebar border-none"
    >
      <div className="flex h-full flex-col gap-8 p-4 py-6 text-white">
        {/* Header */}
        <SidebarHeader>
          <div className="flex justify-end gap-3">
            <span className="text-left text-xl font-medium">
              IT Request
              <br />
              System
            </span>
            <div className="bg-primary flex size-8 items-center justify-center rounded-md text-white">
              <SquareTerminal className="size-5" />
            </div>
          </div>
        </SidebarHeader>
{/* haneen good for you u really know how to get on with this live  */}
        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;

                return (
                  <Fragment key={item.title}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            'h-12 rounded-md px-4 text-base font-medium transition-colors',
                            isActive
                              ? 'bg-primary hover:bg-primary/90 text-white hover:text-white'
                              : 'bg-[#2C2C2C] text-zinc-300 hover:bg-[#3A3A3A] hover:text-white'
                          )}
                        >
                          <Link href={item.href}>
                            <Icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                  </Fragment>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="mt-auto">
          <div className="space-y-4">
            <div className="rounded-md bg-[#2B2B2B] p-4">
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">
                {session?.user?.name}
                </span>

                <span className="mt-1 text-xs text-[#A0A0A0]">
                  {session?.user?.email}
                </span>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={async () => {
                await signOut({
                  redirect: true,
                  callbackUrl: '/login',
                });
              }}
              className="flex w-full items-center justify-start gap-2 rounded-md px-4 py-3"
            >
              <LogOut className="size-4" />
              <span className="text-base">تسجيل الخروج</span>
            </Button>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}

export default AppSidebar;

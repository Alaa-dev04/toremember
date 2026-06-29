import type { ReactNode } from "react";
import { Toaster } from "sonner";

type LayoutProps = {
  children: ReactNode;
};

export default function InvoiceLayout({ children }: LayoutProps) {
  return (
    <main className=" min-h-svh w-full max-w-none p-4  overflow-x-hidden  ">
        {children}
      <Toaster position="bottom-left" />
    </main>
  );
}
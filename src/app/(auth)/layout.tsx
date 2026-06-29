import type { ReactNode } from 'react';
import { Toaster } from "sonner";
type LoginLayoutProps = {
  children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="min-h-svh w-full max-w-none flex-1 overflow-x-hidden bg-white">
      {children}
      <Toaster position="bottom-left"/>
    </main>
  );
}

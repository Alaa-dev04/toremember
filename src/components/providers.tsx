"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClinet = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClinet}>
        <NuqsAdapter>{children}
           <Toaster position="bottom-left" />
        </NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

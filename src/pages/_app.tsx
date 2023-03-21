import "@/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "@/core/contexts/notification/NotificationProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [reactQueryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={reactQueryClient}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

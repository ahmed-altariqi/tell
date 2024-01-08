import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

import { SessionProvider } from "~/components/providers/session-provider";
import { ThemeStoreProvider } from "~/components/providers/theme-store-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <SessionProvider>
        <ThemeStoreProvider>{children}</ThemeStoreProvider>
      </SessionProvider>
    </TRPCReactProvider>
  );
}

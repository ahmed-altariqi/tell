"use client";

import { SessionProvider as Provider } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

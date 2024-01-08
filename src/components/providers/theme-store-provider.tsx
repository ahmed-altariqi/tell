"use client";

import { useMounted } from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";

import { useThemeStore } from "~/store/theme-store";

type ProviderProps = { children: React.ReactNode };

export function ThemeStoreProvider({ children }: ProviderProps) {
  const { isMounted } = useMounted();

  if (!isMounted) {
    return null;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}

function ThemeProvider({ children }: ProviderProps) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <div
      className={cn(
        "to-primary-dark bg-background bg-gradient-to-b from-background via-primary/[0.01]",
        theme.className,
      )}
    >
      {children}
    </div>
  );
}

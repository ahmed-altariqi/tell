"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { routes } from "~/constants";
import { cn } from "~/lib/utils";

import { CustomTooltip } from "~/components/ui/custom-tooltip";
import { ButtonWithLoader } from "~/components/ui/button-with-loader";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";

export function DesktopNavigation() {
  const pathname = usePathname();
  const session = useSession();

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  return (
    <div className="hidden items-center justify-between px-4 md:flex">
      <Logo />
      <div className="flex items-center gap-3">
        {routes.map(({ label, path, Icon }) => (
          <CustomTooltip key={label} label={label}>
            <Button variant="ghost" asChild>
              <Link href={path} className="h-full w-full">
                <Icon
                  className={cn("size-5", {
                    "text-primary": pathname === path,
                  })}
                />
              </Link>
            </Button>
          </CustomTooltip>
        ))}

        {isAuthenticated ? (
          <ButtonWithLoader
            onClick={() => signOut()}
            isLoading={isLoading}
            label="Sign out"
          />
        ) : (
          <ButtonWithLoader
            onClick={() => signIn()}
            isLoading={isLoading}
            label="Sign in"
          />
        )}
      </div>
    </div>
  );
}

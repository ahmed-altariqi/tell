"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import { cn } from "~/lib/utils";
import { routes } from "~/constants";

import { useSidebarStore } from "~/store/sidebar-store";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { ButtonWithLoader } from "~/components/ui/button-with-loader";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";

export function MobileNavigation() {
  const onOpenChange = useSidebarStore((state) => state.onOpenChange);
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);
  
  const session = useSession();
  const pathname = usePathname();

  const isAuthenticated = session.status === "authenticated";
  const isLoading = session.status === "loading";

  return (
    <div className="flex items-center justify-between md:hidden">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div>
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="ghost" asChild>
              <div className="flex flex-col gap-y-1">
                <div className="h-[2px] w-7 rounded-md bg-white"></div>
                <div className="h-[2px] w-5 self-end rounded-md bg-white"></div>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex h-full flex-col">
              <div className="flex flex-1 flex-col gap-3 pt-10">
                {routes.map(({ label, path, Icon }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    asChild
                    className="flex w-full items-center justify-start"
                    onClick={close}
                  >
                    <Link
                      href={path}
                      className={cn("flex items-center gap-2", {
                        "text-primary": pathname === path,
                      })}
                    >
                      <Icon
                        className={cn("h-5 w-5", {
                          "text-primary": pathname === path,
                        })}
                      />
                      {label}
                    </Link>
                  </Button>
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
              <div className="flex items-center justify-center">
                <Logo />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

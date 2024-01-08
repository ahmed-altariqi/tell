"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="flex items-center gap-2">
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isActive = index === pathSegments.length - 1;

        return (
          <div key={segment}>
            {index > 0 && <span className="mr-2">/</span>}
            {isActive ? (
              <span className="font-semibold">{segment}</span>
            ) : (
              <Link
                href={path}
                className="rounded-md p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                {segment}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

import Link from "next/link";

import type { UserInfo } from "~/types";

import { getProductionURL } from "~/lib/utils";

import { CopyButton } from "~/components/copy-button";
import { UserAvatar } from "~/components/user/user-avatar";

type UserCardProps = {
  userInfo: UserInfo;
  followersCount: number;
  followingsCount: number;
  tellsCount: number;
  isSessionUser?: boolean;
  children: React.ReactNode;
};

export function UserCard({
  children,
  userInfo,
  followingsCount,
  followersCount,
  tellsCount,
  isSessionUser = false,
}: UserCardProps) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-y-4 rounded-sm py-6 text-center">
      <div className="absolute right-0 top-0">
        <CopyButton text={getProductionURL(userInfo.username)} />
      </div>
      <div className="flex flex-col items-center">
        <UserAvatar
          name={userInfo.name}
          image={userInfo.image}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{userInfo.name}</h2>
          <p className="text-muted-foreground">@{userInfo.username}</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col items-center justify-center border-r border-border px-4">
          {followersCount ? (
            <Link
              href={
                isSessionUser
                  ? "/profile/followers"
                  : `/${userInfo.username}/followers`
              }
            >
              <p>{followersCount}</p>
              <p className="text-muted-foreground">followers</p>
            </Link>
          ) : (
            <div className="select-none">
              <p>{followersCount}</p>
              <p className="text-muted-foreground">followers</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center border-r border-border px-4">
          {isSessionUser ? (
            <Link href="/tells">
              <p>{tellsCount}</p>
              <p className="text-muted-foreground">tells</p>
            </Link>
          ) : (
            <>
              <p>{tellsCount}</p>
              <p className="text-muted-foreground">tells</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-center px-4">
          {followingsCount ? (
            <Link
              href={
                isSessionUser
                  ? "/profile/followings"
                  : `/${userInfo.username}/followings`
              }
            >
              <p>{followingsCount}</p>
              <p className="text-muted-foreground">followings</p>
            </Link>
          ) : (
            <div className="select-none">
              <p>{followingsCount}</p>
              <p className="text-muted-foreground">followings</p>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

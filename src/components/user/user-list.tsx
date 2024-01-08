import Link from "next/link";

import { UserAvatar } from "~/components/user/user-avatar";
import type { UserInfo } from "~/types";

type UserListProps = { users: UserInfo[] };

export function UserList({ users }: UserListProps) {
  return (
    <div className="flex w-full flex-col gap-y-4">
      {users.map((user) => (
        <UserListItem key={user.username} user={user} />
      ))}
    </div>
  );
}

type UserListItemProps = { user: UserInfo };

function UserListItem({ user }: UserListItemProps) {
  return (
    <Link href={`/${encodeURIComponent(user.username)}`}>
      <div className="flex w-full rounded-md bg-secondary/60 transition hover:bg-secondary/40">
        <UserAvatar
          image={user.image}
          name={user.name}
          className="h-full w-16 rounded-l-md"
        />
        <div className="px-4 py-2">
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
    </Link>
  );
}

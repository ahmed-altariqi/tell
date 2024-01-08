import type { UsernameParam } from "~/types";

import { UserList } from "~/components/user/user-list";
import { Breadcrumb } from "~/components/breadcrumb";
import { api } from "~/trpc/server";

export default async function FollowingPage({ params }: UsernameParam) {
  const profile = await api.user.byUsername.query({
    username: params.username,
  });

  return (
    <div className="w-full space-y-8">
      <Breadcrumb />
      {profile?.followings ? <UserList users={profile.followings} /> : null}
    </div>
  );
}

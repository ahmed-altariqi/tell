import type { UsernameParam } from "~/types";

import { Breadcrumb } from "~/components/breadcrumb";
import { UserList } from "~/components/user/user-list";
import { api } from "~/trpc/server";

export default async function FollowersPage({ params }: UsernameParam) {
  const profile = await api.user.byUsername.query({
    username: params.username,
  });

  return (
    <div className="w-full space-y-8">
      <Breadcrumb />
      {profile?.followers ? <UserList users={profile.followers} /> : null}
    </div>
  );
}

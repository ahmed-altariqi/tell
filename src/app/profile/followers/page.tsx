import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

import { UserList } from "~/components/user/user-list";
import { Breadcrumb } from "~/components/breadcrumb";

export default async function FollowersPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return <AuthenticatedFollowers />;
}

async function AuthenticatedFollowers() {
  const profile = await api.user.profile.query();

  return (
    <div className="w-full space-y-8">
      <Breadcrumb />
      {profile?.followers ? <UserList users={profile.followers} /> : null}
    </div>
  );
}

import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

import { Breadcrumb } from "~/components/breadcrumb";
import { UserList } from "~/components/user/user-list";
import { api } from "~/trpc/server";

export default async function FollowingPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return <Following />;
}

async function Following() {
  const profile = await api.user.profile.query();

  return (
    <div className="w-full space-y-8">
      <Breadcrumb />
      {profile?.followings ? <UserList users={profile.followings} /> : null}
    </div>
  );
}

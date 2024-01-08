import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

import { Button } from "~/components/ui/button";
import { UserCard } from "~/components/user/user-card";

import { TellList } from "~/components/tell/tell-list";
import { getSessionUserProfile } from "~/actions/user";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="h-full w-full">
      <AuthenticatedProfile />
    </div>
  );
}

async function AuthenticatedProfile() {
  const profile = await getSessionUserProfile();

  if (profile === null) {
    // TODO: Log them out instead.
    return null;
  }

  return (
    <div>
      <UserCard
        userInfo={profile.userInfo}
        followingsCount={profile.followings.length}
        followersCount={profile.followers.length}
        tellsCount={profile.tellsCount}
        isSessionUser
      >
        <Button variant="outline" asChild>
          <Link href="/profile/edit">Edit</Link>
        </Button>
      </UserCard>
      <div className="space-y-6 py-10">
        <TellList tells={profile.tells} userInfo={profile.userInfo} />
      </div>
    </div>
  );
}

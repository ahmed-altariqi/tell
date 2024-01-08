import Link from "next/link";
import type { Metadata } from "next";

import type { UsernameParam } from "~/types";

import { UserCard } from "~/components/user/user-card";
import { FollowButton } from "~/components/user/follow-button";
import { SendTellForm } from "~/components/tell/send-tell-form";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { TellList } from "~/components/tell/tell-list";

export async function generateMetadata({
  params,
}: UsernameParam): Promise<Metadata> {
  const profile = await api.user.byUsername.query({
    username: params.username,
  });

  return {
    twitter: {
      card: "summary",
      title: `${profile?.userInfo.username ?? profile?.userInfo.name}`,
      description: "Send anonymous messages to friends.",
      creator: `${profile?.userInfo.username}`,
      images: profile?.userInfo.image ? [profile.userInfo.image] : [],
    },
  };
}

export default async function UsernamePage({ params }: UsernameParam) {
  const profile = await api.user.byUsername.query({
    username: params.username,
  });

  if (profile === null) {
    return (
      <div className="flex w-full flex-col items-center gap-y-4 pt-20">
        <p className="text-xl text-destructive sm:text-2xl">
          {params.username} was not found
        </p>
        <Button variant="link" className="px-0 text-base" asChild>
          <Link href="/search">Go to search page</Link>
        </Button>
      </div>
    );
  }

  const { userInfo, isFollowing, tells } = profile;

  return (
    <div className="w-full space-y-2">
      <UserCard
        userInfo={userInfo}
        followersCount={profile.followers.length}
        followingsCount={profile.followings.length}
        tellsCount={profile.tellsCount}
      >
        <FollowButton userId={userInfo.id} isFollowing={isFollowing} />
      </UserCard>
      <SendTellForm recipientId={userInfo.id} />
      <div className="space-y-6 py-10">
        <TellList tells={tells} userInfo={userInfo} />
      </div>
    </div>
  );
}

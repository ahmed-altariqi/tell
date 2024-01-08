"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

import { Button } from "~/components/ui/button";

type FollowButtonProps = {
  userId: string | undefined;
  isFollowing: boolean | undefined;
};

export function FollowButton({ userId, isFollowing }: FollowButtonProps) {
  const [optimisticFollow, setOptimisticFollow] = useState<
    "follow" | "unfollow"
  >(() => (isFollowing ? "unfollow" : "follow"));

  const session = useSession();
  const router = useRouter();
  const followMutation = api.user.toggleFollow.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      setOptimisticFollow((s) => (s === "follow" ? "unfollow" : "follow"));
    },
  });

  if (
    session.status === "unauthenticated" ||
    !userId ||
    session.data?.user.id === userId
  ) {
    return null;
  }

  return (
    <Button
      variant={optimisticFollow === "unfollow" ? "destructive" : "outline"}
      onClick={() => {
        setOptimisticFollow((s) => (s === "follow" ? "unfollow" : "follow"));
        followMutation.mutate({ userId });
      }}
      disabled={followMutation.isLoading}
    >
      {optimisticFollow}
    </Button>
  );
}

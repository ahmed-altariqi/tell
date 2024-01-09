"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Loader as LoaderIcon } from "lucide-react";
import { Suspense } from "react";

import { api } from "~/trpc/react";

import type { Tell, UserInfo } from "~/types";

import { Skeleton } from "~/components/ui/skeleton";
import { TellCardProvider } from "~/components/tell/tell-card";

type InfiniteTellListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  tells: Tell[] | undefined;
  fetchMoreTells: () => Promise<unknown>;
};

export function InfiniteTells() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    api.tell.infiniteTells.useInfiniteQuery(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

  const tells = data?.pages.flatMap(({ tells }) => tells);

  if (tells === undefined) return null;

  return (
    <InfiniteTellList
      tells={tells}
      isError={isError}
      isLoading={isLoading}
      hasMore={hasNextPage ?? false}
      fetchMoreTells={fetchNextPage}
    />
  );
}

export function InfiniteTellList({
  tells,
  isLoading,
  isError,
  hasMore,
  fetchMoreTells,
}: InfiniteTellListProps) {
  if (isError) {
    return <InfiniteTellListError />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (tells === undefined || tells?.length === 0) {
    return (
      <p className="py-4 text-center text-2xl text-muted-foreground">
        No more Tells
      </p>
    );
  }

  return (
    <Suspense fallback={<InfiniteTellListLoadingSkeleton />}>
      <InfiniteScroll
        next={fetchMoreTells}
        hasMore={hasMore}
        loader={<Loader />}
        dataLength={tells.length}
        endMessage={
          <p className="text-center text-muted-foreground">No more Tells.</p>
        }
      >
        <h2 className="text-2xl font-bold sm:text-3xl">Recent Tells</h2>
        <div className="w-full space-y-10 py-10 sm:space-y-8">
          {tells.map((tell) => {
            if (tell.reply === null) return null;

            return (
              <TellCardProvider
                key={tell.tellId}
                tell={tell}
                userInfo={
                  {
                    username: tell.reply.replyAuthorUsername,
                    name: tell.reply.replyAuthorName,
                    image: tell.reply.replyAuthorImage,
                  } as UserInfo
                }
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </Suspense>
  );
}

function InfiniteTellListError() {
  // TODO: handel error
  return <div>error</div>;
}

function InfiniteTellListLoadingSkeleton() {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
    </div>
  );
}

function Loader() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <LoaderIcon className="h-6 w-6 animate-spin" />
    </div>
  );
}

import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

import { Button } from "~/components/ui/button";
import { Breadcrumb } from "~/components/breadcrumb";
import { InfiniteTells } from "~/components/tell/infinite-tell-list";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="w-full">
      {session ? <AuthenticatedFeed /> : <UnauthenticatedFeed />}
    </div>
  );
}

function UnauthenticatedFeed() {
  return (
    <div className="flex w-full flex-col items-center gap-4 pt-20 text-center">
      <h3 className="text-3xl font-black md:text-5xl">
        Send anonymous messages to friends.
      </h3>

      <p className="flex flex-col text-muted-foreground">
        <span>Sign in to follow your friends and to get feed.</span>
      </p>

      <Button asChild>
        <Link href="/api/auth/signin">Get Started</Link>
      </Button>
    </div>
  );
}

function AuthenticatedFeed() {
  // TODO: implement an infinite feed component
  return (
    <div>
      <Breadcrumb />
      <InfiniteTells />
    </div>
  );
}

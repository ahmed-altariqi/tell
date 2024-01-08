import { redirect } from "next/navigation";
import { TwitterShareButton, TwitterIcon } from "react-share";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { getProductionURL } from "~/lib/utils";

import { CopyButton } from "~/components/copy-button";
import { TellList } from "~/components/tell/tell-list";

export default async function TellsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return <AuthenticatedTells />;
}

async function AuthenticatedTells() {
  const { userInfo, tells } = await api.tell.unanswered.query();

  return (
    <div className="size-full">
      {tells.length ? (
        <TellList tells={tells} userInfo={userInfo} />
      ) : (
        <Empty username={userInfo.username} />
      )}
    </div>
  );
}

function Empty({ username }: { username: string }) {
  return (
    <div className="space-y-8 pt-20 text-center text-2xl">
      <p>You haven&apos;t received any Tells yet.</p>
      <div className="flex items-center justify-center">
        <CopyButton text={getProductionURL(username)} label="Copy link" />
        <TwitterShareButton
          url={getProductionURL(username)}
          title="Ask me anything"
          className="rounded-md"
        >
          <TwitterIcon className="h-12 rounded-md object-cover p-0 pt-2" />
        </TwitterShareButton>
      </div>
    </div>
  );
}

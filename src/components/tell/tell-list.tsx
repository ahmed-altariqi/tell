"use client";

import type { Tell, UserInfo } from "~/types";

import { TellCard } from "~/components/tell/tell-card";

type TellListProps = {
  tells: Tell[];
  userInfo: UserInfo;
};

export function TellList({ tells, userInfo }: TellListProps) {
  return (
    <div className="space-y-10 py-10">
      {tells.map((tell) => (
        <TellCard key={tell.tellId} tell={tell} userInfo={userInfo} />
      ))}
    </div>
  );
}

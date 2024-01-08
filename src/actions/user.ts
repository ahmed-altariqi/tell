"use server";

import { api } from "~/trpc/server";
import { db } from "~/server/db";

export async function getSessionUserProfile() {
  return await api.user.profile.query();
}

export async function getUserByUsername({ username }: { username: string }) {
  return await api.user.byUsername.query({ username });
}

export async function doesUserExists({ username }: { username: string }) {
  const user = await db.user.findUnique({
    where: { username },
  });

  return user ? true : false;
}

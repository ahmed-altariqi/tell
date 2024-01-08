import type { Prisma } from "@prisma/client";

import type { formatTellList } from "~/server/api/utils/helpers";

export type PrismaUser = Prisma.UserGetPayload<true>;
export type UserInfo = Omit<PrismaUser, "email" | "emailVerified">;

export type Tell = ReturnType<typeof formatTellList>[0];

export type UsernameParam = {
  params: { username: string };
};

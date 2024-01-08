import { z } from "zod";
import { type Prisma } from "@prisma/client";
import { type inferAsyncReturnType } from "@trpc/server";

import { type createTRPCContext, publicProcedure } from "~/server/api/trpc";

export type Context = inferAsyncReturnType<typeof createTRPCContext>;

const userDefaultSelect = {
  id: true,
  name: true,
  username: true,
  image: true,
} satisfies Prisma.UserSelect;

export const searchProcedure = publicProcedure
  .input(z.object({ query: z.string().min(1).nullable() }))
  .query(async ({ ctx, input }) => {
    return input.query === null
      ? null
      : input.query.startsWith("@")
        ? searchByUsername({ ctx, username: input.query.replace("@", "") })
        : searchByName({ ctx, name: input.query });
  });

async function searchByName({ ctx, name }: { ctx: Context; name: string }) {
  const users = await ctx.db.user.findMany({
    where: {
      name: { contains: name, mode: "insensitive" },
    },
    select: {
      ...userDefaultSelect,
    },
    take: 20,
  });

  return users.length ? users : null;
}

async function searchByUsername({
  ctx,
  username,
}: {
  ctx: Context;
  username: string;
}) {
  const user = await ctx.db.user.findUnique({
    where: { username },
    select: {
      ...userDefaultSelect,
    },
  });

  return user ? [user] : null;
}

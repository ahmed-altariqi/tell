import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

import { getUserData } from "~/server/api/utils/helpers";

export const byUsernameProcedure = publicProcedure
  .input(z.object({ username: z.string().min(1) }))
  .query(async ({ ctx, input: { username } }) => {
    return await getUserData({
      ctx,
      where: { username: decodeURIComponent(username) },
    });
  });

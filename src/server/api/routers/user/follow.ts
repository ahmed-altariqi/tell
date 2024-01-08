import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const followProcedure = protectedProcedure
  .input(z.object({ userId: z.string() }))
  .mutation(async ({ input: { userId }, ctx }) => {
    const sessionUserId = ctx.session.user.id;

    const existingFollow = await ctx.db.user.findFirst({
      where: { id: userId, followers: { some: { id: sessionUserId } } },
    });

    let addedFollow;
    if (existingFollow == null) {
      await ctx.db.user.update({
        where: { id: userId },
        data: { followers: { connect: { id: sessionUserId } } },
      });
      addedFollow = true;
    } else {
      await ctx.db.user.update({
        where: { id: userId },
        data: { followers: { disconnect: { id: sessionUserId } } },
      });
      addedFollow = false;
    }

    return { addedFollow };
  });

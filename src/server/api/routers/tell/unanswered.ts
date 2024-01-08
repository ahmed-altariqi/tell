import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";
import { getUserData } from "~/server/api/utils/helpers";

export const unansweredProcedure = protectedProcedure.query(async ({ ctx }) => {
  const profile = await getUserData({
    ctx,
    where: { id: ctx.session.user.id },
  });

  if (profile === null) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User was not found",
    });
  }

  const tells = await ctx.db.tell.findMany({
    where: {
      tellRecipientId: ctx.session.user.id,
      reply: {
        is: null,
      },
    },
    orderBy: {
      tellCreatedAt: "desc",
    },
  });

  return {
    userInfo: profile.userInfo,
    tells: tells.map((tell) => ({ ...tell, reply: null })),
  };
});

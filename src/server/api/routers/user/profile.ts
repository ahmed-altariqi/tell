import { protectedProcedure } from "~/server/api/trpc";

import { getUserData } from "~/server/api/utils/helpers";

export const profileProcedure = protectedProcedure.query(async ({ ctx }) => {
  return await getUserData({
    ctx,
    where: { id: ctx.session.user.id },
  });
});

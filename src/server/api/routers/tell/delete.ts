import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const deleteProcedure = protectedProcedure
  .input(
    z.object({
      replyId: z.string(),
    }),
  )
  .mutation(async ({ ctx, input: { replyId } }) => {
    return await ctx.db.reply.delete({
      where: {
        replyId,
      },
    });
  });

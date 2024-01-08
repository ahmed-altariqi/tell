import { publicProcedure } from "~/server/api/trpc";

import { InfiniteTellsSchema } from "~/validators";
import { formatTellWithReplyList } from "~/server/api/utils/helpers";

export const infiniteTellsProcedure = publicProcedure
  .input(InfiniteTellsSchema)
  .query(async ({ ctx, input: { limit = 20, cursor } }) => {
    const replies = await ctx.db.reply.findMany({
      take: limit + 1,
      cursor: cursor
        ? {
            replyId_replyCreatedAt: {
              replyId: cursor.id,
              replyCreatedAt: cursor.createdAt,
            },
          }
        : undefined,
      orderBy: [{ replyCreatedAt: "desc" }, { replyId: "desc" }],
      include: {
        replyTo: true,
        author: true,
      },
    });

    let nextCursor: typeof cursor | undefined;

    if (replies.length > limit) {
      const lastReply = replies.pop();

      if (lastReply !== null) {
        nextCursor = {
          id: lastReply?.replyId as unknown as string,
          createdAt: lastReply?.replyCreatedAt as unknown as Date,
        };
      }
    }

    return {
      tells: formatTellWithReplyList(replies),
      nextCursor,
    };
  });

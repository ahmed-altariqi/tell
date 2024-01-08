import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { ReplySchema } from "~/validators";

export const replyProcedure = protectedProcedure
  .input(ReplySchema)
  .mutation(async ({ ctx, input: { replyContent, tellId } }) => {
    const tell = await ctx.db.tell.findUnique({
      where: {
        tellId,
      },
    });

    if (!tell) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message:
          "Could not send reply, because the Tell you are replying to does not exists.",
      });
    }

    const sessionUser = ctx.session.user;

    if (!sessionUser) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "",
      });
    }

    const reply = await ctx.db.reply.create({
      data: {
        replyContent,
        author: {
          connect: {
            id: ctx.session.user.id,
          },
        },
        replyTo: {
          connect: {
            tellId,
          },
        },
      },
    });

    return reply;
  });

import { TRPCError } from "@trpc/server";

import { publicProcedure } from "~/server/api/trpc";

import { TellSchema } from "~/validators";

export const sendProcedure = publicProcedure
  .input(TellSchema)
  .mutation(
    async ({
      ctx,
      input: { tellRecipientId, tellAuthorId, tellAuthorUsername, tellContent },
    }) => {
      const tell = await ctx.db.tell.create({
        data: {
          tellAuthorId,
          tellContent,
          tellAuthorUsername,
          recipient: {
            connect: {
              id: tellRecipientId,
            },
          },
        },
      });

      if (!tell) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not send tell. Please try again.",
        });
      }

      return tell;
    },
  );

import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { genericValidation } from "~/validators";

export const updateProcedure = protectedProcedure
  .input(
    z.object({
      name: genericValidation,
      username: genericValidation,
      currentUsername: z.string().min(1),
      image: z.string().url(),
    }),
  )
  .mutation(
    async ({ ctx, input: { image, name, username, currentUsername } }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { username: currentUsername },
      });

      if (existingUser === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User your're trying to update doesn't exists.`,
        });
      }

      return await ctx.db.user.update({
        where: { username: currentUsername },
        data: {
          name,
          username,
          image,
        },
      });
    },
  );

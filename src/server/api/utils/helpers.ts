import type { Prisma } from "@prisma/client";
import type { inferAsyncReturnType } from "@trpc/server";

import type { createTRPCContext } from "~/server/api/trpc";
import type { UserInfo } from "~/types";

export async function getUserData({
  ctx,
  where,
}: {
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
  where: { id: string } | { username: string };
}) {
  const userData = await ctx.db.user.findUnique({
    where: { ...where },
    include: {
      followers: true,
      followings: true,
      tells: {
        include: {
          reply: {
            include: {
              author: true,
            },
          },
        },
        orderBy: {
          reply: {
            replyCreatedAt: "desc",
          },
        },
      },
    },
  });

  if (userData === null) {
    return null;
  }

  const sessionUserId = ctx.session?.user.id;
  const existingFollow = await ctx.db.user.findFirst({
    where: { id: userData?.id, followers: { some: { id: sessionUserId } } },
  });

  const { id, name, username, image, followers, followings, tells } = userData;

  return {
    userInfo: {
      id,
      name,
      username,
      image,
    },
    followings: formatUserInfo(followings),
    followers: formatUserInfo(followers),
    tells: formatTellList(tells),
    tellsCount: tells.length,
    isFollowing: existingFollow ? true : false,
  };
}

function formatUserInfo(user: UserInfo[]) {
  return user.map(({ id, name, username, image }) => ({
    id,
    name,
    username,
    image,
  }));
}

//  `formatTellList` and `formatTellWithReplyList` have different input shapes but output the same output shape.
export type PrismaTell = Prisma.TellGetPayload<{
  include: {
    reply: {
      include: {
        author: true;
      };
    };
  };
}>;

export function formatTellList(tells: PrismaTell[]) {
  return tells
    .filter((tell) => tell.reply !== null)
    .map((t) => ({
      tellId: t.tellId,
      tellContent: t.tellContent,
      tellAuthorId: t.tellAuthorId,
      tellAuthorUsername: t.tellAuthorUsername,
      tellCreatedAt: t.tellCreatedAt,
      reply: t.reply
        ? {
            replyId: t.reply.replyId,
            replyAuthorId: t.reply.replyAuthorId,
            replyAuthorUsername: t.reply.author.username,
            replyContent: t.reply.replyContent,
            replyAuthorName: t.reply.author.name,
            replyAuthorImage: t.reply.author.image,
            replyCreatedAt: t.reply.replyCreatedAt,
          }
        : null,
    }));
}

type PrismaReply = Prisma.ReplyGetPayload<{
  include: {
    author: true;
    replyTo: true;
  };
}>;

export function formatTellWithReplyList(replies: PrismaReply[]) {
  return replies.map((reply) => ({
    tellId: reply.replyTo.tellId,
    tellContent: reply.replyTo.tellContent,
    tellAuthorId: reply.replyTo.tellAuthorId,
    tellAuthorUsername: reply.replyTo.tellAuthorUsername,
    tellCreatedAt: reply.replyTo.tellCreatedAt,
    reply: reply
      ? {
          replyId: reply.replyId,
          replyContent: reply.replyContent,
          replyAuthorId: reply.replyAuthorId,
          replyAuthorUsername: reply.author.username,
          replyAuthorName: reply.author.name,
          replyAuthorImage: reply.author.image,
          replyCreatedAt: reply.replyCreatedAt,
        }
      : null,
  }));
}

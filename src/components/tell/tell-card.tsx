"use client";

import { createContext, useContext, useMemo } from "react";
import Link from "next/link";
import { TwitterShareButton } from "react-share";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import type { Tell, UserInfo } from "~/types";

import { ContentSchema } from "~/validators";

import {
  cn,
  getProductionURL,
  getTweetContent,
  relativeTime,
} from "~/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { UserAvatar } from "~/components/user/user-avatar";
import { TruncateText } from "~/components/truncate-text";
import { useSession } from "next-auth/react";

import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
} from "~/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteButton } from "./delete-button";
import { useReplyMutation } from "~/hooks/send-reply-mutation";
import { useThemeStore } from "~/store/theme-store";

const TellContext = createContext<
  { tell: Tell; userInfo: UserInfo } | undefined
>(undefined);

function useTellContext() {
  const context = useContext(TellContext);

  if (!context) {
    throw new Error(
      "<TellCardHeader />, <TellCardContent /> & <TellCardFooter /> must be used inside <TellCard />.",
    );
  }

  return context;
}

type TellCardProps = {
  tell: Tell;
  userInfo: UserInfo;
};

export function TellCard({ tell, userInfo }: TellCardProps) {
  const value = useMemo(() => ({ tell, userInfo }), [tell, userInfo]);

  return (
    <TellContext.Provider value={value}>
      <div className="space-y-4 rounded-sm border border-border bg-secondary/30 p-2">
        <TellCardHeader />
        <TellCardContent />
        <TellCardFooter />
      </div>
    </TellContext.Provider>
  );
}

function TellCardHeader() {
  const session = useSession();
  const { tell, userInfo } = useTellContext();

  const hasReply = tell.reply !== null;
  const isSessionUserCard =
    session.data?.user.username === userInfo.username && hasReply;

  return (
    <div className="flex items-center justify-between gap-2">
      {hasReply ? (
        <TellUserInfo />
      ) : (
        <p className="text-muted-foreground">
          {relativeTime(tell.tellCreatedAt)}
        </p>
      )}
      {isSessionUserCard && <TellCardOptionsButton />}
    </div>
  );
}

function TellUserInfo() {
  const { tell, userInfo } = useTellContext();

  return (
    <div className="flex items-center gap-2">
      <UserAvatar
        className="h-8 w-8 rounded-full"
        image={userInfo.image}
        name={userInfo.name}
      />
      <div>
        <Link href={`/${userInfo.username}`}>@{userInfo.username}</Link>
        {tell.reply && (
          <p className="text-muted-foreground">
            {relativeTime(tell.reply.replyCreatedAt)}
          </p>
        )}
      </div>
    </div>
  );
}

function TellCardOptionsButton() {
  const { tell, userInfo } = useTellContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group flex items-center gap-1"
          size="sm"
        >
          <div className="size-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
          <div className="size-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
          <div className="size-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <TwitterShareButton
            url={getProductionURL(userInfo.username)}
            title={getTweetContent({
              tellContent: tell.tellContent,
              replyContent: tell.reply?.replyContent,
            })}
            className="rounded-md"
          >
            <Button variant="ghost">Share on Twitter</Button>
          </TwitterShareButton>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          {tell?.reply && <DeleteButton replyId={tell.reply.replyId} />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TellCardContent() {
  const { tell } = useTellContext();

  return (
    <div className="space-y-4">
      <div className="border-l-4 border-l-secondary px-4 py-1">
        {tell.tellAuthorUsername ? (
          <Link
            href={`/${encodeURIComponent(tell.tellAuthorUsername)}`}
            className="text-muted-foreground"
          >
            Sent by @{tell.tellAuthorUsername}
          </Link>
        ) : (
          <p className="text-muted-foreground">Sent anonymously</p>
        )}
        <p>{tell.tellContent}</p>
      </div>
      {tell.reply && <p>{tell.reply.replyContent}</p>}
    </div>
  );
}

function TellCardFooter() {
  const { tell } = useTellContext();

  if (tell.reply) return null;

  return <TellReplyDrawer />;
}

function TellReplyDrawer() {
  const { tell } = useTellContext();
  const { mutate, isLoading } = useReplyMutation();
  const theme = useThemeStore((state) => state.theme);

  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit({ content }: z.infer<typeof ContentSchema>) {
    mutate({
      tellId: tell.tellId,
      replyContent: content,
    });
  }

  return (
    <div className="flex items-center justify-end">
      <Drawer>
        <DrawerTrigger>
          <Button className="rounded-md">Answer</Button>
        </DrawerTrigger>
        <DrawerContent className={cn("h-[90%] px-4", theme.className)}>
          <div className="mx-auto w-full max-w-[600px] space-y-6 pt-10">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {relativeTime(tell.tellCreatedAt)}
              </p>
              <div className="border-l-4 border-l-secondary px-4 py-1">
                {tell.tellAuthorUsername ? (
                  <Link
                    href={`/${tell.tellAuthorUsername}`}
                    className="text-muted-foreground"
                  >
                    Sent by @{tell.tellAuthorUsername}
                  </Link>
                ) : (
                  <p className="text-muted-foreground">Sent anonymously</p>
                )}
                <TruncateText text={tell.tellContent} />
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex flex-col text-base">
                      <FormControl>
                        <Textarea
                          placeholder="Write your reply..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your reply and the &quot;Tell&quot; will be visible to
                        the public upon submission.
                      </FormDescription>
                      <FormMessage />
                      <div className="flex items-center gap-2 self-end">
                        <DrawerClose>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => form.reset()}
                          >
                            Cancel
                          </Button>
                        </DrawerClose>
                        <Button
                          type="submit"
                          className="self-end"
                          disabled={isLoading}
                        >
                          Reply
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

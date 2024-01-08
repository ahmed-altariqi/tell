"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { ContentSchema } from "~/validators";
import { useTellMutation } from "~/hooks/send-tell-mutation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

import { UserAvatar } from "~/components/user/user-avatar";
import { EyeIcon } from "~/components/eye-icon";

type TellFormProps = { recipientId: string };

export function SendTellForm({ recipientId }: TellFormProps) {
  const session = useSession();
  const [isAnonymous, setIsAnonymous] = useState<boolean>(() =>
    session.status === "authenticated" ? false : true,
  );

  const sessionAuthorUsername = session.data?.user.username ?? "";
  const sessionAuthorId = session.data?.user.id ?? "";

  const form = useForm<z.infer<typeof ContentSchema>>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      content: "",
    },
  });
  const { mutate, isLoading } = useTellMutation();

  function onSubmit({ content }: z.infer<typeof ContentSchema>) {
    mutate({
      tellContent: content,
      tellRecipientId: recipientId,
      tellAuthorUsername: isAnonymous ? null : sessionAuthorUsername,
      tellAuthorId: isAnonymous ? null : sessionAuthorId,
    });
  }

  const name = session?.data?.user?.name;
  const image = session?.data?.user?.image;

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col text-base">
                <FormControl>
                  <Textarea placeholder="Ask me something..." {...field} />
                </FormControl>
                <FormMessage />
                <div className="flex items-center justify-between">
                  <Switch
                    id="anonymous-switch"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                    disabled={session.status === "unauthenticated"}
                  >
                    <span className="flex items-center justify-center">
                      {isAnonymous && <EyeIcon />}

                      {!isAnonymous && name && image && (
                        <UserAvatar
                          name={name}
                          image={image}
                          className="size-6 rounded-full"
                        />
                      )}
                    </span>
                  </Switch>

                  <Label htmlFor="anonymous-switch">
                    {isAnonymous ? "Send anonymously" : `Send as ${name}`}
                  </Label>

                  <Button type="submit" disabled={isLoading}>
                    Send
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

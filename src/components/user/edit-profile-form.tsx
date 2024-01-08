"use client";

import type { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import { UploadButton } from "~/lib/uploadthing";
import { EditUserInfoSchema } from "~/validators";

import { doesUserExists } from "~/actions/user";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { ButtonWithLoader } from "~/components/ui/button-with-loader";
import { Input } from "~/components/ui/input";
import { ThemeSelector } from "~/components/theme-selector";
import { useToast } from "~/components/ui/use-toast";
import { UserAvatar } from "~/components/user/user-avatar";

type ImageUploadState = {
  status: "idle" | "loading" | "error";
  error: string | null;
  imageUrl: string | undefined;
};

export function EditProfileForm() {
  const { toast } = useToast();
  const { data } = useSession();

  const sessionName = data?.user.name ?? "";
  const sessionUsername = data?.user.username ?? "";
  const sessionImage = data?.user.image ?? undefined;

  const [{ status, error, imageUrl }, setImageUplState] =
    useState<ImageUploadState>({
      status: "idle",
      error: null,
      imageUrl: sessionImage ?? undefined,
    });

  const form = useForm<z.infer<typeof EditUserInfoSchema>>({
    resolver: zodResolver(EditUserInfoSchema),
    defaultValues: {
      name: sessionName,
      username: sessionUsername,
    },
  });

  const editMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast({ description: "Profile was updated." });
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const isLoading = form.formState.isSubmitting || status === "loading";

  async function onSubmit({
    name,
    username,
  }: z.infer<typeof EditUserInfoSchema>) {
    const userExists = await doesUserExists({ username });

    if (userExists && username !== sessionUsername) {
      form.setError("username", {
        message: "Username already exists. Try something else.",
      });
    } else {
      editMutation.mutate({
        image: imageUrl ?? "",
        name,
        username,
        currentUsername: sessionUsername,
      });
    }
  }
  return (
    <div>
      <div className="mb-12 flex flex-col items-center">
        <div className="flex w-32 flex-col items-center justify-center overflow-hidden rounded-md">
          <UserAvatar
            image={imageUrl}
            name={sessionName}
            className="h-full w-full rounded-t-md"
          />
          <UploadButton
            className="rounded-b-md"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUplState((current) => ({
                ...current,
                status: "idle",
                imageUrl: res[0]?.url,
              }));
            }}
            onUploadError={(error: Error) => {
              setImageUplState((current) => ({
                ...current,
                status: "error",
                error: error.message,
              }));
            }}
            onUploadProgress={() => {
              setImageUplState((current) => ({
                ...current,
                status: "loading",
              }));
            }}
            appearance={{
              button: {
                background: "#d9c9fc4f",
                color: "white",
                padding: "0",
              },
              allowedContent: "hidden",
            }}
          />
        </div>
        {error && <p className="pt-3 text-destructive">{error}</p>}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col text-base">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col text-base">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ThemeSelector />

          <div className="flex items-center justify-end gap-2">
            <Button
              type="reset"
              variant="secondary"
              onClick={() => {
                form.reset();
                setImageUplState((current) => ({
                  ...current,
                  imageUrl: sessionImage,
                }));
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <ButtonWithLoader
              label="Save"
              isLoading={isLoading}
              className="self-end"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

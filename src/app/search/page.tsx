"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

import { SearchSchema } from "~/validators";

import { useSearch } from "~/hooks/search-user";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { UserList } from "~/components/user/user-list";

export default function SearchPage() {
  const { data, isLoading, isInitialMount, setSearchState } = useSearch();

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit({ query }: z.infer<typeof SearchSchema>) {
    setSearchState({ query, isInitialMount: false });
  }

  return (
    <div className="mx-auto flex w-full max-w-[550px] flex-col items-center gap-10 py-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="text-base">
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      placeholder="Search by name or username"
                      autoFocus
                      {...field}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="absolute right-4"
                      asChild
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  To search by username, use the &quot;@&quot; symbol (e.g.,
                  @ahmed). Omit the &quot;@&quot; to search by name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {isLoading && !isInitialMount && (
        <div className="flex w-full flex-col gap-y-3">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
      )}

      {isInitialMount === false && data === null && (
        <p className="text-xl font-semibold text-destructive">
          User was not found
        </p>
      )}

      {data && <UserList users={data} />}
    </div>
  );
}

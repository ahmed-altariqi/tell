"use client";

import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function useDeleteReplyMutation() {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isLoading } = api.tell.delete.useMutation({
    onSuccess: () => {
      toast({ description: "Reply was successfully deleted." });
      router.refresh();
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { mutate, isLoading };
}

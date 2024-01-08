import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function useReplyMutation() {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isLoading } = api.tell.reply.useMutation({
    onSuccess: () => {
      toast({ description: "Reply was successfully sent." });
      router.refresh();
    },
    onError: () =>
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      }),
  });

  return { mutate, isLoading };
}

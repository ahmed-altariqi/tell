import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function useTellMutation() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isLoading } = api.tell.send.useMutation({
    onSuccess: () => {
      toast({ description: "Tell was successfully sent." });
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

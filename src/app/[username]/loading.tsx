import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full space-y-12">
      <div className="flex w-full flex-col items-center justify-center gap-y-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-12 rounded-md" />
          <Skeleton className="h-8 w-12 rounded-md" />
          <Skeleton className="h-8 w-12 rounded-md" />
        </div>
      </div>
      <div className="w-full space-y-4">
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
        <Skeleton className="h-16 w-full rounded-md" />
      </div>
    </div>
  );
}

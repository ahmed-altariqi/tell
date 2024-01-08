import { cn } from "~/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type UserAvatarProps = {
  name: string | null | undefined;
  image: string | null | undefined;
  className?: string;
};

export function UserAvatar({ image, name, className = "" }: UserAvatarProps) {
  return (
    <Avatar className={cn("size-20", className)}>
      <AvatarImage src={image ?? undefined} />
      <AvatarFallback>
        {name?.split("")[0]?.toUpperCase() ?? (
          <span className="flex items-center justify-center">👻</span>
        )}
      </AvatarFallback>
    </Avatar>
  );
}

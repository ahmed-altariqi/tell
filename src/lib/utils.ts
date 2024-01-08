import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

import { env } from "~/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const relativeTime = (date: Date | undefined) => {
  if (!date) return;

  return formatDistanceToNow(date, { addSuffix: true });
};

export function getProductionURL(username: string | undefined) {
  return `${env.NEXT_PUBLIC_PRODUCTION_URL}/${username ?? ""}`;
}

const POSSIBLE_URL_LENGTH = 50;
const TWEET_CHARACTERS_LENGTH_LIMIT = POSSIBLE_URL_LENGTH + 190;
const MAX_CONTENT_LENGTH = 120;
const SEPARATOR = " — ";
const ELLIPSIS = "...";

export function getTweetContent({
  tellContent,
  replyContent = "",
}: {
  tellContent: string;
  replyContent: string | undefined;
}) {
  const trimmedTellContent =
    tellContent.length >= MAX_CONTENT_LENGTH
      ? `${tellContent.slice(0, MAX_CONTENT_LENGTH)}${ELLIPSIS}`
      : tellContent;

  const replyContentAvailableSpace =
    TWEET_CHARACTERS_LENGTH_LIMIT -
    trimmedTellContent.length -
    SEPARATOR.length;

  const replyContentEllipsis =
    replyContent.length > replyContentAvailableSpace ? ELLIPSIS : "";

  return `${trimmedTellContent}${SEPARATOR}${replyContent.slice(
    0,
    replyContentAvailableSpace,
  )}${replyContentEllipsis}`;
}

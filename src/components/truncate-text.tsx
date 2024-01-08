"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";

const MAX_CONTENT_LENGTH = 150;

type TruncateTextProps = {
  text: string;
};

export function TruncateText({ text }: TruncateTextProps) {
  const [shouldTruncate, setShouldTruncated] = useState(() =>
    text.length > MAX_CONTENT_LENGTH ? true : false,
  );

  const content = shouldTruncate
    ? `${text.slice(0, MAX_CONTENT_LENGTH)}...`
    : text;

  return (
    <div className="space-y-2">
      <p className={shouldTruncate ? "truncate" : ""}>{content}</p>
      {text.length > MAX_CONTENT_LENGTH && (
        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => setShouldTruncated((s) => !s)}
        >
          {shouldTruncate ? "Show More" : "Show Less"}
        </Button>
      )}
    </div>
  );
}

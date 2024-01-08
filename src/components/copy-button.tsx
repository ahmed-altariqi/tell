"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "~/components/ui/button";
import { CustomTooltip } from "~/components/ui/custom-tooltip";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    if (isCopied) {
      timeoutId = window.setTimeout(() => setIsCopied(false), 2000);
    }

    return () => window.clearTimeout(timeoutId);
  }, [isCopied, setIsCopied]);

  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  const icon = isCopied ? <Check /> : <Copy />;
  label = isCopied ? "copied" : label;

  return (
    <CustomTooltip label={isCopied ? "copied" : "copy"}>
      <Button variant="outline" onClick={handleCopyClick}>
        <div className="flex items-center gap-2">
          {label} {icon}
        </div>
      </Button>
    </CustomTooltip>
  );
}

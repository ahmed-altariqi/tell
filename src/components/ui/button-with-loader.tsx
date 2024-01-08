"use client";

import { Loader } from "lucide-react";

import { Button, type ButtonProps } from "~/components/ui/button";

import { cn } from "~/lib/utils";

type ButtonWithLoaderProps = {
  label: string;
  isLoading: boolean;
  className?: string;
} & ButtonProps;

export const ButtonWithLoader = ({
  label,
  isLoading,
  className,
  ...props
}: ButtonWithLoaderProps) => {
  return (
    <Button
      disabled={isLoading}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <span>{label}</span>
      {isLoading && <Loader className="size-4 animate-spin" />}
    </Button>
  );
};

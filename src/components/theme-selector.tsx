"use client";

import { useThemeStore } from "~/store/theme-store";
import { type ThemeClassName, themes } from "~/constants";

import { Button } from "~/components/ui/button";

export function ThemeSelector() {
  const setThemeClassName = useThemeStore((s) => s.setThemeClassName);

  function changeTheme({ className }: { className: ThemeClassName }) {
    setThemeClassName(className);
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold">Theme</p>
      <div className="flex items-center gap-2">
        {Object.values(themes).map(({ className, primaryColor }) => (
          <Button
            key={className}
            onClick={() => changeTheme({ className })}
            type="button"
            variant="outline"
          >
            <span
              style={{
                background: `hsl(${primaryColor})`,
              }}
              className="size-4 rounded-md sm:size-5"
            ></span>
          </Button>
        ))}
      </div>
    </div>
  );
}

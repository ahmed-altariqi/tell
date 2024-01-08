"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themes, type ThemeClassName } from "~/constants";

export type Theme = {
  className: ThemeClassName;
  primaryColor: `${string} ${string}% ${string}%`;
};

type ThemeState = {
  theme: Theme;
};

type ThemeAction = {
  setThemeClassName: (className: ThemeClassName) => void;
};

export const useThemeStore = create<ThemeState & ThemeAction>()(
  persist(
    (set, get) => ({
      theme: {
        className: get()?.theme?.className ?? "theme-violet",
        primaryColor: get()?.theme?.primaryColor ?? "250.36 90.16% 76.08%",
      },

      setThemeClassName: (className) => {
        const primaryColor = themes[className].primaryColor;

        set((s) => ({ ...s, theme: { className, primaryColor } }));
      },
    }),
    {
      name: "__tell_theme__",
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);

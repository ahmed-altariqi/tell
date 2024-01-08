import { type LucideIcon, Home, Inbox, Search, User } from "lucide-react";

// routes
type Routes = {
  label: string;
  path: string;
  Icon: LucideIcon;
}[];

export const routes: Routes = [
  {
    label: "Feed",
    path: "/",
    Icon: Home,
  },
  {
    label: "Search",
    path: "/search",
    Icon: Search,
  },
  {
    label: "Tells",
    path: "/tells",
    Icon: Inbox,
  },
  {
    label: "Profile",
    path: "/profile",
    Icon: User,
  },
];

// theme
export const themes = {
  "theme-blue": {
    className: "theme-blue",
    primaryColor: "226 100% 80.43%",
  },
  "theme-violet": {
    className: "theme-violet",
    primaryColor: "250.36 90.16% 76.08%",
  },
  "theme-coral": {
    className: "theme-coral",
    primaryColor: "0 100% 77.05%",
  },
  "theme-green": {
    className: "theme-green",
    primaryColor: "123 100% 76.08%",
  },
  "theme-tellonym": {
    className: "theme-tellonym",
    primaryColor: "333.82 81% 50%",
  },
  "theme-tertiary": {
    className: "theme-tertiary",
    primaryColor: "280 100% 85%",
  },
} as const;

export type ThemeName = keyof typeof themes extends `theme-${infer Color}`
  ? Color
  : never;

export type ThemeClassName = `theme-${ThemeName}`;

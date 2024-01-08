"use client";

import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  close: () => void;
  onOpenChange: (isOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  close: () => set({ isOpen: false }),
  onOpenChange: (isOpen) => set({ isOpen }),
}));

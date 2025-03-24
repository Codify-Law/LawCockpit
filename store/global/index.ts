import { create } from "zustand";
import { GlobalState } from "./types";
import StorageService from "@/lib/storage";

export const useGlobalStore = create<GlobalState>((set) => ({
  // Initial profile state is null
  profile: null,

  // Set a new profile
  setProfile: (profile) => set({ profile }),

  // Clear the current profile by setting it to null
  clearProfile: () => set({ profile: null }),

  signOut: () => {
    const storage = new StorageService();
    storage.delete("authorizationToken");
    set({ profile: null });
    window.location.reload();
  },
}));

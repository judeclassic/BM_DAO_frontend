import { IRaiderAccount } from "@/lib/types/raider/raider.interface";
import { create } from "zustand";

interface RaiderAccountData {
  raiderAccount?: IRaiderAccount;
}

interface RaiderAccountStore extends RaiderAccountData {
    setRaiderAccount: (raiderAccount: IRaiderAccount) => void;
    updateRaiderAccount: (raiderAccount: Partial<IRaiderAccount>) => void;
    clearRaiderAccount: () => void;
}

export const useRaiderAccountStore = create<RaiderAccountStore>((set) => ({
    isLoading: true,
    raiderAccount: undefined,
    setRaiderAccount: (raiderAccount) => set((state) => ({ ...state, raiderAccount })),
    updateRaiderAccount: (raiderAccount) => set((state) => {
        const newRaiderAccount = { ...state.raiderAccount, ...raiderAccount } as IRaiderAccount;
        return { ...state, raiderAccount: newRaiderAccount };
    }),
    clearRaiderAccount: () => set((state) => ({ ...state, raiderAccount: undefined })),
}));
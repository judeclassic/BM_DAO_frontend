import { IModeratorAccount } from "@/lib/types/moderator/moderator.interface";
import { create } from "zustand";

interface ModeratorAccountData {
  moderatorAccount?: IModeratorAccount;
}

interface ModeratorAccountStore extends ModeratorAccountData {
    setModeratorAccount: (ModeratorAccount: IModeratorAccount) => void;
    updateModeratorAccount: (ModeratorAccount: Partial<IModeratorAccount>) => void;
    clearModeratorAccount: () => void;
}

export const useModeratorAccountStore = create<ModeratorAccountStore>((set) => ({
    isLoading: true,
    moderatorAccount: undefined,
    setModeratorAccount: (moderatorAccount) => set((state) => ({ ...state, moderatorAccount })),
    updateModeratorAccount: (moderatorAccount) => set((state) => {
        const newModeratorAccount = { ...state.moderatorAccount, ...moderatorAccount } as IModeratorAccount;
        return { ...state, moderatorAccount: newModeratorAccount };
    }),
    clearModeratorAccount: () => set((state) => ({ ...state, moderatorAccount: undefined })),
}));
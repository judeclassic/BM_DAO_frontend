import { create } from "zustand";
import { IUser } from "../types/user/user.interface";

interface UserData {
  user?: IUser;
  isLoading: boolean
}

interface UserStore extends UserData {
    setLoading: (state: boolean) => void;
    setUser: (user: IUser) => void;
    updateUser: (user: Partial<IUser>) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isLoading: false,
    user: undefined,
    setLoading: (isLoading) => set((state) => ({ ...state, isLoading})),
    setUser: (user) => set((state) => ({ ...state, user, isLoading: false })),
    updateUser: (user) => set((state) => {
        const newUser = { ...state.user, ...user } as IUser;
        return { ...state, user: newUser, isLoading: false };
    }),
    clearUser: () => set((state) => ({ ...state, user: undefined })),
}));
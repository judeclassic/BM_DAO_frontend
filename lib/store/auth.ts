
import { create } from "zustand";
import IError from "../types/error";

type PasswordState = 'start' | 'confirm' | 'change';

interface AuthData {
    isLoading: boolean;
    errors: IError[];
    recoveryData: {
      email_address?: string;
      token?: string,
      passwordState: PasswordState;
    }
}

interface AuthStore extends AuthData {
    setLoading: (state: boolean) => void;
    setErrors: (user: IError[]) => void;
    updateRecovery: (data: AuthData['recoveryData']) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoading: false,
    errors: [],
    recoveryData: { passwordState: 'start' },
    setLoading: (isLoading) => set((state) => ({ ...state, isLoading})),
    setErrors: (errors) => set((state) => ({ ...state, errors, isLoading: false })),
    updateRecovery: (recoveryData) => set((state) => ({ ...state, recoveryData })),
}));
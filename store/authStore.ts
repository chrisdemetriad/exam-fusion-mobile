import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

interface AuthState {
	session: Session | null;
	isLoading: boolean;
	setSession: (session: Session | null) => void;
	setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	session: null,
	isLoading: true,
	setSession: (session) => set({ session }),
	setLoading: (loading) => set({ isLoading: loading }),
}));

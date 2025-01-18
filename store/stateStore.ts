import type { Tests } from "@lib/api/fetchTests";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AnswerSummary {
	id: number;
	question: string;
	userAnswer: string[];
	answer: string[];
	isCorrect: boolean;
}

interface TestState {
	answers: AnswerSummary[];
	duration: number;
	reportModalOpen: boolean;
	baseUrl: string;
	currentTest: Tests | null;
	addAnswer: (answer: AnswerSummary) => void;
	resetTest: () => void;
	setDuration: (time: number) => void;
	resetDuration: () => void;
	setCurrentTest: (test: Tests) => void;
	openReportModal: () => void;
	closeReportModal: () => void;
}

export const useTestStore = create<TestState>()(
	persist(
		(set) => ({
			answers: [],
			duration: 0,
			authModalOpen: false,
			reportModalOpen: false,
			baseUrl: (process.env.NODE_ENV === "production"
				? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
				: process.env.NEXT_PUBLIC_API_URL_LOCAL) as string,
			currentTest: null,
			addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
			resetTest: () => set({ answers: [] }),
			setDuration: (time) => set({ duration: time }),
			resetDuration: () => set({ duration: 0 }),
			setCurrentTest: (test) => set({ currentTest: test }),
			openReportModal: () => set({ reportModalOpen: true }),
			closeReportModal: () => set({ reportModalOpen: false }),
		}),
		{
			name: "exam-fusion-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

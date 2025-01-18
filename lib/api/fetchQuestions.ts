import type { QuestionsResponse } from "@components/Questions";

const baseUrl = "https://exam-fusion-api.vercel.app";

export const fetchQuestions = async ({
	provider,
	testId,
	questionsNumber,
}: {
	provider: string;
	testId: string;
	questionsNumber: number;
}): Promise<QuestionsResponse> => {
	const url = `${baseUrl}/api/v1/tests/${provider}/${testId}?limit=${questionsNumber}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Couldn't fetch questions ${response.statusText}`);
	}

	const json: QuestionsResponse = await response.json();
	return json;
};

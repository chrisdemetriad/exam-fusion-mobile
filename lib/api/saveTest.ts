export interface TestData {
	testId: string;
	userId: string;
	startTime: Date | null;
	finishTime: Date;
	score: number;
	number: number;
	wrong: {
		questionId: number;
		question: string;
		answer: string[];
	}[];
}
const baseUrl = "https://exam-fusion-api.vercel.app";

export const saveTest = async ({
	provider,
	testId,
	testData,
}: {
	provider: string;
	testId: string;
	testData: TestData;
}): Promise<void> => {
	const url = `${baseUrl}/api/v1/tests/${provider}/${testId}/attempt`;
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(testData),
	});

	if (!response.ok) {
		throw new Error(`Couldn't save the test ${response.statusText}`);
	}
};

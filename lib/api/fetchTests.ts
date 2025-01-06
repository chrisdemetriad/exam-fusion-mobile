export interface TestData {
	_id: string;
	provider: string;
	level: string;
	title: string;
	description: string;
}

export const fetchTests = async (): Promise<TestData> => {
	const baseUrl = "https://exam-fusion-api.vercel.app";
	const url = `${baseUrl}/api/v1/tests/all`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Couldn't fetch tests ${response.statusText}`);
	}

	const json = await response.json();
	return json;
};

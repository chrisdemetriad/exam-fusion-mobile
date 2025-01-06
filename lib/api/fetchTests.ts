export const fetchTests = async () => {
	const baseUrl = "https://exam-fusion-api.vercel.app";
	const url = `${baseUrl}/api/v1/tests/all`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Couldn't fetch tests`);
	}

	const json = await response.json();
	return json;
};

export interface MostTests {
	_id: string;
	testCount: number;
}

export interface Scores {
	_id: string;
	bestScore: number;
	averageScore: number;
}

export interface Times {
	_id: string;
	bestTime: number;
	averageTime: number;
}

export interface LeaderboardData {
	mostTests: MostTests[];
	scores: Scores[];
	times: Times[];
}

export const fetchLeaderboards = async (): Promise<LeaderboardData> => {
	const baseUrl = "https://exam-fusion-api.vercel.app";
	const url = `${baseUrl}/api/v1/tests/leaderboard`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Couldn't fetch leaderboards ${response.statusText}`);
	}

	const json = await response.json();
	return json;
};

import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import {
	fetchLeaderboards,
	type LeaderboardData,
} from "@lib/api/fetchLeaderboards";
import { useAuthStore } from "@store/authStore";

const Leaderboard = () => {
	const { session } = useAuthStore();
	const [selectedCategory, setSelectedCategory] =
		useState<keyof LeaderboardData>("mostTests");

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["leaderboard", selectedCategory],
		queryFn: () => fetchLeaderboards(),
		enabled: !!session,
	});

	if (isLoading) return <ActivityIndicator size="large" />;
	if (isError) return <Text>Error: {error?.message}</Text>;
	if (!data || !Array.isArray(data[selectedCategory])) {
		return <Text>No data available for this category</Text>;
	}

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginBottom: 16,
				}}
			>
				{(["mostTests", "scores", "times"] as (keyof LeaderboardData)[]).map(
					(category) => (
						<TouchableOpacity
							key={category}
							onPress={() => setSelectedCategory(category)}
							style={{
								padding: 8,
								backgroundColor:
									selectedCategory === category ? "#007AFF" : "#E5E5E5",
								borderRadius: 8,
							}}
						>
							<Text
								style={{
									color: selectedCategory === category ? "white" : "black",
								}}
							>
								{category === "mostTests"
									? "Most Tests"
									: category === "scores"
										? "Scores"
										: "Times"}
							</Text>
						</TouchableOpacity>
					),
				)}
			</View>

			<FlatList
				data={data[selectedCategory]}
				keyExtractor={(item) => item._id}
				renderItem={({ item, index }) => (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 8,
							borderBottomWidth: 1,
							borderBottomColor: "#ddd",
						}}
					>
						<Text style={{ fontWeight: "bold", marginRight: 8 }}>
							{index + 1}.
						</Text>
						<Text style={{ flex: 1 }}>{item._id}</Text>
						<Text>
							{selectedCategory === "mostTests" &&
								`${item.testCount} tests taken`}
							{selectedCategory === "scores" &&
								`${(item.averageScore || 0).toFixed(2)} avg score`}
							{selectedCategory === "times" &&
								`${((item.averageTime || 0) / 1000).toFixed(2)}s avg time`}
						</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default Leaderboard;

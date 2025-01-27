import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Collapsible from "react-native-collapsible";
import { useRouter } from "expo-router";
import { useTestStore } from "@store/stateStore";

const SummaryScreen = () => {
	const store = useTestStore();
	const router = useRouter();
	const { answers, duration } = store;
	const count = answers.filter((a) => a.isCorrect).length;
	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
				Summary
			</Text>
			<Text>
				You've answered {count} questions correctly out of {answers.length} in{" "}
				{duration} seconds.
			</Text>
			<FlatList
				data={answers}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item }) => (
					<View
						style={{
							padding: 10,
							marginVertical: 5,
							borderWidth: 1,
							borderRadius: 5,
							borderColor: "#ddd",
							backgroundColor: "#f9f9f9",
						}}
					>
						<TouchableOpacity
							onPress={() =>
								setExpanded((prev) => ({
									...prev,
									[item.id]: !prev[item.id],
								}))
							}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Text>
									{item.id}. {item.question}
								</Text>
								<Text style={{ color: item.isCorrect ? "green" : "red" }}>
									{item.isCorrect ? "✓" : "✗"}
								</Text>
							</View>
						</TouchableOpacity>
						<Collapsible collapsed={!expanded[item.id]}>
							{!item.isCorrect ? (
								<>
									<Text
										style={{ color: "red", textDecorationLine: "line-through" }}
									>
										{item.userAnswer.join(", ")}
									</Text>
									<Text style={{ color: "green" }}>
										{item.answer.join(", ")}
									</Text>
								</>
							) : (
								<Text style={{ color: "green" }}>{item.answer.join(", ")}</Text>
							)}
						</Collapsible>
					</View>
				)}
			/>
			<TouchableOpacity
				style={{
					marginTop: 20,
					backgroundColor: "blue",
					padding: 15,
					borderRadius: 5,
					alignItems: "center",
				}}
				onPress={() => router.push("/practice")}
			>
				<Text style={{ color: "white", fontWeight: "bold" }}>
					Start new test
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SummaryScreen;

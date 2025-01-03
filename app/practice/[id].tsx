import { View, Text } from "react-native";
import React from "react";

import { Stack, useLocalSearchParams } from "expo-router";

const TestPage = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Stack.Screen options={{ headerTitle: "Test" }} />
			<Text>Test {id}</Text>
		</View>
	);
};

export default TestPage;

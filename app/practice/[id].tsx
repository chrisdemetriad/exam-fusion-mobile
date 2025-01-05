import { View, Text } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

const Test = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Stack.Screen options={{ headerTitle: "Test" }} />
			<Text>Test {id}</Text>
		</View>
	);
};

export default Test;

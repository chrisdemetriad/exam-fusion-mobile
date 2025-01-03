import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

const practice = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Link href="/practice/1">Test 1</Link>
			<Link href="/practice/2">Test 2</Link>
			<Link href="/practice/3">Test 3</Link>
		</View>
	);
};

export default practice;

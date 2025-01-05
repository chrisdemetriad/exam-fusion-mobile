import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { fetchTests } from "../../api/fetchTests";
import { useQuery } from "@tanstack/react-query";

export interface TestData {
	_id: string;
	provider: string;
	level: string;
	title: string;
	description: string;
}

const practice = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["tests"],
		queryFn: fetchTests,
	});

	if (isLoading) return <ActivityIndicator />;
	if (isError) return <Text>Error: {error?.message}</Text>;
	if (!data) return <Text>There aren't any tests available</Text>;

	return (
		<View>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View>
						<Link href="/practice/1">{item.title}</Link>
					</View>
				)}
			/>
		</View>
	);
};

export default practice;

import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { fetchTests } from "@lib/api/fetchTests";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@store/authStore";

const practice = () => {
	const { session } = useAuthStore();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["tests"],
		queryFn: fetchTests,
		enabled: !!session,
	});

	if (isLoading) return <ActivityIndicator size="large" color="blue" />;
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

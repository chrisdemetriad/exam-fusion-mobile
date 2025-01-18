import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchTests, type Tests } from "@lib/api/fetchTests";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@store/authStore";
import { useTestStore } from "@store/stateStore";

const tests = () => {
	const { session } = useAuthStore();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["tests"],
		queryFn: fetchTests,
		enabled: !!session,
	});

	const setSelectedTest = useTestStore((state) => state.setCurrentTest);
	const router = useRouter();

	if (isLoading) return <ActivityIndicator size="large" color="blue" />;
	if (isError) return <Text>Error: {error?.message}</Text>;
	if (!data) return <Text>There aren't any tests available</Text>;

	const handleRowClick = (test: Tests) => {
		setSelectedTest(test);
		router.push(`/practice/${test.provider}/${test._id}`);
	};

	return (
		<View>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => handleRowClick(item)}
						style={{ padding: 10 }}
					>
						<Text>
							{item.title} - {item.provider} - {item.level} - {item.description}
						</Text>
					</Pressable>
				)}
			/>
		</View>
	);
};

export default tests;

import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const StackLayout = () => {
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</QueryClientProvider>
	);
};

export default StackLayout;

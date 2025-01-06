import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { supabase } from "@lib/supabase";
import { useAuthStore } from "@store/authStore";
import { View } from "react-native";

const StackLayout = () => {
	const { setSession, setLoading } = useAuthStore();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<View
				style={{
					flex: 1,
					backgroundColor: "#f0f0f0",
				}}
			>
				<Stack
					screenOptions={{
						headerStyle: { backgroundColor: "#f0f0f0" },
						contentStyle: { backgroundColor: "#f0f0f0" },
					}}
				>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</View>
		</QueryClientProvider>
	);
};

export default StackLayout;

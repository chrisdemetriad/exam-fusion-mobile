import { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-url-polyfill/auto";
import { supabase } from "@lib/supabase";
import { useAuthStore } from "@store/authStore";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";

const StackLayout = () => {
	const { setSession, setLoading } = useAuthStore();
	const [fontsLoaded] = useFonts({
		"Mulish-Regular": require("../assets/fonts/Mulish-Regular.ttf"),
		"Comfortaa-Regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
	});

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
	}, [setSession, setLoading]);

	const client = new QueryClient();

	if (!fontsLoaded) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#f0f0f0",
				}}
			>
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

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
						headerTitleStyle: {
							fontFamily: "Mulish-Regular",
						},
					}}
				>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="settings"
						options={{
							title: "Settings",
							headerBackTitle: "Go back",
						}}
					/>
				</Stack>
			</View>
		</QueryClientProvider>
	);
};

export default StackLayout;

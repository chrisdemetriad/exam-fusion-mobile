import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-url-polyfill/auto";
import { useEffect } from "react";
import { supabase } from "@lib/supabase";
import { useAuthStore } from "@store/authStore";

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
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</QueryClientProvider>
	);
};

export default StackLayout;

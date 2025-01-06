import { View, Text } from "react-native";
import { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@store/authStore";

const home = () => {
	const { session } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			router.replace("/");
		}
	}, [session]);

	if (!session) return null;

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ fontSize: 24, fontWeight: "bold" }}>Home</Text>
			<Link href="/settings">Settings</Link>
		</View>
	);
};

export default home;

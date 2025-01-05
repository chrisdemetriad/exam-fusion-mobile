import { View } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "../../../store/authStore";

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
			<Link href="home/settings">Settings</Link>
		</View>
	);
};

export default home;

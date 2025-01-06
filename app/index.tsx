import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import Auth from "@components/auth";
import { useAuthStore } from "@store/authStore";

const index = () => {
	const { session } = useAuthStore();
	const router = useRouter();

	const handleSkip = () => {
		if (!session) {
			alert("Please login first");
			return;
		}
		router.push("/practice");
	};

	return (
		<View>
			<Auth />
			<Link
				href="/practice"
				onPress={(e) => {
					e.preventDefault();
					handleSkip();
				}}
			>
				Skip
			</Link>
		</View>
	);
};

export default index;

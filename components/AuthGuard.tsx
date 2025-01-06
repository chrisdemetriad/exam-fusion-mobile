import { useEffect, type FC, type ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@store/authStore";

interface AuthGuardProps {
	children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
	const { session, isLoading } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !session) {
			router.replace("/");
		}
	}, [session, isLoading]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!session) {
		return null;
	}

	return <>{children}</>;
};

export default AuthGuard;

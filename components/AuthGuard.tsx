import { useEffect, type FC, type ReactNode } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useAuthStore } from "@store/authStore";

interface AuthGuardProps {
	children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
	const { session, isLoading } = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();

	const publicRoutes = [
		"/auth/sign-in",
		"/auth/sign-up",
		"/auth/forgot-password",
	];
	const isPublicRoute = publicRoutes.includes(pathname);

	useEffect(() => {
		const handleRedirect = () => {
			if (!isLoading && !session && !isPublicRoute) {
				router.replace("/auth/sign-in");
			}
		};

		handleRedirect();
	}, [session, isLoading, isPublicRoute, router]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ marginBottom: 10 }}>Checking authentication</Text>
				<ActivityIndicator size="large" color="blue" />
			</View>
		);
	}

	if (!session && !isPublicRoute) {
		return null;
	}

	return <>{children}</>;
};

export default AuthGuard;

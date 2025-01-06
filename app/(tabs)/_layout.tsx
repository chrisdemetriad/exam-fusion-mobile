import { Tabs } from "expo-router";
import AuthGuard from "@components/AuthGuard";

export default () => {
	return (
		<AuthGuard>
			<Tabs
				screenOptions={{
					tabBarLabelStyle: {
						textTransform: "uppercase",
					},
					headerTitleStyle: {
						textTransform: "uppercase",
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
					}}
				/>
				<Tabs.Screen
					name="practice"
					options={{
						title: "Practice",
					}}
				/>
				<Tabs.Screen
					name="progress"
					options={{
						title: "Progress",
					}}
				/>
				<Tabs.Screen
					name="leaderboard"
					options={{
						title: "Leaderboard",
					}}
				/>
				<Tabs.Screen
					name="help"
					options={{
						title: "Help",
					}}
				/>
			</Tabs>
		</AuthGuard>
	);
};

import { Tabs } from "expo-router";
import AuthGuard from "@components/AuthGuard";
import Ionicons from "@expo/vector-icons/Ionicons";

export default () => {
	return (
		<AuthGuard>
			<Tabs
				screenOptions={{
					tabBarStyle: {
						paddingHorizontal: 0,
					},
					tabBarLabelStyle: {
						textTransform: "uppercase",
						fontSize: 9,
					},
					tabBarIconStyle: {
						marginBottom: 4,
					},
				}}
			>
				<Tabs.Screen
					name="practice"
					options={{
						title: "Practice",
						tabBarIcon: ({ color }) => (
							<Ionicons name="book-outline" size={18} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="progress"
					options={{
						title: "Progress",
						tabBarIcon: ({ color }) => (
							<Ionicons name="bar-chart-outline" size={18} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="leaderboard"
					options={{
						title: "Leaderboard",
						tabBarIcon: ({ color }) => (
							<Ionicons name="trophy-outline" size={18} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="help"
					options={{
						title: "Help",
						tabBarIcon: ({ color }) => (
							<Ionicons name="help-circle-outline" size={18} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<Ionicons name="settings-outline" size={18} color={color} />
						),
					}}
				/>
			</Tabs>
		</AuthGuard>
	);
};

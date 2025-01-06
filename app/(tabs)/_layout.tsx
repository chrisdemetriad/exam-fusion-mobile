import { router, Tabs } from "expo-router";
import AuthGuard from "@components/AuthGuard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, TouchableOpacity } from "react-native";

export default () => {
	return (
		<AuthGuard>
			<Tabs
				screenOptions={{
					headerStyle: {
						backgroundColor: "#eee",
						borderBottomWidth: 0,
						elevation: 0,
						shadowOpacity: 0,
						// height: 60,
					},
					headerTitleAlign: "left",
					headerTitleStyle: {
						fontSize: 20,
						color: "#333",
					},
					headerRight: () => (
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							{/* <TouchableOpacity
								onPress={() => router.push("/settings")}
								style={{ marginRight: 15 }}
							>
								<Ionicons name="settings-outline" size={24} color="#333" />
							</TouchableOpacity> */}
							<TouchableOpacity
								onPress={() => router.push("/settings")}
								style={{ marginRight: 10 }}
							>
								<Ionicons name="person-outline" size={24} color="#333" />
							</TouchableOpacity>
						</View>
					),
					tabBarStyle: {
						paddingHorizontal: 0,
					},
					tabBarLabelStyle: {
						textTransform: "uppercase",
						fontSize: 10,
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
							<Ionicons name="book-outline" size={20} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="progress"
					options={{
						title: "Progress",
						tabBarIcon: ({ color }) => (
							<Ionicons name="bar-chart-outline" size={20} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="leaderboard"
					options={{
						title: "Leaderboard",
						tabBarIcon: ({ color }) => (
							<Ionicons name="trophy-outline" size={20} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="help"
					options={{
						title: "Help",
						tabBarIcon: ({ color }) => (
							<Ionicons name="help-circle-outline" size={20} color={color} />
						),
					}}
				/>
			</Tabs>
		</AuthGuard>
	);
};

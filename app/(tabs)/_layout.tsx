import { router, Tabs } from "expo-router";
import AuthGuard from "@components/AuthGuard";
import { Icon } from "@rneui/themed";
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
					},
					headerTitleAlign: "left",
					headerTitleStyle: {
						fontSize: 20,
						color: "#333",
					},
					headerRight: () => (
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<TouchableOpacity
								onPress={() => router.push("/settings")}
								style={{ marginRight: 10 }}
							>
								<Icon
									name="person-outline"
									type="ionicon"
									size={24}
									color="#333"
								/>
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
							<Icon
								name="book-outline"
								type="ionicon"
								size={20}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="progress"
					options={{
						title: "Progress",
						tabBarIcon: ({ color }) => (
							<Icon
								name="bar-chart-outline"
								type="ionicon"
								size={20}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="leaderboard"
					options={{
						title: "Leaderboard",
						tabBarIcon: ({ color }) => (
							<Icon
								name="trophy-outline"
								type="ionicon"
								size={20}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="help"
					options={{
						title: "Help",
						tabBarIcon: ({ color }) => (
							<Icon
								name="help-circle-outline"
								type="ionicon"
								size={20}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</AuthGuard>
	);
};

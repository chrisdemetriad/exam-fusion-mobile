import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

const Settings = () => {
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.replace("/");
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Settings</Text>
			<Button title="Log Out" onPress={handleLogout} />
		</View>
	);
};

export default Settings;

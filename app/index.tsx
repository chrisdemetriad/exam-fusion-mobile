import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Auth from "../components/auth";
import type { Session } from "@supabase/supabase-js";

const index = () => {
	const [session, setSession] = useState<Session | null>(null);
	return (
		<View>
			{session?.user && <Text>{session.user.id}</Text>}
			<Auth />
			<Link href="/home">Skip</Link>
		</View>
	);
};

export default index;

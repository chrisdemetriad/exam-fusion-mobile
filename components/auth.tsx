import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";

WebBrowser.maybeCompleteAuthSession();

const createSessionFromUrl = async (url: string) => {
	const { params, errorCode } = QueryParams.getQueryParams(url);

	if (errorCode) throw new Error(errorCode);
	const { access_token, refresh_token } = params;

	if (!access_token) return;

	const { data, error } = await supabase.auth.setSession({
		access_token,
		refresh_token,
	});
	if (error) throw error;

	return data.session;
};

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);
	const router = useRouter();

	const url = Linking.useURL();
	if (url) createSessionFromUrl(url);

	const { setSession } = useAuthStore();

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user || null);
				setSession(session);
				if (session?.user) router.replace("/home");
			},
		);

		return () => {
			authListener?.subscription?.unsubscribe();
		};
	}, []);

	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			Alert.alert(error.message);
		} else {
			router.replace("/home");
		}
		setLoading(false);
	}

	async function signUpWithEmail() {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			Alert.alert(error.message);
		} else if (!session) {
			Alert.alert("Please confirm by clicking on the email link");
		} else {
			router.replace("/home");
		}
		setLoading(false);
	}

	async function signOut() {
		await supabase.auth.signOut();
		setUser(null);
	}

	return (
		<View style={styles.container}>
			{user ? (
				<View>
					<Text>Welcome, {user.email}!</Text>
					<Button title="Sign Out" onPress={signOut} />
				</View>
			) : (
				<View>
					<View style={[styles.verticallySpaced, styles.mt20]}>
						<Input
							label="Email"
							leftIcon={{ type: "font-awesome", name: "envelope" }}
							onChangeText={(text) => setEmail(text)}
							value={email}
							placeholder="email@address.com"
							autoCapitalize={"none"}
						/>
					</View>
					<View style={styles.verticallySpaced}>
						<Input
							label="Password"
							leftIcon={{ type: "font-awesome", name: "lock" }}
							onChangeText={(text) => setPassword(text)}
							value={password}
							secureTextEntry={true}
							placeholder="Password"
							autoCapitalize={"none"}
						/>
					</View>
					<View style={[styles.verticallySpaced, styles.mt20]}>
						<Button
							title="Sign in"
							disabled={loading}
							onPress={() => signInWithEmail()}
						/>
					</View>
					<View style={styles.verticallySpaced}>
						<Button
							title="Sign up"
							disabled={loading}
							onPress={() => signUpWithEmail()}
						/>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
});

import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Alert,
	StyleSheet,
	Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { supabase } from "@lib/supabase";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function signInWithEmail() {
		if (!email || !password) {
			Alert.alert("Sign-in error", "Please provide both email and password");
			setLoading(false);
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			Alert.alert("Sign-in error", error.message);
		} else {
			router.replace("/practice");
		}

		setLoading(false);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Email</Text>
			<View style={styles.inputContainer}>
				<Icon name="envelope" size={20} color="#888" style={styles.inputIcon} />
				<TextInput
					style={styles.input}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize="none"
					keyboardType="email-address"
				/>
			</View>
			<Text style={styles.label}>Password</Text>
			<View style={styles.inputContainer}>
				<Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
				<TextInput
					style={styles.input}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry
					placeholder="Password"
					autoCapitalize="none"
				/>
			</View>
			<Pressable
				style={[styles.button, loading && styles.buttonDisabled]}
				disabled={loading}
				onPress={signInWithEmail}
			>
				<Text style={styles.buttonText}>Sign in</Text>
			</Pressable>
			<Pressable onPress={() => router.push("/auth/forgot-password")}>
				<Text style={styles.linkText}>Forgot password?</Text>
			</Pressable>
			<Pressable onPress={() => router.push("/auth/sign-up")}>
				<Text style={styles.linkText}>Don't have an account? Sign up</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	label: {
		fontSize: 16,
		color: "#333",
		marginBottom: 5,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
	},
	inputIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
	button: {
		backgroundColor: "blue",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		marginBottom: 10,
	},
	buttonDisabled: {
		backgroundColor: "#d3d3d3",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	linkText: {
		color: "blue",
		textAlign: "center",
		textDecorationLine: "underline",
		marginVertical: 5,
	},
});

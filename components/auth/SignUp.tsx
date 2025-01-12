import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Pressable,
	Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { supabase } from "@lib/supabase";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const router = useRouter();

	async function signUpWithEmail() {
		if (!email || !password) {
			Alert.alert("Sign-up error", "Please provide both email and password");
			setLoading(false);
			return;
		}

		setLoading(true);

		const { error } = await supabase.auth.signUp({ email, password });

		if (error) {
			Alert.alert("Sign-up error", error.message);
		} else {
			setEmailSent(true);
		}
		setLoading(false);
	}

	return (
		<View style={styles.container}>
			{emailSent ? (
				<View style={{ alignItems: "center" }}>
					<Text style={styles.successText}>
						Check your email to confirm your account
					</Text>
					<Pressable onPress={() => router.push("/sign-in")}>
						<Text style={styles.linkText}>Go to Sign In</Text>
					</Pressable>
				</View>
			) : (
				<>
					<Text style={styles.label}>Email</Text>
					<View style={styles.inputContainer}>
						<Icon
							name="envelope"
							size={20}
							color="#888"
							style={styles.inputIcon}
						/>
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
						onPress={signUpWithEmail}
					>
						<Text style={styles.buttonText}>Sign up</Text>
					</Pressable>
				</>
			)}
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
	successText: {
		textAlign: "center",
		marginBottom: 10,
	},
	linkText: {
		color: "blue",
		textDecorationLine: "underline",
	},
});
